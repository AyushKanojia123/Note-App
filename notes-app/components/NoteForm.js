'use client';

import { useState } from 'react';

export default function NoteForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    if (!initialData) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg mb-6 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? '✏️ Edit Note' : '📝 Create New Note'}
      </h2>

      <div className="mb-5">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          placeholder="Write your note here..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md transition"
        >
          {initialData ? 'Update' : 'Create'} Note
        </button>

        {onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-6 rounded-xl transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
