import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../apiservice';

export default function Register() {
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (formData) => {
    setError(''); // Clear any previous errors
    try {
       // Si on arrive ici, c'est que le formulaire est valide
      // On peut donc envoyer les données au serveur
      const datas = await ApiService.register(formData.name.trim(), formData.email.trim(), formData.password, formData.role);
      setConfirm('Compte créé avec succès !');
      console.log(datas);
      reset(); // réinitialiser le formulaire
      // const response = await fetch("/api/auth/register/", {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData),
      //   credentials: 'include'
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   const errorMessage = errorData.error || response.statusText;
      //   throw new Error(errorMessage);
      // }

      // const responseData = await response.json();
      // console.log("Réponse du serveur:", responseData);
      // Redirect to dashboard or handle successful registration
      // ... your logic to handle successful registration ...
      

    } catch (error) {
      setError(error.message); // Set the error message from the API or fetch
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        {error && (
          <p className='text-red-500'>{error}</p>
        )}
        {confirm && (
          <p className='text-green-500'>{confirm}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <select
              {...register("role", { required: "Le rôle est obligatoire" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              id="selectRole"
            >
              <option value="developer">Developer</option>
              <option value="tester">tester</option>
              <option value="product owner">product owner</option>
              <option value="scrum master">scrum master</option>
              <option value="team member">team member</option>
            </select>
            {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
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
