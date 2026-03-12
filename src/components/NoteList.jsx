import NoteItem from './NoteItem';

export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p className="note-list-empty">No notes yet. Create one above!</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
