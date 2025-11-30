"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DJANGO_BASE_URL } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    user_type: '',
    display_name: '',
    career: '',
    semester: '',
    academic_program: '',
    job_title: '',
    is_permanent: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStudentFields, setShowStudentFields] = useState(false);
  const [showProfessorFields, setShowProfessorFields] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userType = e.target.value;
    setFormData(prev => ({
      ...prev,
      user_type: userType,
      career: '',
      semester: '',
      academic_program: '',
      job_title: '',
      is_permanent: ''
    }));

    setShowStudentFields(userType === 'student');
    setShowProfessorFields(userType === 'professor');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields based on user type
      if (formData.user_type === 'student') {
        if (!formData.career || !formData.semester) {
          throw new Error('Para estudiantes, se requieren carrera y semestre.');
        }
      } else if (formData.user_type === 'professor') {
        if (!formData.job_title || !formData.is_permanent) {
          throw new Error('Para profesores, se requieren cargo y tipo de contratación.');
        }
      }

      // Prepare data for submission
      const submitData = {
        ...formData,
        semester: formData.semester ? parseInt(formData.semester) : null,
        is_permanent: formData.is_permanent === 'true' ? true : formData.is_permanent === 'false' ? false : null
      };

      // Remove empty fields
      Object.keys(submitData).forEach(key => {
        if (submitData[key as keyof typeof submitData] === '' || submitData[key as keyof typeof submitData] === null) {
          delete submitData[key as keyof typeof submitData];
        }
      });

      const response = await fetch(`${DJANGO_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else {
          router.push('/login');
        }
      } else {
        const errorData = await response.json();
        let errorMessage = 'Registration failed: ';
        for (const key in errorData) {
          if (Array.isArray(errorData[key])) {
            errorMessage += `${key}: ${errorData[key].join(', ')} `;
          } else {
            errorMessage += `${key}: ${errorData[key]} `;
          }
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Correo UNAL (@unal.edu.co)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="role">
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="user_type">
              Tipo de Usuario
            </label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleUserTypeChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Seleccionar...</option>
              <option value="student">Estudiante</option>
              <option value="professor">Profesor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="display_name">
              Nombre Completo
            </label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          {showStudentFields && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="career">
                  Carrera *
                </label>
                <input
                  type="text"
                  id="career"
                  name="career"
                  value={formData.career}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="semester">
                  Semestre *
                </label>
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="academic_program">
                  Programa Académico
                </label>
                <input
                  type="text"
                  id="academic_program"
                  name="academic_program"
                  value={formData.academic_program}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {showProfessorFields && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="job_title">
                  Cargo *
                </label>
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="is_permanent">
                  Tipo de Contratación *
                </label>
                <select
                  id="is_permanent"
                  name="is_permanent"
                  value={formData.is_permanent}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="true">Profesor de Planta</option>
                  <option value="false">Profesor Ocasional</option>
                </select>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">
            ¿Ya tienes cuenta?{' '}
            <a
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
