import { X } from "lucide-react";
import { useState } from "react";
import { useStore } from "../../store";

export default function Modal({ modalOpen, setIsModalOpen, editingStory, onSave, isEditing }) { 
    const { addStory, updateStory } = useStore();
    const [task, setTask] = useState({ as: '', iwant: '', sothat: '', status: 'todo' });
    const [editedStory, setEditedStory] = useState(editingStory || { user: '', action: '', need: '', status: 'todo' });

    // Fonction qui permet de mettre à jour le state task en fonction des champs de saisie
    const handleInputChange = (e) => {
      // Destructure le nom et la valeur du champ de saisie
      const { name, value } = e.target;

      // Met à jour le state task en fonction du champ de saisie
      setTask(prevState => ({
        ...prevState,
        [name]: value
      }))

    }
    
    const handleAddTask = () => {
        // Vérifier que tous les champs sont remplis
        console.log(task);
        
        // Si tous les champs sont remplis, ajouter le nouvel user story
        addStory({ action: task.iwant, need: task.sothat, user: task.as, status: task.status});
        
        setIsModalOpen(false);
      };

    const handleSave = () => {
        updateStory(editedStory.id, editedStory);
        setIsModalOpen(false);
        console.log('Saved!');
    };


    if (isEditing) {
      return(
        <>
        {modalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update User Story</h2>
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
              value={editedStory.user}
              onChange={(e) => setEditedStory({ ...editedStory, user: e.target.value })}
              placeholder="as user/developer/product owner..."
            />
          </div>
          <div>
            <label htmlFor="iwant" className="block text-sm font-medium text-gray-700">
              I want
            </label>
            <input
              id="iwant"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={editedStory.action}
              onChange={(e) => setEditedStory({ ...editedStory, action: e.target.value })}
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
              value={editedStory.need}
              onChange={(e) => setEditedStory({ ...editedStory, need: e.target.value })}
              placeholder="So that..."
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={editedStory.status}
              onChange={(e) => setEditedStory({ ...editedStory, status: e.target.value })}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => { setEditedStory({ user: '', action: '', need: '', status: 'todo' }); setIsModalOpen(false); }}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div> 
      </div>
    </div>
  )}
        </>
      )
    }
      
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
                      name="as"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={task.as}
                      onChange={handleInputChange}
                      placeholder="as user/developper/productowner..."
                    />
                  </div>
                  <div>
                    <label htmlFor="iwant" className="block text-sm font-medium text-gray-700">
                      I want
                    </label>
                    <input
                      id="iwant"
                      name="iwant"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={task.iwant}
                      onChange={handleInputChange}
                      placeholder="I want..."
                    />
                  </div>
                  <div>
                    <label htmlFor="sothat" className="block text-sm font-medium text-gray-700">
                      So that
                    </label>
                    <textarea
                      id="sothat"
                      name="sothat"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={task.sothat}
                      onChange={handleInputChange}
                      placeholder="So that..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={task.status}
                      onChange={handleInputChange}
                    >
                      <option value="todo">Todo</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {setTask({as: '', iwant: '', sothat: '', status: 'todo'}); setIsModalOpen(false)}}
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
