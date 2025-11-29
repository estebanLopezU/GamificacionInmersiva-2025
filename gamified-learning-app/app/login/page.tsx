"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, DJANGO_BASE_URL } from '@/lib/api';
import { LoginResponse, ApiError } from '@/types';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(username, password);

      if (response.ok) {
        const data: LoginResponse = await response.json();
        console.log('Login successful:', data);

        // Store JWT tokens
        if (data.tokens) {
          localStorage.setItem('access_token', data.tokens.access);
          localStorage.setItem('refresh_token', data.tokens.refresh);
          console.log('Tokens stored successfully');

          // Role-based redirection
          if (data.role === 'admin') {
            console.log('Redirecting to admin page');
            router.push('/admin');
          } else {
            console.log('Redirecting to user page');
            router.push('/page');
          }
        } else {
          console.error('No tokens received in login response');
          setError('No tokens received');
          setLoading(false);
        }
      } else {
        const errorData: ApiError = await response.json();
        if (errorData.error && errorData.error.includes('not registered')) {
          // Redirect to Django register page
          window.location.href = DJANGO_BASE_URL;
        } else {
          setError(errorData.error || 'Login failed');
          setLoading(false);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">
            ¿No tienes cuenta?{' '}
            <a
              href={DJANGO_BASE_URL}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Regístrate desde la página principal
            </a>
          </p>
          <a
            href={DJANGO_BASE_URL}
            className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
          >
            ← Volver a la página principal
          </a>
        </div>
      </div>
    </div>
  );
}
