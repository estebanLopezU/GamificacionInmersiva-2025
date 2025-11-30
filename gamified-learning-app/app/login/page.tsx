"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DJANGO_BASE_URL } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, loading: authLoading } = useAuth(); // Use useAuth hook
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Local loading state for form submission

  useEffect(() => {
    // Clear any existing tokens to ensure a clean login state
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  useEffect(() => {
    // If user is already logged in, redirect them to the appropriate page
    if (!authLoading && user) {
      router.push(user.role === 'admin' ? '/admin' : '/page');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password); // Call login from useAuth
      // Redirection is handled within useAuth.login()
    } catch (err) {
      setError((err as Error).message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Correo UNAL
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Regístrate aquí
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
