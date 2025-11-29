"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { api, DJANGO_BASE_URL } from '../../lib/api';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string; email?: string; role: string } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is authenticated and get user data
    const checkUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await api.getUser(token);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    // Close profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't show the header on the login page
  if (pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    // Clear tokens and redirect to Django index
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = DJANGO_BASE_URL;
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-2xl z-30 animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative group">
              <Image src="/UNAL.webp" alt="Logo UNAL" width={50} height={50} className="hover:rotate-12 transition-all duration-300 drop-shadow-lg group-hover:scale-110 h-auto animate-pulse" />
              <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg animate-glow">
              Centro de Información de Realidad Virtual
            </h1>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/page" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 relative group">
            Centro de Información
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full animate-pulse"></span>
          </Link>
          <Link href="/games" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 relative group">
            Juegos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full animate-pulse"></span>
          </Link>
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm">{user.username}</span>
                <svg className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{user.username}</p>
                    <p className="text-xs text-gray-400">{user.email || 'Sin correo'}</p>
                    <p className="text-xs text-gray-500 capitalize">Rol: {user.role}</p>
                  </div>

                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      👤 Ver Perfil
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      ⚙️ Configuración de Cuenta
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      🔒 Cambiar Contraseña
                    </button>
                  </div>

                  <div className="border-t border-gray-700 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-xl group relative animate-pulse"
            >
              Acceder
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
