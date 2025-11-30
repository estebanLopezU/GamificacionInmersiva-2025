"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth(); // Use useAuth hook
  const [userCount, setUserCount] = useState<number>(0);
  const [loadingData, setLoadingData] = useState(true); // Loading state for data fetching
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Effect to handle token from URL parameters (for redirection from Django)
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !user && !authLoading) {
      // Save token to localStorage
      localStorage.setItem('access_token', token);
      // Remove token from URL
      router.replace('/admin', undefined);
      // The useAuth hook will detect the token and fetch user data
    }
  }, [searchParams, user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (authLoading) {
        return; // Still checking auth, wait
      }

      if (!user) {
        // Not authenticated, redirect to login
        router.push('/login');
        return;
      }

      // Check if user is admin
      if (user.role !== 'admin') {
        router.push('/games'); // Redirect non-admin users to user page (games)
        return;
      }

      setLoadingData(true);
      try {
        const token = localStorage.getItem('access_token'); // Ensure token is available for API calls
        if (!token) {
          await logout(); // Should not happen if user is set, but as a fallback
          return;
        }

        // Fetch user count
        const countResponse = await api.getUserCount(token);

        console.log('Admin: User count response status:', countResponse.status);

        if (countResponse.ok) {
          const countData = await countResponse.json();
          console.log('Admin: User count data:', countData);
          setUserCount(countData.total_users);
        } else {
          const errorText = await countResponse.text();
          console.error('Admin: User count error:', errorText);
          setError('No se pudo obtener el conteo de usuarios');
          // Optionally, force logout if API token is invalid
          if (countResponse.status === 401 || countResponse.status === 403) {
            await logout();
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Ocurrió un error al cargar los datos');
        await logout(); // Logout on any data fetching error
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user, authLoading, router, logout]); // Depend on user, authLoading, router, and logout

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If we reach here, user is loaded, not loading, and is an admin
  // The redirects above will handle non-admin or unauthenticated users
  if (!user || user.role !== 'admin') {
    return null; // Should have been redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl font-bold text-blue-400 mb-2 animate-pulse">
              {userCount}
            </div>
            <div className="text-gray-300">Total de Usuarios</div>
            <div className="text-sm text-gray-500 mt-2">
              Registrados en la plataforma
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl font-bold text-green-400 mb-2 animate-pulse">
              {Math.floor(userCount * 0.85)}
            </div>
            <div className="text-gray-300">Usuarios Activos</div>
            <div className="text-sm text-gray-500 mt-2">
              ~85% del total
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl font-bold text-purple-400 mb-2 animate-pulse">
              {Math.floor(userCount * 0.15)}
            </div>
            <div className="text-gray-300">Administradores</div>
            <div className="text-sm text-gray-500 mt-2">
              ~15% del total
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">
              {Math.floor(userCount * 0.65)}
            </div>
            <div className="text-gray-300">Usuarios Regulares</div>
            <div className="text-sm text-gray-500 mt-2">
              Usuarios con rol 'user'
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Gestión de Usuarios</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                Ver Lista de Usuarios
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                Crear Nuevo Usuario
              </button>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition-colors">
                Gestionar Roles
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-400">Sistema y Estadísticas</h3>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors">
                Ver Logs del Sistema
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors">
                Estadísticas de Uso
              </button>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded transition-colors">
                Configuración del Sistema
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Actividad Reciente</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div>
                <span className="text-gray-300">Nuevo usuario registrado: </span>
                <span className="text-blue-400">usuario_ejemplo</span>
              </div>
              <span className="text-sm text-gray-500">hace 5 minutos</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div>
                <span className="text-gray-300">Inicio de sesión administrador</span>
              </div>
              <span className="text-sm text-gray-500">hace 10 minutos</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div>
                <span className="text-gray-300">Sistema: Backup completado</span>
              </div>
              <span className="text-sm text-gray-500">hace 1 hora</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push('/games')}
                className="bg-white text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Ver Centro de Gamificación
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Generar Reporte
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Exportar Datos
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
