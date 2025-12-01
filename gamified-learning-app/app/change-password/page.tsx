"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

export default function ChangePasswordPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[a-z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 15;
      if (/[^A-Za-z0-9]/.test(password)) strength += 10;
      return Math.min(strength, 100);
    };

    setPasswordStrength(calculateStrength(passwords.newPassword));
  }, [passwords.newPassword]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Current password validation
    if (!passwords.currentPassword.trim()) {
      errors.currentPassword = 'La contraseña actual es requerida';
    }

    // New password validation
    if (!passwords.newPassword.trim()) {
      errors.newPassword = 'La nueva contraseña es requerida';
    } else if (passwords.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwords.newPassword)) {
      errors.newPassword = 'La contraseña debe contener mayúsculas, minúsculas y números';
    } else if (passwords.currentPassword === passwords.newPassword) {
      errors.newPassword = 'La nueva contraseña debe ser diferente a la actual';
    }

    // Confirm password validation
    if (!passwords.confirmPassword.trim()) {
      errors.confirmPassword = 'La confirmación de contraseña es requerida';
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));

    // Clear validation errors as user types
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setMessage('');
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would call the actual API
      console.log('Changing password with:', passwords);
      setMessage('✅ Contraseña actualizada correctamente');

      // Reset form
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);

    } catch (error) {
      setValidationErrors({ general: 'Error al cambiar la contraseña. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Muy débil';
    if (passwordStrength < 50) return 'Débil';
    if (passwordStrength < 75) return 'Buena';
    return 'Excelente';
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* 4D Animated Background with Playful Toys */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-400/20 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-purple-400/20 rotate-12 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float"></div>

        {/* Floating Particles */}
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 animate-pulse"></div>
        <div className="particle absolute top-3/4 right-1/4 w-3 h-3 animate-pulse animation-delay-1000"></div>
        <div className="particle absolute top-1/2 left-3/4 w-1.5 h-1.5 animate-pulse animation-delay-500"></div>

        {/* Animated Toys and Playful Elements */}
        {/* Rocket/Space Ship */}
        <div className="absolute top-16 right-12 animate-float-toy">
          <svg width="60" height="80" viewBox="0 0 60 80" className="text-blue-400/40">
            <path d="M30 5 L50 25 L45 35 L30 30 L15 35 L10 25 Z" fill="currentColor"/>
            <rect x="25" y="30" width="10" height="30" fill="currentColor"/>
            <rect x="20" y="60" width="20" height="8" fill="currentColor"/>
            <circle cx="35" cy="15" r="3" fill="orange" className="animate-pulse"/>
            <circle cx="25" cy="15" r="3" fill="orange" className="animate-pulse animation-delay-500"/>
            <path d="M15 70 L10 75 L20 75 Z" fill="currentColor"/>
            <path d="M45 70 L50 75 L40 75 Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Floating Balloon */}
        <div className="absolute top-1/3 left-8 animate-balloon-float">
          <svg width="50" height="70" viewBox="0 0 50 70" className="text-pink-400/40">
            <ellipse cx="25" cy="25" rx="20" ry="25" fill="currentColor"/>
            <path d="M5 25 Q25 45 45 25" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="22" y="45" width="6" height="20" fill="currentColor"/>
            <circle cx="25" cy="50" r="2" fill="currentColor"/>
          </svg>
        </div>

        {/* Toy Car */}
        <div className="absolute bottom-32 right-16 animate-car-drive">
          <svg width="80" height="40" viewBox="0 0 80 40" className="text-green-400/40">
            <rect x="10" y="15" width="50" height="20" rx="5" fill="currentColor"/>
            <circle cx="20" cy="35" r="8" fill="currentColor"/>
            <circle cx="60" cy="35" r="8" fill="currentColor"/>
            <circle cx="20" cy="35" r="4" fill="gray"/>
            <circle cx="60" cy="35" r="4" fill="gray"/>
            <rect x="15" y="10" width="15" height="8" rx="2" fill="currentColor"/>
            <rect x="35" y="10" width="15" height="8" rx="2" fill="currentColor"/>
            <circle cx="45" cy="20" r="2" fill="yellow" className="animate-pulse"/>
          </svg>
        </div>

        {/* Stars/Constellations */}
        <div className="absolute top-24 left-1/4 animate-twinkle">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-yellow-400/50">
            <polygon points="20,5 22,15 32,15 24,21 26,31 20,25 14,31 16,21 8,15 18,15" fill="currentColor"/>
          </svg>
        </div>

        <div className="absolute top-1/2 right-8 animate-twinkle animation-delay-1000">
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-purple-400/50">
            <polygon points="15,3 16,11 24,11 18,15 19,23 15,19 11,23 12,15 6,11 14,11" fill="currentColor"/>
          </svg>
        </div>

        <div className="absolute bottom-24 left-16 animate-twinkle animation-delay-500">
          <svg width="25" height="25" viewBox="0 0 25 25" className="text-cyan-400/50">
            <polygon points="12.5,2.5 13.5,8.5 19.5,8.5 14.5,12.5 15.5,18.5 12.5,15.5 9.5,18.5 10.5,12.5 5.5,8.5 11.5,8.5" fill="currentColor"/>
          </svg>
        </div>

        {/* Floating Teddy Bear */}
        <div className="absolute bottom-1/4 right-1/3 animate-teddy-float">
          <svg width="45" height="50" viewBox="0 0 45 50" className="text-orange-400/40">
            <ellipse cx="22.5" cy="20" rx="15" ry="18" fill="currentColor"/>
            <ellipse cx="18" cy="15" r="3" fill="black"/>
            <ellipse cx="27" cy="15" r="3" fill="black"/>
            <ellipse cx="22.5" cy="22" rx="2" ry="3" fill="pink"/>
            <ellipse cx="15" cy="35" rx="8" ry="6" fill="currentColor"/>
            <ellipse cx="30" cy="35" rx="8" ry="6" fill="currentColor"/>
            <ellipse cx="22.5" cy="40" rx="3" ry="4" fill="currentColor"/>
            <ellipse cx="18" cy="17" r="1" fill="white"/>
            <ellipse cx="27" cy="17" r="1" fill="white"/>
          </svg>
        </div>

        {/* Butterfly */}
        <div className="absolute top-2/3 left-12 animate-butterfly-fly">
          <svg width="40" height="35" viewBox="0 0 40 35" className="text-purple-400/40">
            <ellipse cx="15" cy="15" rx="8" ry="12" fill="currentColor"/>
            <ellipse cx="25" cy="15" rx="8" ry="12" fill="currentColor"/>
            <ellipse cx="20" cy="22" rx="3" ry="8" fill="currentColor"/>
            <circle cx="20" cy="8" r="2" fill="black"/>
            <ellipse cx="15" cy="10" rx="1" ry="2" fill="black"/>
            <ellipse cx="25" cy="10" rx="1" ry="2" fill="black"/>
          </svg>
        </div>

        {/* Rocket Trail Effect */}
        <div className="absolute top-16 right-12 w-20 h-2 bg-gradient-to-l from-orange-400/30 to-transparent animate-rocket-trail"></div>

        {/* Balloon String Animation */}
        <div className="absolute top-1/3 left-8 w-0.5 h-16 bg-gray-400/30 animate-string-sway"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg w-full mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Cambiar Contraseña
            </h1>
            <p className="text-gray-300 text-sm animate-fade-in-up animation-delay-300">
              Actualiza tu contraseña de forma segura
            </p>
          </div>

          {/* General Error Message */}
          {validationErrors.general && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl animate-shake">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-300 text-sm font-medium">{validationErrors.general}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl animate-fade-in-up">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-300 text-sm font-medium">{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="group animate-fade-in-up animation-delay-100">
              <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-200 mb-2 group-focus-within:text-blue-400 transition-colors">
                🔐 Contraseña Actual
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  className={`w-full bg-gray-800/50 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    validationErrors.currentPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-600 focus:border-blue-500'
                  }`}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPasswords.current ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.currentPassword && (
                <p className="mt-2 text-sm text-red-400 animate-shake">{validationErrors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div className="group animate-fade-in-up animation-delay-200">
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-200 mb-2 group-focus-within:text-purple-400 transition-colors">
                ✨ Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className={`w-full bg-gray-800/50 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    validationErrors.newPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-600 focus:border-purple-500'
                  }`}
                  placeholder="Ingresa tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPasswords.new ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwords.newPassword && (
                <div className="mt-3 animate-fade-in-up">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Seguridad de la contraseña</span>
                    <span className={`text-xs font-medium ${passwordStrength >= 75 ? 'text-green-400' : passwordStrength >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {validationErrors.newPassword && (
                <p className="mt-2 text-sm text-red-400 animate-shake">{validationErrors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="group animate-fade-in-up animation-delay-300">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200 mb-2 group-focus-within:text-green-400 transition-colors">
                🔒 Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-gray-800/50 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                    validationErrors.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-600 focus:border-green-500'
                  }`}
                  placeholder="Confirma tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPasswords.confirm ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 animate-shake">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 animate-fade-in-up animation-delay-400">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:opacity-50 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Cambiando Contraseña...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Actualizar Contraseña</span>
                    </>
                  )}
                </div>
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                )}
              </button>
            </div>
          </form>

          {/* Password Requirements */}
          <div className="mt-8 p-4 bg-gray-800/30 rounded-xl animate-fade-in-up animation-delay-500">
            <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Requisitos de la contraseña
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${passwords.newPassword.length >= 8 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                Al menos 8 caracteres
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(passwords.newPassword) ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                Una letra mayúscula
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(passwords.newPassword) ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                Una letra minúscula
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${/\d/.test(passwords.newPassword) ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                Un número
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-10px) rotate(120deg) scale(1.05);
          }
          66% {
            transform: translateY(5px) rotate(240deg) scale(0.95);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        /* Toy Animations */
        .animate-float-toy {
          animation: float-toy 6s ease-in-out infinite;
        }

        @keyframes float-toy {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(5px) rotate(2deg);
          }
          50% {
            transform: translateY(-8px) translateX(-3px) rotate(-1deg);
          }
          75% {
            transform: translateY(-20px) translateX(2px) rotate(1deg);
          }
        }

        .animate-balloon-float {
          animation: balloon-float 7s ease-in-out infinite;
        }

        @keyframes balloon-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-12px) translateX(8px) scale(1.02);
          }
          66% {
            transform: translateY(-6px) translateX(-4px) scale(0.98);
          }
        }

        .animate-car-drive {
          animation: car-drive 8s linear infinite;
        }

        @keyframes car-drive {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(10px) rotate(1deg);
          }
          50% {
            transform: translateX(-5px) rotate(-0.5deg);
          }
          75% {
            transform: translateX(15px) rotate(0.5deg);
          }
        }

        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-teddy-float {
          animation: teddy-float 5s ease-in-out infinite;
        }

        @keyframes teddy-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-8px) rotate(5deg) scale(1.03);
          }
        }

        .animate-butterfly-fly {
          animation: butterfly-fly 3s ease-in-out infinite;
        }

        @keyframes butterfly-fly {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) translateX(5px) rotate(10deg);
          }
          50% {
            transform: translateY(-5px) translateX(-3px) rotate(-5deg);
          }
          75% {
            transform: translateY(-12px) translateX(8px) rotate(8deg);
          }
        }

        .animate-rocket-trail {
          animation: rocket-trail 2s ease-in-out infinite;
        }

        @keyframes rocket-trail {
          0%, 100% {
            opacity: 0;
            transform: scaleX(0.5);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1);
          }
        }

        .animate-string-sway {
          animation: string-sway 4s ease-in-out infinite;
        }

        @keyframes string-sway {
          0%, 100% {
            transform: rotate(0deg) scaleY(1);
          }
          25% {
            transform: rotate(2deg) scaleY(1.05);
          }
          50% {
            transform: rotate(-1deg) scaleY(0.95);
          }
          75% {
            transform: rotate(1deg) scaleY(1.02);
          }
        }
      `}</style>
    </div>
  );
}
