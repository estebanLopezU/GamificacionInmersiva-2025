"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { User } from '@/types/index';

interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'superadmin';
  user_type: 'student' | 'professor';
  display_name: string;
  academic_program?: string;
  career?: string;
  semester?: number;
  job_title?: string;
  is_permanent?: boolean;
}

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth(); // Use useAuth hook
  const [userCount, setUserCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true); // Loading state for data fetching
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard');

  // Modal states
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form state
  const [userForm, setUserForm] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    role: 'user',
    user_type: 'student',
    display_name: '',
    academic_program: '',
    career: '',
    semester: undefined,
    job_title: '',
    is_permanent: undefined
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Effect to handle token from URL parameters (for redirection from Django)
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !authLoading) {
      // Clear any existing tokens first to avoid session conflicts
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Save new token to localStorage
      localStorage.setItem('access_token', token);
      
      // Remove token from URL and reload in one step to avoid infinite loop
      window.location.href = '/admin';
    }
  }, [searchParams, authLoading]);

  // Fetch user data
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await api.getUsers(token);
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch user count
  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await api.getUserCount(token);
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.total_users);
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

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

      // Check if user is admin or superadmin
      if (user.role !== 'admin' && user.role !== 'superadmin') {
        router.push('/games'); // Redirect non-admin users to user page (games)
        return;
      }

      setLoadingData(true);
      try {
        await Promise.all([fetchUserCount(), fetchUsers()]);
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

  // If we reach here, user is loaded, not loading, and is an admin or superadmin
  // The redirects above will handle non-admin or unauthenticated users
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return null; // Should have been redirected by useEffect
  }

  // Handler functions
  const handleCreateUser = async () => {
    setModalLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await api.createUser(token, userForm);
      if (response.ok) {
        setShowCreateUserModal(false);
        resetUserForm();
        await fetchUsers();
        await fetchUserCount();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al crear usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    setModalLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await api.updateUser(token, selectedUser.id, userForm);
      if (response.ok) {
        setShowEditUserModal(false);
        setSelectedUser(null);
        resetUserForm();
        await fetchUsers();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setModalLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await api.deleteUser(token, selectedUser.id);
      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedUser(null);
        await fetchUsers();
        await fetchUserCount();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al eliminar usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setModalLoading(false);
    }
  };

  const resetUserForm = () => {
    setUserForm({
      username: '',
      email: '',
      password: '',
      role: 'user',
      user_type: 'student',
      display_name: '',
      academic_program: '',
      career: '',
      semester: undefined,
      job_title: '',
      is_permanent: undefined
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      password: '', // Don't show password
      role: user.role,
      user_type: user.user_type || 'student',
      display_name: user.display_name || '',
      academic_program: user.academic_program || '',
      career: user.career || '',
      semester: user.semester || undefined,
      job_title: user.job_title || '',
      is_permanent: user.is_permanent || undefined
    });
    setShowEditUserModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">SUPERADMIN</span>;
      case 'admin':
        return <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">ADMIN</span>;
      default:
        return <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">USER</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Bienvenido, {user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-300 hover:text-white">×</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Gestión de Usuarios
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-blue-400 mb-2">{userCount}</div>
                <div className="text-gray-300">Total de Usuarios</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-green-400 mb-2">{users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}</div>
                <div className="text-gray-300">Administradores</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{users.filter(u => u.role === 'user').length}</div>
                <div className="text-gray-300">Usuarios Regulares</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-purple-400 mb-2">{users.filter(u => u.user_type === 'student').length}</div>
                <div className="text-gray-300">Estudiantes</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded transition-colors"
                >
                  Gestionar Usuarios
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded transition-colors"
                >
                  Ver Centro de Gamificación
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded transition-colors">
                  Generar Reportes
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <>
            {/* Users Management */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Gestión de Usuarios</h3>
                <button
                  onClick={() => setShowCreateUserModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  + Crear Usuario
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha Registro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{u.username}</div>
                          <div className="text-sm text-gray-400">{u.display_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(u.role)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{u.user_type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(u.date_joined || '').toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openEditModal(u)}
                            className="text-blue-400 hover:text-blue-300 mr-3"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => openDeleteModal(u)}
                            className="text-red-400 hover:text-red-300"
                            disabled={u.role === 'superadmin' && user?.role !== 'superadmin'}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Crear Nuevo Usuario</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value as any})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                {user?.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
              </select>
              <select
                value={userForm.user_type}
                onChange={(e) => setUserForm({...userForm, user_type: e.target.value as any})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="student">Estudiante</option>
                <option value="professor">Profesor</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                disabled={modalLoading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
              >
                {modalLoading ? 'Creando...' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Editar Usuario</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value as any})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                {user?.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
              </select>
              <select
                value={userForm.user_type}
                onChange={(e) => setUserForm({...userForm, user_type: e.target.value as any})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="student">Estudiante</option>
                <option value="professor">Profesor</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditUser}
                disabled={modalLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
              >
                {modalLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Confirmar Eliminación</h3>
            <p className="text-gray-300 mb-4">
              ¿Estás seguro de que quieres eliminar al usuario <strong>{selectedUser?.email}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={modalLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
              >
                {modalLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
