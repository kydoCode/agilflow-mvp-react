import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function StoryModal({ isOpen, onClose, onSave, editingStory }) {
  const [user, setUser] = useState('');
  const [action, setAction] = useState('');
  const [need, setNeed] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if (editingStory) {
      setUser(editingStory.user);
      setAction(editingStory.action);
      setNeed(editingStory.need);
      setStatus(editingStory.status);
    }
  }, [editingStory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ user, action, need, status });
    onClose();
    setUser('');
    setAction('');
    setNeed('');
    setStatus('todo');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingStory ? 'Edit Story' : 'Create New Story'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              As a... (User)
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Product Manager"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              I want to... (Action)
            </label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., create new user stories"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              So that... (Need)
            </label>
            <input
              type="text"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., I can track project requirements"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-colors"
            >
              {editingStory ? 'Update Story' : 'Create Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}