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
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
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
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-10px) rotate(120deg);
    }
    66% {
      transform: translateY(5px) rotate(240deg);
    }
  }

  @keyframes spin-reverse-slow {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-spin-reverse-slow {
    animation: spin-reverse-slow 15s linear infinite;
  }
`}</style>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Elegant Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-400/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-purple-400/30 rotate-12 animate-bounce-slow"></div>
          <div className="absolute top-1/3 right-10 w-28 h-28 border-2 border-yellow-400/30 rounded-lg animate-spin-reverse-slow"></div>
          <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-purple-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
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

        {/* VR and Technology Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* VR Getting Started Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-cyan-400/50 overflow-hidden" style={{animationDelay: '0.1s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 font-bold">🎯</span>
                    <span className="text-cyan-300 font-semibold">Primeros Pasos</span>
                  </div>
                  <p className="text-gray-200 text-sm">
                    1. Elige tus gafas VR<br/>
                    2. Configura tu espacio de juego<br/>
                    3. Instala aplicaciones VR<br/>
                    4. ¡Comienza tu aventura!
                  </p>
                </div>
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 font-bold">💡</span>
                    <span className="text-cyan-300 font-semibold">Consejo</span>
                  </div>
                  <p className="text-gray-200 text-sm">
                    Comienza con experiencias cortas (15-30 min) para evitar mareos.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all duration-500"></div>
          </div>

          {/* VR Headsets Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-purple-400/50 overflow-hidden" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <div className="space-y-3">
                {[
                  { icon: "📱", name: "VR Móvil", desc: "Oculus Go, Samsung Gear VR", price: "$200-400", delay: "0.1s" },
                  { icon: "🖥️", name: "VR PC", desc: "Valve Index, HTC Vive Pro", price: "$400-1000", delay: "0.2s" },
                  { icon: "🎮", name: "Consola", desc: "PlayStation VR, Oculus Quest", price: "$300-500", delay: "0.3s" },
                  { icon: "☁️", name: "Standalone", desc: "Oculus Quest 2/3", price: "$300-500", delay: "0.4s" }
                ].map((item, index) => (
                  <div key={index} className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:bg-purple-500/20 animate-fade-in-up" style={{animationDelay: item.delay}}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-400 text-lg">{item.icon}</span>
                      <span className="text-purple-300 font-bold text-sm">{item.price}</span>
                    </div>
                    <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                    <p className="text-gray-300 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-400/20 transition-all duration-500"></div>
          </div>

          {/* PC Requirements Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-green-400/50 overflow-hidden" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 font-bold">🖥️</span>
                    <span className="text-green-300 font-semibold">Procesador</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mínimo:</span>
                      <span className="text-green-300 font-mono">Intel i5-4590</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Recomendado:</span>
                      <span className="text-green-300 font-mono">Intel i7-8700K</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 font-bold">🎮</span>
                    <span className="text-green-300 font-semibold">Tarjeta Gráfica</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mínimo:</span>
                      <span className="text-green-300 font-mono">GTX 1060</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Recomendado:</span>
                      <span className="text-green-300 font-mono">RTX 2070+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-400/20 transition-all duration-500"></div>
          </div>

          {/* Security Protocols Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-red-400/50 overflow-hidden" style={{animationDelay: '0.4s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <div className="space-y-3">
                {[
                  { icon: "👁️", text: "Verificación de contenido sensible", delay: "0.1s" },
                  { icon: "🚫", text: "Bloqueo de contenido inapropiado", delay: "0.2s" },
                  { icon: "⚖️", text: "Cumplimiento con leyes de protección infantil", delay: "0.3s" },
                  { icon: "🔐", text: "Encriptación de datos personales", delay: "0.4s" },
                  { icon: "🚨", text: "Sistema de reporte de abuso", delay: "0.5s" },
                  { icon: "👨‍👩‍👧‍👦", text: "Controles parentales avanzados", delay: "0.6s" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:bg-red-500/20 animate-fade-in-up" style={{animationDelay: item.delay}}>
                    <span className="text-red-400 text-lg">{item.icon}</span>
                    <span className="text-gray-200 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-400/20 transition-all duration-500"></div>
          </div>

          {/* Official Resources Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-yellow-400/50 overflow-hidden" style={{animationDelay: '0.5s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <div className="space-y-3">
                {[
                  { icon: "🎮", name: "Gamification World", url: "gamificationworld.com", delay: "0.1s" },
                  { icon: "📚", name: "Gamification Research Network", url: "gamificationresearch.org", delay: "0.2s" },
                  { icon: "🔬", name: "International Gamification Association", url: "gamificationassociation.org", delay: "0.3s" },
                  { icon: "🎯", name: "Gamification Co.", url: "gamification.co", delay: "0.4s" },
                  { icon: "📖", name: "Yu-Kai Chou - Actionable Gamification", url: "yukaichou.com", delay: "0.5s" },
                  { icon: "🏛️", name: "Gamification Wiki", url: "gamification.org", delay: "0.6s" }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20 hover:border-yellow-400/40 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-102 hover:shadow-lg animate-fade-in-up group"
                    style={{animationDelay: item.delay}}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm group-hover:text-yellow-200 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-yellow-300/70 text-xs font-mono">
                          {item.url}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl group-hover:bg-yellow-400/20 transition-all duration-500"></div>
          </div>

          {/* Gamification Definition Card */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up border border-white/20 hover:border-blue-400/50 overflow-hidden" style={{animationDelay: '0.6s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              <p className="text-gray-300 mb-6 leading-relaxed">
                La gamificación es la aplicación de elementos de diseño de juegos en contextos no lúdicos
                para hacerlos más atractivos y motivadores.
              </p>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-4 group-hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-400 font-bold">✨</span>
                  <span className="text-blue-300 font-semibold">Beneficios</span>
                </div>
                <p className="text-gray-200 text-sm">
                  Aumenta la participación, mejora el aprendizaje y fomenta el engagement.
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
