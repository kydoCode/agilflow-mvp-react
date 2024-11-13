import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useStore } from '../store';
import Card from '../components/ui/Card';

export default function Dashboard() {
  const { stories, addStory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ as: '', iwant: '', sothat: '', status: 'todo' });

  const handleAddTask = () => {
    addStory({user: newTask.as, action: newTask.iwant, need: newTask.sothat, status: newTask.status});
    setIsModalOpen(false);
  };

  const filterByStatus = (status) => {
    const filteredStories = stories.filter((story) => story.status === status);
    return filteredStories;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2" size={16} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className='text-xl font-semibold mb-2'>Todo</h2>
            <div className='space-y-2'>
               {filterByStatus('todo').map(story => (
                  <Card key={story.id} id={story.id} user={story.user} action={story.action} need={story.need} />
               ))}
            </div>
         </div>

         <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className='text-xl font-semibold mb-2'>Doing</h2>
            <div className='space-y-2'>
               {filterByStatus('doing').map(story => (
                  <Card key={story.id} id={story.id} user={story.user} action={story.action} need={story.need} />
               ))}
            </div>
         </div>

         <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className='text-xl font-semibold mb-2'>Done</h2>
            <div className='space-y-2'>
               {filterByStatus('done').map(story => (
                  <Card key={story.id} id={story.id} user={story.user} action={story.action} need={story.need} />
               ))}
            </div>
         </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add new user story</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="as" className="block text-sm font-medium text-gray-700">
                  As a type of user
                </label>
                <input
                  id="as"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newTask.as}
                  onChange={(e) => setNewTask({ ...newTask, as: e.target.value })}
                  placeholder="as user/developper/productowner..."
                />
              </div>
              <div>
                <label htmlFor="iwant" className="block text-sm font-medium text-gray-700">
                  I want
                </label>
                <input
                  id="iwant"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newTask.iwant}
                  onChange={(e) => setNewTask({ ...newTask, iwant: e.target.value })}
                  placeholder="I want..."
                />
              </div>
              <div>
                <label htmlFor="sothat" className="block text-sm font-medium text-gray-700">
                  So that
                </label>
                <textarea
                  id="sothat"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newTask.sothat}
                  onChange={(e) => setNewTask({ ...newTask, sothat: e.target.value })}
                  placeholder="So that..."
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {setNewTask({as: '', iwant: '', sothat: '', status: 'todo'}); setIsModalOpen(false)}}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleAddTask}
                >
                  Add user story
                </button>
              </div>
            </div> 
         </div>
         </div>
         )}


    </div>
  );
}