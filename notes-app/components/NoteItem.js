'use client';

export default function NoteItem({ note, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{note.title}</h3>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{note.content}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {formatDate(note.createdAt)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}