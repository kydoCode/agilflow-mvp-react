import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useStore } from '../store';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

export default function Dashboard() {
  const { stories, addStory, updateStory, deleteStory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Modal modalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}
