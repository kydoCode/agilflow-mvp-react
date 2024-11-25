import { Edit3, Trash } from 'lucide-react';
import { useState } from 'react';
import Modal from './Modal';

export default function Card({ id, user, action, need }) {

    // Au click sur le bouton edit, ouvrir une modale pour modifier la story
        // On utilise l'id du story pour récupérer et mettre à jour la story
        // Dans la modale, on peut modifier l'user, l'action, le need
        // On enregistre les modifications
        // On ferme la modale

    // Au click sur le bouton delete, supprimer la story
        // On ouvre une confirmation pour confirmer la suppression
            // On utilise l'id du story pour récupérer et supprimer la story

    const [editModal, setEditModal] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [deleteStory, setDeleteStory] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleEditClick = () => {
        setEditModal(true);
        setModalId(id);
        setIsModalOpen(true);
    }   

    // const handleDeleteClick = (id) => {
    //     setDeleteStory(true);
    // }

    const handleDeleteClick = () => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette story ?')) {
          // Appel à l'API pour supprimer la story
          // Exemple : deleteStory(id)
          //   .then(() => {
          //     // Mettre à jour l'état local ou recharger les données
          //   })
          //   .catch(error => {
          //     console.error('Erreur lors de la suppression:', error);
          //   });
      }
  };

    const handleSaveEdit = (editedStory) => {
      // Appel à l'API pour mettre à jour la story
      // Exemple : updateStory(id, editedStory)
      //   .then(() => {
      //     // Mettre à jour l'état local ou recharger les données
      //   })
      //   .catch(error => {
      //     console.error('Erreur lors de la mise à jour:', error);
      //   });
  };

  return (
    <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
        <button aria-label="Edit" className="text-gray-500 hover:text-blue-500">
          <Edit3 onClick={handleEditClick} modalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalId={modalId} setModalId={setModalId}
size={20} />
  
        </button>
        <button aria-label="Delete" className="text-gray-500 hover:text-red-500">
          <Trash onClick={handleDeleteClick} size={20} />
        </button>
      </div>

      <Modal 
            modalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen}
            editingStory={{ id, user, action, need }}
            onSave={handleSaveEdit}
        />

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            En tant que
          </span>
          <p className="text-gray-800 font-medium pt-1">
            {user}
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            je veux
          </span>
          <p className="text-gray-800 font-medium pt-1">
            {action}
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            pour/afin de
          </span>
          <p className="text-gray-800 font-medium pt-1">
            {need}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              Story #{id}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
