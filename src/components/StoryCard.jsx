import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function StoryCard({ story, onEdit, onDelete, isDragging, style }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: story.id });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...style,
    opacity: isSortableDragging ? 0.5 : undefined,
  };

  const handleEditClick = () => {
    onEdit(story);
  };

  const handleDeleteClick = () => {
    onDelete(story.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 cursor-move hover:shadow-lg transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-500">As a {story.user}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleEditClick}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-800 mb-2">I want to {story.action}</p>
      <p className="text-gray-600 text-sm">So that {story.need}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(story.createdAt).toLocaleDateString()}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            story.status === 'todo'
              ? 'bg-yellow-100 text-yellow-800'
              : story.status === 'doing'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
        </span>
      </div>
    </div>
  );
}
