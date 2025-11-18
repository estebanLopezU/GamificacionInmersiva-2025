"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from '../Home.module.css';

export default function Games() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('welcome'); // welcome, language, level, game
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const levels = [
    { id: 1, name: "Fundamentos de Programación", description: "Variables, tipos de datos, estructuras de control" },
    { id: 2, name: "Programación Orientada a Objetos", description: "Clases, herencia, polimorfismo, encapsulación" },
    { id: 3, name: "Estructuras de Datos", description: "Arrays, listas, árboles, grafos, algoritmos" }
  ];

  const languages = [
    { id: 'python', name: 'Python', color: '#3776ab' },
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' }
  ];

  const startExperience = () => {
    setCurrentView('language');
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setCurrentView('level');
  };

  const selectLevel = (level) => {
    setSelectedLevel(level);
    setCurrentView('game');
  };

  const backToMenu = () => {
    setCurrentView('welcome');
    setSelectedLanguage('');
    setSelectedLevel(0);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* El video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`${styles.backgroundVideo} ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay oscuro para mejorar la legibilidad del contenido */}
      <div className={`fixed inset-0 bg-black/50 z-0 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>

      {/* Elementos decorativos animados */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: "1s"}}></div>
      <div className="fixed top-1/2 left-1/3 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: "2s"}}></div>

      {/* El contenido de tu página */}
      <div className={`relative z-10 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transition-all duration-1000`}>
        {/* Encabezado */}
        <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="/UNAL.webp" alt="Logo UNAL" width={40} height={40} className="hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Minijuego VR/AR — Aprende a Programar
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Inicio
              </a>
              <a href="/games" className="text-blue-600 font-medium">
                Juegos
              </a>
            </nav>
          </div>
        </header>

        {/* Contenido Principal */}
        <div className="max-w-7xl mx-auto pt-24 px-6 pb-12">
          {/* Vista de Bienvenida */}
          {currentView === 'welcome' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-10 max-w-2xl animate-fadeIn">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Aprende a Programar en VR/AR</h2>
                <p className="text-xl text-gray-700 mb-8">Explora un mundo inmersivo mientras dominas el código.</p>
                <button 
                  onClick={startExperience}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Comenzar Aventura
                </button>
              </div>
            </div>
          )}

          {/* Vista de Selección de Lenguaje */}
          {currentView === 'language' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-10 max-w-2xl animate-fadeIn">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Elige tu Lenguaje</h2>
                <p className="text-xl text-gray-700 mb-8">Selecciona la tecnología que quieres dominar.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => selectLanguage(language.id)}
                      className="p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
                      style={{ backgroundColor: language.color + '20' }}
                    >
                      <div className="text-2xl font-bold mb-2" style={{ color: language.color }}>
                        {language.name}
                      </div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={backToMenu}
                  className="mt-8 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Volver
                </button>
              </div>
            </div>
          )}

          {/* Vista de Selección de Nivel */}
          {currentView === 'level' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-10 max-w-2xl animate-fadeIn">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {languages.find(l => l.id === selectedLanguage)?.name} - Niveles
                </h2>
                <p className="text-xl text-gray-700 mb-8">Selecciona el nivel de dificultad:</p>
                <div className="space-y-4 w-full">
                  {levels.map((level, index) => (
                    <button
                      key={level.id}
                      onClick={() => selectLevel(index)}
                      className="w-full p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 text-left"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                          {level.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{level.name}</h3>
                          <p className="text-gray-600">{level.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8 w-full">
                  <button 
                    onClick={backToMenu}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← Volver
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vista del Juego */}
          {currentView === 'game' && (
            <div className="min-h-[80vh] animate-fadeIn">
              <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {languages.find(l => l.id === selectedLanguage)?.name} - {levels[selectedLevel]?.name}
                  </h2>
                  <button 
                    onClick={backToMenu}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← Volver al Menú
                  </button>
                </div>
              </div>
              
              {/* Contenedor de A-Frame para la experiencia VR/AR */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ height: '70vh' }}>
                <iframe 
                  src="/vr-experience.html" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  allow="vr; xr; accelerometer; magnetometer; gyroscope;"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}