"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VRBackground from '@/components/game/VRBackground';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* VR Background */}
      <VRBackground style="full" />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              textShadow: [
                '0 0 20px rgba(0, 255, 255, 0.5)',
                '0 0 40px rgba(255, 0, 255, 0.5)',
                '0 0 20px rgba(0, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              GAMIFICACIÓN VR
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl text-white/60 mt-2 font-mono tracking-wider">
            Plataforma inmersiva de aprendizaje con Realidad Virtual
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mb-12 max-w-4xl"
        >
          {[
            { icon: '🎮', title: 'Gamificación', desc: 'Aprende jugando con desafíos interactivos' },
            { icon: '🥽', title: 'VR Inmersivo', desc: 'Experiencia de aprendizaje en realidad virtual' },
            { icon: '🏆', title: 'Logros', desc: 'Desbloquea niveles y gana recompensas' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Librerías VR utilizadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 w-full max-w-5xl"
        >
          <h3 className="text-center text-xl font-bold text-white/80 mb-6">
            🛠️ Tecnologías y Librerías Utilizadas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Three.js', desc: 'Gráficos 3D', icon: '🎨', color: 'from-green-400 to-emerald-600' },
              { name: 'React Three Fiber', desc: 'React + Three.js', icon: '⚛️', color: 'from-blue-400 to-indigo-600' },
              { name: 'React Three Drei', desc: 'Helpers 3D', icon: '🎯', color: 'from-purple-400 to-violet-600' },
              { name: 'Framer Motion', desc: 'Animaciones', icon: '✨', color: 'from-pink-400 to-rose-600' },
              { name: 'Next.js 16', desc: 'Framework React', icon: '🚀', color: 'from-gray-400 to-slate-600' },
              { name: 'Tailwind CSS', desc: 'Estilos', icon: '💨', color: 'from-cyan-400 to-teal-600' },
              { name: 'Zustand', desc: 'Estado Global', icon: '🐻', color: 'from-amber-400 to-orange-600' },
              { name: 'Django REST', desc: 'Backend API', icon: '🐍', color: 'from-lime-400 to-green-600' }
            ].map((lib, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-black/50 backdrop-blur-md rounded-lg p-4 border border-white/10 text-center"
              >
                <div className="text-2xl mb-2">{lib.icon}</div>
                <div className={`text-sm font-bold bg-gradient-to-r ${lib.color} bg-clip-text text-transparent`}>
                  {lib.name}
                </div>
                <div className="text-xs text-white/50 mt-1">{lib.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
      
      {/* Version badge */}
      <div className="absolute bottom-4 right-4 z-20 text-xs font-mono text-white/30">
        v2.0.0 | Powered by Three.js
      </div>
    </div>
  );
}