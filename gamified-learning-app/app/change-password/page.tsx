"use client";

import { useState } from 'react';

export default function ChangePasswordPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('Las nuevas contraseñas no coinciden.');
      return;
    }
    // Here you would call an API to change the password
    console.log('Changing password with:', passwords);
    setMessage('Contraseña actualizada correctamente (simulado).');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="currentPassword" a className="block text-sm font-medium text-gray-300">Contraseña Actual</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white p-2"
            />
          </div>
          <div>
            <label htmlFor="newPassword" a className="block text-sm font-medium text-gray-300">Nueva Contraseña</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white p-2"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" a className="block text-sm font-medium text-gray-300">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar Contraseña
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
}
