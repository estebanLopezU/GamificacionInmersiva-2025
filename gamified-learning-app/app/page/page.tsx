"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';

export default function UserPage() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // Initialize editedUser with user from context, but allow for local changes
  const [editedUser, setEditedUser] = useState<User | null>(user);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Effect to handle token from URL parameters (for redirection from Django)
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !user && !authLoading) {
      // Save token to localStorage
      localStorage.setItem('access_token', token);
      // Remove token from URL
      router.replace('/page', undefined);
      // The useAuth hook will detect the token and fetch user data
    }
  }, [searchParams, user, authLoading, router]);

  // Effect to handle redirection if user is not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    // When user from context changes (e.g., after login), update the local state for editing
    setEditedUser(user);
  }, [user, authLoading, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user); // Reset changes to match context state
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the user data
    // For now, we'll just update the global and local state
    if (editedUser) {
      updateUser(editedUser); // Update the user in the global context
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    }
  };


  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
  );
}

<style jsx>{`
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1) rotate(0deg);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9) rotate(240deg);
    }
    100% {
      transform: translate(0px, 0px) scale(1) rotate(360deg);
    }
  }

  @keyframes morphing-blob {
    0%, 100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      transform: rotate(0deg) scale(1);
    }
    25% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
      transform: rotate(90deg) scale(1.1);
    }
    50% {
      border-radius: 50% 40% 60% 50% / 40% 50% 60% 40%;
      transform: rotate(180deg) scale(0.9);
    }
    75% {
      border-radius: 40% 50% 40% 60% / 70% 40% 50% 60%;
      transform: rotate(270deg) scale(1.05);
    }
  }

  @keyframes particle-float {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
      opacity: 0.7;
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px) translateX(-15px) rotate(180deg) scale(0.9);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-30px) translateX(5px) rotate(270deg) scale(1.05);
      opacity: 0.9;
    }
  }

  @keyframes hologram {
    0%, 100% {
      transform: translateZ(0) rotateX(0deg) rotateY(0deg);
      opacity: 0.8;
    }
    25% {
      transform: translateZ(20px) rotateX(5deg) rotateY(5deg);
      opacity: 1;
    }
    50% {
      transform: translateZ(-10px) rotateX(-3deg) rotateY(-3deg);
      opacity: 0.9;
    }
    75% {
      transform: translateZ(15px) rotateX(2deg) rotateY(-5deg);
      opacity: 0.95;
    }
  }

  @keyframes quantum-pulse {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      transform: scale(1.05) rotate(180deg);
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4);
    }
  }

  @keyframes dimensional-shift {
    0%, 100% {
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0);
    }
    25% {
      transform: perspective(1000px) rotateX(2deg) rotateY(3deg) translateZ(10px);
    }
    50% {
      transform: perspective(1000px) rotateX(-1deg) rotateY(-2deg) translateZ(-5px);
    }
    75% {
      transform: perspective(1000px) rotateX(3deg) rotateY(-1deg) translateZ(8px);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-morphing-blob {
    animation: morphing-blob 12s ease-in-out infinite;
  }

  .animate-particle-float {
    animation: particle-float 8s ease-in-out infinite;
  }

  .animate-hologram {
    animation: hologram 10s ease-in-out infinite;
  }

  .animate-quantum-pulse {
    animation: quantum-pulse 4s ease-in-out infinite;
  }

  .animate-dimensional-shift {
    animation: dimensional-shift 15s ease-in-out infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animate-slide-up {
    animation: slide-up 0.5s ease-out;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px) rotateX(10deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-5px) scale(1.02);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateZ(0) rotate(0deg) scale(1);
    }
    33% {
      transform: translateY(-10px) translateZ(10px) rotate(120deg) scale(1.05);
    }
    66% {
      transform: translateY(5px) translateZ(-5px) rotate(240deg) scale(0.95);
    }
  }

  @keyframes spin-reverse-slow {
    from {
      transform: rotate(360deg) scale(1);
    }
    to {
      transform: rotate(0deg) scale(1.1);
    }
  }

  @keyframes card-tilt {
    0%, 100% {
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
    }
    25% {
      transform: perspective(1000px) rotateX(1deg) rotateY(2deg) scale(1.01);
    }
    50% {
      transform: perspective(1000px) rotateX(-0.5deg) rotateY(-1deg) scale(0.99);
    }
    75% {
      transform: perspective(1000px) rotateX(1.5deg) rotateY(-1deg) scale(1.005);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-spin-reverse-slow {
    animation: spin-reverse-slow 15s linear infinite;
  }

  .animate-card-tilt {
    animation: card-tilt 20s ease-in-out infinite;
  }

  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }

  .card-3d:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px) scale(1.02);
  }

  .interactive-bg {
    background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
    animation: background-shift 20s ease-in-out infinite;
  }

  @keyframes background-shift {
    0%, 100% {
      background-position: 0% 50%, 100% 0%, 50% 100%;
    }
    50% {
      background-position: 100% 50%, 0% 100%, 50% 0%;
    }
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6));
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }

  .geometric-shape {
    position: absolute;
    background: linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2));
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .holographic-border {
    position: relative;
    background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    border-radius: 1rem;
  }

  .holographic-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
    border-radius: 1rem;
    z-index: -1;
    animation: border-rotate 8s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .holographic-border:hover::before {
    opacity: 0.6;
  }

  @keyframes border-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`}</style>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden interactive-bg">
      {/* 4D Dimensional Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Floating Elements */}
        <div className="absolute inset-0 animate-dimensional-shift">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/30 rotate-45 animate-spin-slow animate-hologram"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-400/30 rounded-full animate-pulse-slow animate-morphing-blob"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-purple-400/30 rotate-12 animate-bounce-slow animate-quantum-pulse"></div>
          <div className="absolute top-1/3 right-10 w-28 h-28 border-2 border-yellow-400/30 rounded-lg animate-spin-reverse-slow animate-card-tilt"></div>
          <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float animate-particle-float"></div>
        </div>

        {/* Secondary Layer - Geometric Particles */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          <div className="particle absolute top-1/4 left-1/4 w-2 h-2 animate-particle-float animation-delay-2000"></div>
          <div className="particle absolute top-3/4 right-1/4 w-3 h-3 animate-particle-float animation-delay-4000"></div>
          <div className="particle absolute top-1/2 left-3/4 w-1.5 h-1.5 animate-particle-float animation-delay-2000"></div>
          <div className="particle absolute bottom-1/4 left-1/3 w-2.5 h-2.5 animate-particle-float animation-delay-4000"></div>
          <div className="particle absolute top-2/3 right-1/3 w-1 h-1 animate-particle-float animation-delay-2000"></div>

          {/* Geometric Shapes */}
          <div className="geometric-shape absolute top-16 right-16 w-16 h-16 rotate-45 animate-morphing-blob animation-delay-2000"></div>
          <div className="geometric-shape absolute bottom-32 left-16 w-12 h-12 rounded-full animate-quantum-pulse animation-delay-4000"></div>
          <div className="geometric-shape absolute top-1/3 left-8 w-20 h-20 rotate-12 animate-hologram animation-delay-2000"></div>
          <div className="geometric-shape absolute bottom-1/3 right-8 w-14 h-14 rounded-lg animate-dimensional-shift animation-delay-4000"></div>
          <div className="geometric-shape absolute top-2/3 right-1/4 w-18 h-18 rotate-30 animate-card-tilt animation-delay-2000"></div>
        </div>

        {/* Tertiary Layer - Dynamic Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'background-shift 30s ease-in-out infinite'
          }}></div>
        </div>

        {/* Gradient Overlays with Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-transparent to-purple-900/70 animate-dimensional-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent animate-hologram"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/20 to-slate-900/60 animate-quantum-pulse"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            Bienvenido a tu Centro de Información
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in-up animation-delay-500">
            Explora el fascinante mundo de la gamificación y el aprendizaje inmersivo
          </p>
        </div>

        {/* User Profile Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-12 animate-fade-in-up border border-white/20 hover:border-white/30 transition-all duration-500 group">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-bounce">
                  <div className="w-full h-full rounded-full bg-green-400 animate-ping"></div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {user.username}
                </h2>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  Estudiante Activo
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-bounce-slow"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              <div className="group">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">
                  👤 Nombre de usuario
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={editedUser?.username || ''}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-gray-500"
                />
              </div>
              <div className="group">
                <label htmlFor="career" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">
                  🎓 Carrera
                </label>
                <input
                  type="text"
                  name="career"
                  id="career"
                  value={editedUser?.career || ''}
                  onChange={handleInputChange}
                  placeholder="Ej: Ingeniería de Sistemas y Computación"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500"
                />
              </div>
              <div className="group">
                <label htmlFor="semester" className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-green-400 transition-colors">
                  📚 Semestre
                </label>
                <input
                  type="number"
                  name="semester"
                  id="semester"
                  value={editedUser?.semester || ''}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-gray-500"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ❌ Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  💾 Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-300">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🎓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400">Carrera</h3>
                </div>
                <p className="text-gray-300">{user.career || 'No especificada'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-400">Semestre</h3>
                </div>
                <p className="text-gray-300">{user.semester || 'No especificado'}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🏆</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-400">Logros</h3>
                </div>
                <p className="text-gray-300">
                  <span className="font-bold text-yellow-400 text-xl">0</span> desbloqueados
                </p>
              </div>
            </div>
          )}
        </div>

        {/* VR and Technology Information Cards - 4D Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {/* VR Getting Started Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-cyan-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.1s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🥽</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Iniciando en VR
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-cyan-400 font-bold">🎯</span>
                    <span className="text-cyan-300 font-semibold text-base">¿Qué es la Realidad Virtual?</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    La Realidad Virtual (VR) es una tecnología que crea entornos simulados tridimensionales inmersivos.
                    Utiliza dispositivos como gafas VR, guantes hápticos y sistemas de seguimiento para hacer que el usuario
                    sienta que está dentro de un mundo digital completamente diferente al físico.
                  </p>
                  <div className="bg-cyan-500/10 rounded-lg p-3">
                    <span className="text-cyan-300 font-medium">Tecnologías principales:</span>
                    <ul className="text-gray-300 mt-1 space-y-1">
                      <li>• <strong>Stereoscopic displays:</strong> Pantallas que muestran imágenes diferentes para cada ojo</li>
                      <li>• <strong>Head tracking:</strong> Seguimiento de movimientos de cabeza en 6 grados de libertad</li>
                      <li>• <strong>Hand tracking:</strong> Seguimiento de movimientos de manos y gestos</li>
                      <li>• <strong>Spatial audio:</strong> Sonido 3D que simula direcciones y distancias</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-cyan-400 font-bold">🚀</span>
                    <span className="text-cyan-300 font-semibold text-base">Primeros Pasos en VR</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-cyan-500/10 rounded-lg p-3">
                      <span className="text-cyan-200 font-medium">1. Selección del Hardware Adecuado</span>
                      <p className="text-gray-300 mt-1">
                        Elige entre VR móvil (con smartphone), VR PC (alta fidelidad) o VR standalone
                        según tus necesidades y presupuesto. Considera la resolución, campo de visión
                        y compatibilidad con tus dispositivos existentes.
                      </p>
                    </div>
                    <div className="bg-cyan-500/10 rounded-lg p-3">
                      <span className="text-cyan-200 font-medium">2. Configuración del Espacio Seguro</span>
                      <p className="text-gray-300 mt-1">
                        Designa un área libre de obstáculos de al menos 2x2 metros para VR móvil,
                        o 3x3 metros para sistemas de seguimiento completo. Remueve objetos frágiles
                        y asegura buena iluminación para el seguimiento óptico.
                      </p>
                    </div>
                    <div className="bg-cyan-500/10 rounded-lg p-3">
                      <span className="text-cyan-200 font-medium">3. Instalación y Calibración</span>
                      <p className="text-gray-300 mt-1">
                        Sigue las instrucciones del fabricante para instalar controladores y calibrar
                        los sensores. Asegúrate de que los puertos USB y conexiones de video estén
                        funcionando correctamente antes de comenzar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-cyan-400 font-bold">⚕️</span>
                    <span className="text-cyan-300 font-semibold text-base">Salud y Seguridad en VR</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                      <span className="text-red-300 font-medium">Mareo por Movimiento (Motion Sickness)</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Comienza con sesiones cortas de 10-15 minutos</li>
                        <li>• Toma descansos frecuentes mirando objetos fijos</li>
                        <li>• Asegúrate de que el contenido tenga buena optimización de frames</li>
                        <li>• Evita movimientos bruscos o contenido con parallax extremo</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                      <span className="text-yellow-300 font-medium">Mejores Prácticas</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Mantén el dispositivo y lentes limpios</li>
                        <li>• Ajusta correctamente las correas para comodidad</li>
                        <li>• Usa auriculares para mejor inmersión auditiva</li>
                        <li>• Mantén actualizado el software y controladores</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-cyan-400 font-bold">🎮</span>
                    <span className="text-cyan-300 font-semibold text-base">Aplicaciones Educativas en VR</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    La VR transforma el aprendizaje al permitir experiencias inmersivas que serían imposibles
                    o peligrosas en el mundo real. Los estudiantes pueden explorar lugares históricos,
                    diseccionar organismos virtuales, o practicar procedimientos médicos sin riesgos.
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="bg-cyan-500/10 rounded p-2">
                      <span className="text-cyan-200 font-medium">Ciencias:</span>
                      <span className="text-gray-300 ml-1">Exploración espacial, biología molecular, química orgánica</span>
                    </div>
                    <div className="bg-cyan-500/10 rounded p-2">
                      <span className="text-cyan-200 font-medium">Historia:</span>
                      <span className="text-gray-300 ml-1">Reconstrucciones históricas, viajes en el tiempo</span>
                    </div>
                    <div className="bg-cyan-500/10 rounded p-2">
                      <span className="text-cyan-200 font-medium">Medicina:</span>
                      <span className="text-gray-300 ml-1">Cirugías simuladas, anatomía interactiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>
          </div>

          {/* VR Headsets Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-purple-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🕶️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Tipos de Gafas VR
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-purple-400 font-bold">🎯</span>
                    <span className="text-purple-300 font-semibold text-base">Categorías de Dispositivos VR</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-200 font-medium flex items-center gap-2">
                          📱 <strong>VR Móvil (Smartphone-based)</strong>
                        </span>
                        <span className="text-purple-300 text-xs">$420.000 - 840.000 COP</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">
                        Utiliza el teléfono inteligente como pantalla y procesador. Ideal para principiantes
                        y contenido ligero. Requiere smartphone compatible con giroscopio.
                      </p>
                      <div className="text-xs text-gray-400">
                        <strong>Ejemplos:</strong> Oculus Go, Samsung Gear VR, Google Cardboard<br/>
                        <strong>Resolución:</strong> Depende del smartphone (1080p-1440p)<br/>
                        <strong>Uso recomendado:</strong> Videos 360°, juegos casuales
                      </div>
                    </div>

                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-200 font-medium flex items-center gap-2">
                          🖥️ <strong>VR PC (High-End)</strong>
                        </span>
                        <span className="text-purple-300 text-xs">$2.100.000 - 5.250.000 COP</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">
                        Conectado a una computadora potente para máxima fidelidad gráfica y rendimiento.
                        Ofrece la mejor experiencia inmersiva con seguimiento preciso.
                      </p>
                      <div className="text-xs text-gray-400">
                        <strong>Ejemplos:</strong> Valve Index, HTC Vive Pro 2, HP Reverb G2<br/>
                        <strong>Resolución:</strong> 2160x2160 por ojo (4K total)<br/>
                        <strong>Requisitos PC:</strong> GTX 1060 mínimo, i5-4590<br/>
                        <strong>Uso recomendado:</strong> Gaming AAA, simulaciones profesionales
                      </div>
                    </div>

                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-200 font-medium flex items-center gap-2">
                          🎮 <strong>VR Consola</strong>
                        </span>
                        <span className="text-purple-300 text-xs">$840.000 - 1.260.000 COP</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">
                        Diseñado específicamente para consolas de videojuegos. Fácil configuración
                        y buena relación calidad-precio para gaming.
                      </p>
                      <div className="text-xs text-gray-400">
                        <strong>Ejemplos:</strong> PlayStation VR 2, Oculus Rift (legacy)<br/>
                        <strong>Resolución:</strong> 1832x1920 por ojo<br/>
                        <strong>Consola requerida:</strong> PS4/PS5, PC gaming<br/>
                        <strong>Uso recomendado:</strong> Gaming, entretenimiento familiar
                      </div>
                    </div>

                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-200 font-medium flex items-center gap-2">
                          ☁️ <strong>VR Standalone (All-in-One)</strong>
                        </span>
                        <span className="text-purple-300 text-xs">$1.260.000 - 2.520.000 COP</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">
                        Dispositivos independientes sin necesidad de PC o consola. Procesamiento
                        integrado con seguimiento inside-out. Mayor portabilidad.
                      </p>
                      <div className="text-xs text-gray-400">
                        <strong>Ejemplos:</strong> Meta Quest 2/3, Oculus Quest<br/>
                        <strong>Resolución:</strong> 1832x1920 por ojo<br/>
                        <strong>Almacenamiento:</strong> 128GB-512GB interno<br/>
                        <strong>Uso recomendado:</strong> Movilidad, gaming inalámbrico
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-purple-400 font-bold">🔍</span>
                    <span className="text-purple-300 font-semibold text-base">Especificaciones Técnicas Clave</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    <div className="bg-purple-500/10 rounded p-2">
                      <span className="text-purple-200 font-medium">Campo de Visión (FOV):</span>
                      <span className="text-gray-300 ml-1">90-120° horizontal. Mayor FOV = mejor inmersión</span>
                    </div>
                    <div className="bg-purple-500/10 rounded p-2">
                      <span className="text-purple-200 font-medium">Resolución por Ojo:</span>
                      <span className="text-gray-300 ml-1">1080x1200 mínimo, 1832x1920 recomendado para claridad</span>
                    </div>
                    <div className="bg-purple-500/10 rounded p-2">
                      <span className="text-purple-200 font-medium">Tasa de Refresco:</span>
                      <span className="text-gray-300 ml-1">60-120Hz. Mayor tasa = menos mareos</span>
                    </div>
                    <div className="bg-purple-500/10 rounded p-2">
                      <span className="text-purple-200 font-medium">Seguimiento:</span>
                      <span className="text-gray-300 ml-1">Inside-out (cámaras en HMD) vs external (estaciones base)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-purple-400 font-bold">💡</span>
                    <span className="text-purple-300 font-semibold text-base">Guía de Compra</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-2">
                      <span className="text-yellow-300 font-medium">Para Principiantes:</span>
                      <span className="text-gray-300 ml-1">VR móvil o Quest 2. Bajo costo, fácil setup</span>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                      <span className="text-green-300 font-medium">Para Gamers:</span>
                      <span className="text-gray-300 ml-1">VR PC o PSVR. Mejor rendimiento gráfico</span>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded p-2">
                      <span className="text-blue-300 font-medium">Para Educación:</span>
                      <span className="text-gray-300 ml-1">Modelos con seguimiento preciso y buena resolución</span>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500/30 rounded p-2">
                      <span className="text-purple-300 font-medium">Consideraciones:</span>
                      <span className="text-gray-300 ml-1">Verifica compatibilidad con PC/consola existente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-400/20 transition-all duration-500"></div>
          </div>

          {/* PC Requirements Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-green-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Requisitos de PC
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-400 font-bold">🖥️</span>
                    <span className="text-green-300 font-semibold text-base">Requisitos Técnicos para VR</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    La Realidad Virtual requiere hardware potente debido al procesamiento intensivo de gráficos
                    3D en tiempo real. Los requisitos varían según el tipo de VR y la calidad deseada.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-green-500/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-200 font-medium">⚡ Procesador (CPU)</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Mínimo:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">Intel i5-4590 / AMD Ryzen 5 1500X</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Recomendado:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">Intel i7-8700K / AMD Ryzen 7 3700X</span>
                        </div>
                        <p className="text-gray-400 mt-2">
                          El CPU maneja la física, IA y lógica del juego. Un procesador más rápido reduce
                          latencia y mejora la estabilidad del seguimiento.
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-500/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-200 font-medium">🎮 Tarjeta Gráfica (GPU)</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Mínimo:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">NVIDIA GTX 1060 / AMD RX 580</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Recomendado:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">NVIDIA RTX 2070+ / AMD RX 6700 XT</span>
                        </div>
                        <p className="text-gray-400 mt-2">
                          La GPU renderiza los mundos 3D a altas tasas de frames. Para VR se necesitan
                          al menos 90 FPS estables para evitar mareos.
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-500/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-200 font-medium">💾 Memoria RAM</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Mínimo:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">8GB DDR4</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Recomendado:</span>
                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">16GB+ DDR4-3200</span>
                        </div>
                        <p className="text-gray-400 mt-2">
                          La RAM almacena texturas, modelos 3D y datos de juegos. Más RAM permite
                          mundos más detallados y menos carga de disco.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-400 font-bold">🔧</span>
                    <span className="text-green-300 font-semibold text-base">Optimización y Rendimiento</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                      <span className="text-yellow-300 font-medium text-sm">Configuración de VR</span>
                      <ul className="text-gray-300 mt-2 space-y-1 text-xs">
                        <li>• <strong>SteamVR:</strong> Configurar tasas de refresco y renderizado</li>
                        <li>• <strong>Oculus:</strong> Ajustar calidad gráfica vs rendimiento</li>
                        <li>• <strong>Resolution:</strong> 100% para máxima calidad, 80% para mejor FPS</li>
                        <li>• <strong>Super Sampling:</strong> Mejora claridad pero reduce rendimiento</li>
                      </ul>
                    </div>

                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                      <span className="text-blue-300 font-medium text-sm">Problemas Comunes y Soluciones</span>
                      <ul className="text-gray-300 mt-2 space-y-1 text-xs">
                        <li>• <strong>Baja tasa de frames:</strong> Reducir configuración gráfica</li>
                        <li>• <strong>Calentamiento:</strong> Mejorar ventilación y cooling</li>
                        <li>• <strong>Latencia alta:</strong> Actualizar controladores USB</li>
                        <li>• <strong>Mareos:</strong> Aumentar frecuencia de refresco</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-400 font-bold">💰</span>
                    <span className="text-green-300 font-semibold text-base">Costos y Actualizaciones</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="bg-green-500/10 rounded p-3">
                      <span className="text-green-200 font-medium">PC Gaming Básica:</span>
                      <span className="text-gray-300 block mt-1">$2.500.000 - 4.000.000 COP</span>
                      <span className="text-gray-400 text-xs">Suficiente para VR básico</span>
                    </div>
                    <div className="bg-green-500/10 rounded p-3">
                      <span className="text-green-200 font-medium">PC Gaming Avanzada:</span>
                      <span className="text-gray-300 block mt-1">$5.000.000 - 8.000.000 COP</span>
                      <span className="text-gray-400 text-xs">Para máxima calidad VR</span>
                    </div>
                    <div className="bg-green-500/10 rounded p-3">
                      <span className="text-green-200 font-medium">Mejora de PC existente:</span>
                      <span className="text-gray-300 block mt-1">$1.000.000 - 2.500.000 COP</span>
                      <span className="text-gray-400 text-xs">GPU + RAM adicionales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-400/20 transition-all duration-500"></div>
          </div>

          {/* Security Protocols Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-red-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.4s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    Protocolos de Seguridad
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-400 font-bold">🛡️</span>
                    <span className="text-red-300 font-semibold text-base">Marco General de Seguridad</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Los protocolos de seguridad en plataformas educativas implementan múltiples capas de protección
                    para salvaguardar la integridad de estudiantes, profesores y contenido educativo.
                  </p>
                  <div className="bg-red-500/10 rounded-lg p-3">
                    <span className="text-red-300 font-medium">Pilares fundamentales de la seguridad:</span>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• <strong>Prevención:</strong> Filtros y validaciones proactivas</li>
                      <li>• <strong>Detección:</strong> Monitoreo continuo y análisis de patrones</li>
                      <li>• <strong>Respuesta:</strong> Protocolos de actuación ante incidentes</li>
                      <li>• <strong>Recuperación:</strong> Planes de contingencia y backup</li>
                      <li>• <strong>Cumplimiento:</strong> Alineación con marcos regulatorios</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-400 font-bold">👁️</span>
                    <span className="text-red-300 font-semibold text-base">Verificación de Contenido Sensible</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      Sistema de IA avanzada que analiza automáticamente todo el contenido multimedia antes de su
                      distribución, utilizando algoritmos de machine learning para detectar material inapropiado,
                      violento o peligroso.
                    </p>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Tecnologías implementadas:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• <strong>Computer Vision:</strong> Análisis de imágenes y videos</li>
                        <li>• <strong>Natural Language Processing:</strong> Detección de texto ofensivo</li>
                        <li>• <strong>Pattern Recognition:</strong> Identificación de comportamientos sospechosos</li>
                        <li>• <strong>Deep Learning Models:</strong> Redes neuronales entrenadas en datasets especializados</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Métricas de rendimiento:</span>
                      <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                        <div className="text-gray-300">• Precisión: {'>'}95%</div>
                        <div className="text-gray-300">• Latencia: {'<'}2 segundos</div>
                        <div className="text-gray-300">• Falsos positivos: {'<'}2%</div>
                        <div className="text-gray-300">• Cobertura: 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-400 font-bold">🚫</span>
                    <span className="text-red-300 font-semibold text-base">Sistema de Bloqueo Inteligente</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      Filtros adaptativos que previenen el acceso a contenido no autorizado mediante reglas
                      configurables basadas en políticas institucionales, regulatorias y de seguridad.
                    </p>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Métodos de filtrado:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• <strong>Filtrado por URL:</strong> Bloqueo de dominios y rutas específicas</li>
                        <li>• <strong>Análisis de Keywords:</strong> Detección de términos prohibidos</li>
                        <li>• <strong>Filtrado por IP:</strong> Restricción geográfica y por rangos de IP</li>
                        <li>• <strong>Categorización automática:</strong> Clasificación por tipo de contenido</li>
                        <li>• <strong>Horarios de acceso:</strong> Restricciones temporales por usuario/grupo</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Integración con sistemas:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Active Directory para autenticación centralizada</li>
                        <li>• SIEM para correlación de eventos de seguridad</li>
                        <li>• DLP (Data Loss Prevention) para protección de datos</li>
                        <li>• Logging completo para auditorías y cumplimiento</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-400 font-bold">⚖️</span>
                    <span className="text-red-300 font-semibold text-base">Protección Infantil y Regulatoria</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                      <span className="text-yellow-300 font-medium text-sm">COPPA (Children's Online Privacy Protection Act)</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Verificación de edad obligatoria para menores de 13 años</li>
                        <li>• Consentimiento parental verificable para recolección de datos</li>
                        <li>• Anonimización automática de información personal</li>
                        <li>• Derechos de eliminación de datos a petición</li>
                        <li>• Notificaciones claras sobre uso de datos</li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                      <span className="text-blue-300 font-medium text-sm">GDPR y Ley 679/2001 (Colombia)</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Principio de minimización de datos recopilados</li>
                        <li>• Transparencia en políticas de privacidad</li>
                        <li>• Derechos de acceso, rectificación y eliminación</li>
                        <li>• Evaluaciones de impacto de privacidad</li>
                        <li>• Notificación de brechas de seguridad en 72 horas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-400 font-bold">🔐</span>
                    <span className="text-red-300 font-semibold text-base">Encriptación y Protección de Datos</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      Implementación de encriptación de extremo a extremo utilizando estándares militares
                      para proteger datos sensibles tanto en tránsito como en reposo.
                    </p>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Protocolos de encriptación:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• <strong>AES-256:</strong> Estándar de encriptación simétrica FIPS 140-2</li>
                        <li>• <strong>TLS 1.3:</strong> Encriptación de transporte con forward secrecy</li>
                        <li>• <strong>HSM (Hardware Security Modules):</strong> Almacenamiento seguro de claves</li>
                        <li>• <strong>Zero-Knowledge Architecture:</strong> Los servidores no pueden leer datos</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <span className="text-red-200 font-medium">Estrategias de backup:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Backups encriptados con claves separadas</li>
                        <li>• Replicación geográfica con redundancia</li>
                        <li>• Pruebas regulares de recuperación de desastres</li>
                        <li>• Retención de datos según políticas regulatorias</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-400/20 transition-all duration-500"></div>
          </div>

          {/* Official Resources Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-yellow-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.5s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Recursos Oficiales
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-yellow-400 font-bold">📚</span>
                    <span className="text-yellow-300 font-semibold text-base">Biblioteca de Recursos Especializados</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Recursos oficiales y especializados para profundizar en gamificación, VR y aprendizaje inmersivo.
                    Cada fuente ofrece perspectivas únicas y conocimientos avanzados en estas disciplinas emergentes.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-xl">🎮</span>
                        <div>
                          <h4 className="text-yellow-200 font-semibold">Gamification World</h4>
                          <p className="text-yellow-300/70 text-xs">gamificationworld.com</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                        Portal líder en gamificación con artículos, estudios de caso y herramientas prácticas.
                        Ofrece certificaciones profesionales y comunidad activa de expertos en diseño de juegos.
                      </p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Casos de Estudio</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Herramientas</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Certificaciones</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-xl">🔬</span>
                        <div>
                          <h4 className="text-yellow-200 font-semibold">Gamification Research Network</h4>
                          <p className="text-yellow-300/70 text-xs">gamificationresearch.org</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                        Red académica dedicada a la investigación científica en gamificación. Publica papers,
                        revisiones sistemáticas y estudios empíricos sobre el impacto de la gamificación en el aprendizaje.
                      </p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Investigación</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Papers</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Estudios</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-xl">🏛️</span>
                        <div>
                          <h4 className="text-yellow-200 font-semibold">International Gamification Association</h4>
                          <p className="text-yellow-300/70 text-xs">gamificationassociation.org</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                        Asociación internacional que establece estándares profesionales, ética y mejores prácticas
                        en gamificación. Organiza conferencias anuales y certifica profesionales del sector.
                      </p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Estándares</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Conferencias</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Certificación</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-xl">📖</span>
                        <div>
                          <h4 className="text-yellow-200 font-semibold">Yu-Kai Chou - Actionable Gamification</h4>
                          <p className="text-yellow-300/70 text-xs">yukaichou.com</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                        Framework Octalysis de gamificación creado por el experto Yu-Kai Chou. Ofrece
                        metodologías prácticas, frameworks y herramientas para diseñar experiencias gamificadas efectivas.
                      </p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Octalysis</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Framework</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Diseño</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-xl">🎯</span>
                        <div>
                          <h4 className="text-yellow-200 font-semibold">Gamification Co.</h4>
                          <p className="text-yellow-300/70 text-xs">gamification.co</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                        Empresa consultora especializada en implementación de gamificación empresarial.
                        Ofrece servicios de consultoría, capacitación y desarrollo de soluciones gamificadas.
                      </p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Consultoría</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Empresarial</span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">Implementación</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-yellow-400 font-bold">🎓</span>
                    <span className="text-yellow-300 font-semibold text-base">Recursos Educativos Adicionales</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    <div className="bg-yellow-500/10 rounded p-3">
                      <span className="text-yellow-200 font-medium">Coursera - Gamification:</span>
                      <span className="text-gray-300 ml-1">Cursos universitarios sobre diseño de juegos y gamificación</span>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-3">
                      <span className="text-yellow-200 font-medium">edX - VR/AR:</span>
                      <span className="text-gray-300 ml-1">Especializaciones en realidad virtual y aumentada</span>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-3">
                      <span className="text-yellow-200 font-medium">Udacity - XR Development:</span>
                      <span className="text-gray-300 ml-1">Nanogrados en desarrollo de experiencias inmersivas</span>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-3">
                      <span className="text-yellow-200 font-medium">LinkedIn Learning:</span>
                      <span className="text-gray-300 ml-1">Biblioteca completa de cursos sobre gamificación y VR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl group-hover:bg-yellow-400/20 transition-all duration-500"></div>
          </div>

          {/* Gamification Definition Card */}
          <div className="card-3d group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up border border-white/20 hover:border-blue-400/50 overflow-hidden animate-card-tilt holographic-border" style={{animationDelay: '0.6s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-hologram"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ¿Qué es la Gamificación?
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-bold">🎯</span>
                    <span className="text-blue-300 font-semibold text-base">Definición y Conceptos Fundamentales</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    La gamificación es una estrategia de diseño que incorpora elementos característicos de los juegos
                    en contextos no lúdicos para aumentar la motivación, participación y engagement de los usuarios.
                    No se trata de convertir todo en un juego, sino de aprovechar los principios psicológicos que hacen
                    los juegos atractivos.
                  </p>
                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <span className="text-blue-300 font-medium">Elementos básicos de gamificación:</span>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• <strong>Puntos:</strong> Sistema de recompensas cuantificables</li>
                      <li>• <strong>Insignias/Logros:</strong> Reconocimiento de hitos alcanzados</li>
                      <li>• <strong>Tableros de clasificación:</strong> Competencia y comparación social</li>
                      <li>• <strong>Retos/Misiones:</strong> Objetivos claros y desafiantes</li>
                      <li>• <strong>Progreso visual:</strong> Indicadores de avance y crecimiento</li>
                      <li>• <strong>Recompensas variables:</strong> Sistema de premios impredecibles</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-bold">🧠</span>
                    <span className="text-blue-300 font-semibold text-base">Fundamentos Psicológicos</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      La gamificación se basa en principios de psicología del comportamiento y motivación humana,
                      aprovechando teorías como la Autodeterminación y el Flujo de Csikszentmihalyi.
                    </p>
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <span className="text-blue-200 font-medium">Teoría de la Autodeterminación (Deci & Ryan):</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• <strong>Autonomía:</strong> Sentido de control y elección personal</li>
                        <li>• <strong>Competencia:</strong> Sensación de maestría y progreso</li>
                        <li>• <strong>Relación:</strong> Conexión social y sentido de pertenencia</li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <span className="text-blue-200 font-medium">Flujo Óptimo (Flow State):</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Equilibrio entre desafío y habilidades</li>
                        <li>• Retroalimentación inmediata y clara</li>
                        <li>• Enfoque completo en la tarea</li>
                        <li>• Sensación de control y propósito</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-bold">🎮</span>
                    <span className="text-blue-300 font-semibold text-base">Framework Octalysis</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      Framework creado por Yu-Kai Chou que identifica 8 motivadores humanos fundamentales
                      organizados en núcleo (intrínsecos) y blanco (extrínsecos).
                    </p>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                        <span className="text-green-300 font-medium">Núcleo (Motivación Intrínseca):</span>
                        <span className="text-gray-300 block mt-1">• Significado • Realización • Empoderamiento • Propiedad • Comunidad Social • Creatividad • Maestría • Inmersión</span>
                      </div>
                      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-2">
                        <span className="text-yellow-300 font-medium">Blanco (Motivación Extrínseca):</span>
                        <span className="text-gray-300 block mt-1">• Puntos • Insignias • Tableros • Competición • Escasez • Aleatoriedad • Urgencia • Evitación</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-bold">📊</span>
                    <span className="text-blue-300 font-semibold text-base">Aplicaciones en Educación</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      La gamificación transforma el aprendizaje al hacer que los procesos educativos sean más
                      atractivos, aumentando la retención de información y la participación estudiantil.
                    </p>
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <span className="text-blue-200 font-medium">Beneficios comprobados:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• <strong>25-40% aumento</strong> en participación estudiantil</li>
                        <li>• <strong>30-50% mejora</strong> en retención de conocimientos</li>
                        <li>• <strong>Reducción del 50%</strong> en deserción académica</li>
                        <li>• <strong>Mejor engagement</strong> en tareas repetitivas o complejas</li>
                        <li>• <strong>Desarrollo de habilidades</strong> metacognitivas</li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <span className="text-blue-200 font-medium">Aplicaciones prácticas:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Plataformas de aprendizaje online (Coursera, edX)</li>
                        <li>• Apps educativas (Duolingo, Khan Academy)</li>
                        <li>• Sistemas de gestión del aprendizaje (Moodle, Canvas)</li>
                        <li>• Evaluación formativa y retroalimentación</li>
                        <li>• Desarrollo de hábitos de estudio</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-bold">⚠️</span>
                    <span className="text-blue-300 font-semibold text-base">Consideraciones Éticas</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-200 leading-relaxed">
                      Aunque la gamificación ofrece grandes beneficios, es importante implementarla de manera ética
                      y responsable para evitar efectos negativos en los usuarios.
                    </p>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                      <span className="text-red-300 font-medium">Riesgos potenciales:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Adicción a sistemas de recompensas</li>
                        <li>• Comparación social negativa</li>
                        <li>• Manipulación psicológica</li>
                        <li>• Desmotivación por sobre-gamificación</li>
                        <li>• Pérdida de propósito educativo real</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                      <span className="text-green-300 font-medium">Mejores prácticas:</span>
                      <ul className="text-gray-300 mt-1 space-y-1 text-xs">
                        <li>• Enfoque en aprendizaje significativo, no solo puntos</li>
                        <li>• Diseño inclusivo para diferentes estilos de aprendizaje</li>
                        <li>• Transparencia en mecánicas de gamificación</li>
                        <li>• Balance entre motivación intrínseca y extrínseca</li>
                        <li>• Evaluación continua del impacto educativo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
