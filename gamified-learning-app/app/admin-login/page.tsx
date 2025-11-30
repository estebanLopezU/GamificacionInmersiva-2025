"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // If user is already authenticated and is admin, redirect to admin page
    if (!authLoading && user && user.role === 'admin') {
      router.push('/admin');
    }
  }, [user, authLoading, router]);

  // Simple CAPTCHA simulation
  const generateCaptcha = () => {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let result: number;
    switch (operation) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      default: result = num1 + num2;
    }

    return { question: `${num1} ${operation} ${num2} = ?`, answer: result.toString() };
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  const handleCaptchaSubmit = () => {
    if (captchaInput === captcha.answer) {
      setCaptchaVerified(true);
      setCaptchaError('');
      setShowCaptcha(false);
    } else {
      setCaptchaError('Respuesta incorrecta. Intenta de nuevo.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Show CAPTCHA on first attempt
    if (!captchaVerified && !showCaptcha) {
      setShowCaptcha(true);
      return;
    }

    // Verify CAPTCHA before proceeding
    if (!captchaVerified) {
      setCaptchaError('Por favor, completa la verificación de seguridad.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/admin-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store tokens
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);

        // Redirect to admin page
        window.location.href = data.redirect_url;
      } else {
        setError(data.error || 'Error en el acceso administrativo');
        // Reset CAPTCHA on login failure
        setCaptchaVerified(false);
        setShowCaptcha(false);
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, intenta de nuevo.');
      // Reset CAPTCHA on network error
      setCaptchaVerified(false);
      setShowCaptcha(false);
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-400/30 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-purple-400/30 rotate-12 animate-bounce-slow"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 border-2 border-yellow-400/30 rounded-lg animate-spin-reverse-slow"></div>
        <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-5"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-red-500/30 rounded-2xl animate-ping opacity-75"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Acceso Administrador
          </h1>
          <p className="text-slate-400 text-sm">
            Centro de Información VR/AR - UNAL
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="admin@unal.edu.co"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            {/* CAPTCHA Modal */}
            {showCaptcha && (
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-600 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Verificación de Seguridad</h3>
                    <p className="text-slate-400 text-sm">Confirma que no eres un robot</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-400 mb-2 font-mono">
                      {captcha.question}
                    </div>
                    <p className="text-slate-400 text-sm">Resuelve la operación matemática</p>
                  </div>
                </div>

                {captchaError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm mb-4">
                    {captchaError}
                  </div>
                )}

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                    placeholder="Tu respuesta"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCaptchaSubmit}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Verificar
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCaptcha(false)}
                  className="w-full mt-3 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Iniciando Sesión...
                </div>
              ) : showCaptcha ? (
                'Completar Verificación'
              ) : (
                'Acceder como Administrador'
              )}
              {!loading && !showCaptcha && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>
          </form>

          {/* Navigation Links */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex flex-col space-y-3 text-center">
              <Link
                href="/login"
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              >
                ← Acceso Usuario Regular
              </Link>
              <Link
                href="/register"
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              >
                ¿No tienes cuenta? Regístrate
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-yellow-400 font-medium text-sm">Acceso Restringido</span>
            </div>
            <p className="text-yellow-300/80 text-xs">
              Esta página es exclusivamente para administradores del sistema.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .grid-overlay {
          background-image:
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
