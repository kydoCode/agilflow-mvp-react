import React, { useState } from 'react';
import { useStore } from '../store';
import { StoryModal } from './StoryModal';
import { StoryCard } from './StoryCard';
import { LogOut, Plus } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  pointerWithin,
  getFirstCollision,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { stories, addStory, updateStory, deleteStory, moveStory, logout } = useStore((state) => state); // Removed unnecessary console.log
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(undefined);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    console.log('handleDragStart event:', event);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    console.log('handleDragEnd event:', event);

    if (!over) return;

    const activeStory = stories.find((story) => story.id === active.id);
    const overId = over.id.toString();

    // Find which column was dropped on
    const columns = ['todo', 'doing', 'done'];
    const targetColumn = columns.find((col) => overId.includes(col));

    if (targetColumn && activeStory.status !== targetColumn) {
      moveStory(active.id, targetColumn);
      toast.success('Story moved successfully!');
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleSave = (story) => {
    console.log('handleSave called with story:', story); // Added console log
    if (editingStory) {
      updateStory(editingStory.id, story);
      toast.success('Story updated successfully!');
    } else {
      addStory(story);
      toast.success('Story created successfully!');
    }
    setEditingStory(undefined);
  };

  const handleEdit = (story) => {
    console.log('handleEdit called with story:', story);
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log('handleDelete called with id:', id);
    if (window.confirm('Are you sure you want to delete this story?')) {
      deleteStory(id);
      toast.success('Story deleted successfully!');
    }
  };

  const columns = [
    { id: 'todo', title: 'Todo' },
    { id: 'doing', title: 'Doing' },
    { id: 'done', title: 'Done' },
  ];

  const findContainer = (id) => {
    if (!id) return null;
    const story = stories.find((story) => story.id === id);
    return story ? story.status : null;
  };

  const getStoryStyle = (id) => {
    return {
      opacity: activeId === id ? 0.5 : undefined,
    };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Story Manager</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Story
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                id={`${column.id}-column`}
                className="bg-gray-50 rounded-lg p-4"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {column.title}
                </h2>
                <SortableContext
                  items={stories.map((story) => story.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {stories
                    .filter((story) => story.status === column.id)
                    .map((story) => (
                      <StoryCard
                        key={story.id}
                        story={story}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        style={getStoryStyle(story.id)}
                      />
                    ))}
                </SortableContext>
              </div>
            ))}
          </div>
          <DragOverlay>
            {activeId ? (
              <StoryCard
                story={stories.find((story) => story.id === activeId)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <StoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStory(undefined);
        }}
        onSave={handleSave}
        editingStory={editingStory}
      />
    </div>
  );
}
