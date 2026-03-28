import { useMemo } from 'react';

/**
 * Converts a subset of Markdown syntax to HTML using regex replacements.
 * Supports: headings (h1-h3), bold, italic, inline code, fenced code blocks,
 * and links.
 */
function parseMarkdown(text) {
  if (!text) return '';

  let html = text;

  // Fenced code blocks (```...```) — must run before inline replacements
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const cls = lang ? ` class="language-${lang}"` : '';
      return `<pre><code${cls}>${escaped}</code></pre>`;
    }
  );

  // Split around <pre> blocks so we don't mangle their contents
  const parts = html.split(/(<pre>[\s\S]*?<\/pre>)/g);

  html = parts
    .map((part) => {
      if (part.startsWith('<pre>')) return part;

      // Headings (must match at start of line)
      part = part.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      part = part.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      part = part.replace(/^# (.+)$/gm, '<h1>$1</h1>');

      // Bold (**text** or __text__)
      part = part.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      part = part.replace(/__(.+?)__/g, '<strong>$1</strong>');

      // Italic (*text* or _text_)
      part = part.replace(/\*(.+?)\*/g, '<em>$1</em>');
      part = part.replace(/_(.+?)_/g, '<em>$1</em>');

      // Inline code (`code`)
      part = part.replace(/`([^`]+?)`/g, '<code>$1</code>');

      // Links [text](url)
      part = part.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      // Line breaks — preserve single newlines as <br> within paragraphs
      part = part.replace(/\n/g, '<br />');

      return part;
    })
    .join('');

  return html;
}

export default function MarkdownPreview({ content }) {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className="markdown-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
