import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useStore } from '../store';
import { useForm } from 'react-hook-form';
import { ApiService } from '../apiservice';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
// const apiResponse = await apiService.register(name, email, password, role);
// console.log(apiResponse); // Check if the response indicates success or contains errors
await register(name, email, password, role);
      // Rediriger vers la page dashboard après l'inscription réussie
      setSuccess('Inscription réussie ! Vous allez être redirigé...');
      console.log(name, email, password, role);
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        {error && (
          <p className='text-red-500'>{error}</p>
          <p className='text-red-500'>{error}</p>
        )}
        {success && (
          <p className='text-green-500'>{success}</p>
        )}
        <form id="createUserForm" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input
              {...register("name", { required: "Ce champ est obligatoire" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              type="text"
              placeholder="Nom complet"
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            <User className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: "L'email est obligatoire", pattern: { value: /^\S+@\S+$/i, message: "Email invalide" } })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            <Mail className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              {...register("password", { required: "Le mot de passe est obligatoire", minLength: { value: 8, message: "Le mot de passe doit contenir au moins 8 caractères" } })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              type="password"
              placeholder="******************"
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            <Lock className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
                <option value="product owner">Product Owner</option>
                <option value="scrum master">Scrum Master</option>
                <option value="team member">Team Member</option>
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

