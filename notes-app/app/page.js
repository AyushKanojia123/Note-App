'use client';

import { useState, useEffect } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (noteData) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdate = async (noteData) => {
    try {
      await fetch(`/api/notes/${editingNote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      setNotes(notes.map(note => 
        note._id === editingNote._id 
          ? { ...note, ...noteData }
          : note
      ));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          My Notes App
        </h1>
        
        {editingNote ? (
          <NoteForm
            onSubmit={handleUpdate}
            initialData={editingNote}
            onCancel={() => setEditingNote(null)}
          />
        ) : (
          <NoteForm onSubmit={handleCreate} />
        )}
        
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}