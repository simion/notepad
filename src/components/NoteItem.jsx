import { useCallback } from 'react';
import MarkdownPreview from './MarkdownPreview';

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function NoteItem({ note, onEdit, onDelete }) {
  const handleEdit = useCallback(() => onEdit(note), [note, onEdit]);
  const handleDelete = useCallback(() => onDelete(note.id), [note.id, onDelete]);

  return (
    <div className="note-item">
      <div className="note-item-header">
        <h3 className="note-item-title">{note.title || 'Untitled'}</h3>
        <div className="note-item-actions">
          <button
            onClick={handleEdit}
            className="btn btn-small btn-edit"
            aria-label="Edit note"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-small btn-delete"
            aria-label="Delete note"
          >
            Delete
          </button>
        </div>
      </div>
      {note.content && (
        <div className="note-item-content">
          <MarkdownPreview content={note.content} />
        </div>
      )}
      <span className="note-item-date">{formatDate(note.updatedAt)}</span>
    </div>
  );
}
