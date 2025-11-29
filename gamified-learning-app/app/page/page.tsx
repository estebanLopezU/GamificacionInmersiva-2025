"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';

export default function UserPage() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in URL params (from Django login)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('access_token', tokenFromUrl);
      // Remove token from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url);
    }

    // Check if user is authenticated
    const checkAuth = async () => {
      console.log('Page: Checking authentication...');
      try {
        const token = localStorage.getItem('access_token');
        console.log('Page: Token found:', !!token);

        if (!token) {
          console.log('Page: No token found, redirecting to login');
          router.push('/login');
          return;
        }

        console.log('Page: Making auth request with token');
        console.log('Page: Authorization header:', `Bearer ${token.substring(0, 20)}...`);

        const response = await api.getUser(token);

        console.log('Page: Auth response status:', response.status);

        if (response.ok) {
          const userData = await response.json();
          console.log('Page: Auth successful, user data:', userData);
          setUser(userData);
        } else {
          console.log('Page: Auth failed, clearing tokens and redirecting');
          // Token might be expired, try to refresh or redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push('/login');
        }
      } catch (error) {
        console.error('Page: Auth check failed:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gamification Info Cards */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h3 className="text-xl font-bold mb-4 text-blue-400 animate-pulse">¿Qué es la Gamificación?</h3>
            <p className="text-gray-300 mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              La gamificación es la aplicación de elementos de diseño de juegos en contextos no lúdicos
              para hacerlos más atractivos y motivadores.
            </p>
            <div className="bg-blue-600 text-white p-3 rounded animate-bounce" style={{animationDelay: '0.3s'}}>
              <strong>Beneficios:</strong> Aumenta la participación, mejora el aprendizaje y fomenta el engagement.
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold mb-4 text-green-400 animate-pulse">Elementos Clave</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>• Puntos y sistemas de puntuación</li>
              <li className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>• Insignias y logros</li>
              <li className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>• Tablas de clasificación</li>
              <li className="animate-slide-in-left" style={{animationDelay: '0.4s'}}>• Niveles de progreso</li>
              <li className="animate-slide-in-left" style={{animationDelay: '0.5s'}}>• Recompensas virtuales</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-xl font-bold mb-4 text-purple-400 animate-pulse">Aplicaciones</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="animate-slide-in-right" style={{animationDelay: '0.1s'}}>• Educación y e-learning</li>
              <li className="animate-slide-in-right" style={{animationDelay: '0.2s'}}>• Salud y bienestar</li>
              <li className="animate-slide-in-right" style={{animationDelay: '0.3s'}}>• Marketing y ventas</li>
              <li className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>• Gestión de empleados</li>
              <li className="animate-slide-in-right" style={{animationDelay: '0.5s'}}>• Cambio de comportamientos</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-bold mb-4 text-yellow-400 animate-pulse">Mejores Prácticas</h3>
            <p className="text-gray-300 mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Para implementar gamificación efectiva:
            </p>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li className="animate-fade-in" style={{animationDelay: '0.2s'}}>• Define objetivos claros</li>
              <li className="animate-fade-in" style={{animationDelay: '0.3s'}}>• Conoce a tu audiencia</li>
              <li className="animate-fade-in" style={{animationDelay: '0.4s'}}>• Diseña experiencias significativas</li>
              <li className="animate-fade-in" style={{animationDelay: '0.5s'}}>• Prueba e itera constantemente</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h3 className="text-xl font-bold mb-4 text-red-400 animate-pulse">Casos de Éxito</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors animate-fade-in" style={{animationDelay: '0.1s'}}>
                <strong className="text-white">Duolingo</strong>
                <p className="text-gray-300 text-sm">Aprendizaje de idiomas con puntos y rachas</p>
              </div>
              <div className="bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors animate-fade-in" style={{animationDelay: '0.2s'}}>
                <strong className="text-white">Fitbit</strong>
                <p className="text-gray-300 text-sm">Seguimiento de actividad física con logros</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h3 className="text-xl font-bold mb-4 text-indigo-400 animate-pulse">Recursos Adicionales</h3>
            <div className="space-y-2">
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
                📚 Guía Completa de Gamificación
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
                🎯 Herramientas de Gamificación
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.3s'}}>
                📊 Estudios de Caso
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.4s'}}>
                👥 Comunidad de Gamificación
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-pulse">
            <h2 className="text-3xl font-bold mb-4 animate-bounce">¡Comienza tu Viaje en Gamificación!</h2>
            <p className="text-xl mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Explora nuestros juegos interactivos y descubre cómo la gamificación puede transformar tu experiencia de aprendizaje.
            </p>
            <button
              onClick={() => router.push('/games')}
              className="bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-pulse"
            >
              Explorar Juegos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
