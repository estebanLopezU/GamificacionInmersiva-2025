"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { DJANGO_BASE_URL } from '../../lib/api';

export default function Header() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Background with enhanced blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-1/2 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo and Brand Section */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
              <div className="relative">
                <Image
                  src="/UNAL.webp"
                  alt="Logo UNAL"
                  width={50}
                  height={50}
                  className="hover:rotate-12 transition-all duration-300 drop-shadow-lg group-hover:scale-110 h-auto animate-pulse"
                />
                <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                  Centro VR
                </h1>
                <p className="text-xs text-slate-400 font-medium -mt-0.5">
                  Realidad Virtual UNAL
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation and User Section */}
          <div className="flex items-center space-x-2 lg:space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/page"
                className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-slate-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5 group"
              >
                <span className="relative z-10">Centro Info</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/games"
                className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-slate-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5 group"
              >
                <span className="relative z-10">Juegos</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/admin-login"
                className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-orange-300 hover:text-orange-100 transition-all duration-200 rounded-lg hover:bg-orange-500/10 group"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* User Section */}
            {loading ? (
              <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 lg:space-x-3 px-2 lg:px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                >
                  {/* User Avatar */}
                  <div className="relative">
                    <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <span className="text-white font-bold text-sm lg:text-base">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                  </div>

                  {/* User Info - Hidden on small screens */}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white leading-tight">
                      {user.username || 'Usuario'}
                    </p>
                    <p className="text-xs text-slate-400 leading-tight">
                      Estudiante
                    </p>
                  </div>

                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Enhanced Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden z-50 animate-fade-in-up">
                    {/* User Info Header */}
                    <div className="px-4 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {user.username?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user.username}</p>
                          <p className="text-sm text-slate-400">{user.email || 'Sin correo'}</p>
                          <p className="text-xs text-slate-500 capitalize">Rol: {user.role || 'Estudiante'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/page"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                          <span className="text-blue-400">👤</span>
                        </div>
                        <span>Ver Perfil</span>
                      </Link>

                      <Link
                        href="/page"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                          <span className="text-purple-400">⚙️</span>
                        </div>
                        <span>Configuración</span>
                      </Link>

                      <Link
                        href="/change-password"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <span className="text-green-400">🔒</span>
                        </div>
                        <span>Cambiar Contraseña</span>
                      </Link>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-slate-700/50 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                          <span className="text-red-400">🚪</span>
                        </div>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <span>Acceder</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
