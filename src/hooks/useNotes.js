import { useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'notepad-notes';

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function useNotes() {
  const [notes, setNotes] = useState(loadNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNote = useCallback((title, content) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  }, []);

  const updateNote = useCallback((id, title, content) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              title: title.trim(),
              content: content.trim(),
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
    setEditingNote(null);
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setEditingNote((current) => (current?.id === id ? null : current));
  }, []);

  const startEditing = useCallback((note) => {
    setEditingNote(note);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingNote(null);
  }, []);

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  return {
    notes: filteredNotes,
    searchQuery,
    setSearchQuery,
    editingNote,
    createNote,
    updateNote,
    deleteNote,
    startEditing,
    cancelEditing,
  };
}
