import { useCallback } from 'react';
import useNotes from './hooks/useNotes';
import SearchBar from './components/SearchBar';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import './App.css';

export default function App() {
  const {
    notes,
    searchQuery,
    setSearchQuery,
    editingNote,
    createNote,
    updateNote,
    deleteNote,
    startEditing,
    cancelEditing,
  } = useNotes();

  const handleSave = useCallback(
    (title, content) => {
      if (editingNote) {
        updateNote(editingNote.id, title, content);
      } else {
        createNote(title, content);
      }
    },
    [editingNote, updateNote, createNote]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notepad</h1>
      </header>
      <NoteEditor
        editingNote={editingNote}
        onSave={handleSave}
        onCancel={cancelEditing}
      />
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      <NoteList
        notes={notes}
        onEdit={startEditing}
        onDelete={deleteNote}
      />
    </div>
  );
}
