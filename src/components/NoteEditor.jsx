import { useState, useEffect, useCallback } from 'react';

export default function NoteEditor({ editingNote, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim() && !content.trim()) return;
      onSave(title, content);
      if (!editingNote) {
        setTitle('');
        setContent('');
      }
    },
    [title, content, editingNote, onSave]
  );

  const handleCancel = useCallback(() => {
    setTitle('');
    setContent('');
    onCancel();
  }, [onCancel]);

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-editor-title"
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-editor-content"
        rows={4}
      />
      <div className="note-editor-actions">
        <button type="submit" className="btn btn-primary">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
