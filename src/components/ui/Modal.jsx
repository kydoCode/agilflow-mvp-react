import { X } from "lucide-react";
import { useState } from "react";

export default function Modal({ modalOpen, setIsModalOpen }) {
    const [newTask, setNewTask] = useState({ as: '', iwant: '', sothat: '', status: 'todo' });
    const handleAddTask = () => {
        addStory({user: newTask.as, action: newTask.iwant, need: newTask.sothat, status: newTask.status});
        setIsModalOpen(false);
      };
      
    return (
        <>
        {modalOpen && (
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
                </>
    )
}