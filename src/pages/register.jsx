import React, { useState, useForm } from 'react';
// import React, { useForm } from 'react-hook-form';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('toto')
    // Vérifier que tous les champs soient corrects
        // SI erreur -> afficher erreur
        // Envoyer les données à API service (async await) 
            // Récupérer la réponse de API Services
                // SI erreur (doublon ahah ) -> afficher erreur
                // SINON stocker token dans le localstorage
                    // Rediriger vers la page dashboard 
    // Logique d'inscription à implémenter
    // console.log('Registration attempt with:', { name, email, password, confirmPassword, role });

    const validationRules = {
      name: { required: "Ce champ est obligatoire" },
      email: { required: "L'email est obligatoire", pattern: /^\S+@\S+$/i },
      password: { required: "Le mot de passe est obligatoire", minLength: 8 },
      confirmPassword: { required: "Confirmation du mot de passe est obligatoire", minLength: 8 },
      role: { required: "Le rôle est obligatoire" }
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const form = document.querySelector("createUserForm");

    
    try {
      // voir en JS pour post un form (fetch)
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
          try {
            const response = await fetch("http://localhost:3000/api/auth/register/", {
              method: "POST",
              body: formData
            });
            const data = await response.json();
            console.log("Réponse du serveur:", data);
          } catch (error) {
            console.error("Erreur:", error);
          }
        });
    } catch (error) {
      console.log(error);
      console("Corrigez votre saisie");
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        {error && (
            <p className='text-red-500'>{error}</p>
        )}
        <form id="createUserForm" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="name"
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          {/* <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
             
              <Lock className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>

            
          </div> */}


          
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Role
            </label>
            <div className="relative">
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="selectRole"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                >
                    <option value="developer">Developer</option>
                    <option value="tester">tester</option>
                    <option value="product owner">product owner</option>
                    <option value="scrum master">scrum master</option>
                    <option value="team member">team member</option>
                    </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}