import React from 'react';
import { motion } from 'framer-motion';
import { Level } from '@/lib/gameData';

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  onSelect: (levelId: number) => void;
  index: number;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, isUnlocked, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={isUnlocked ? { scale: 1.05, rotateY: 5 } : {}}
      className={`relative group rounded-3xl p-8 transition-all duration-500 overflow-hidden border ${
        isUnlocked 
          ? 'bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl cursor-pointer' 
          : 'bg-black/40 border-white/5 cursor-not-allowed grayscale'
      }`}
      onClick={() => isUnlocked && onSelect(level.id - 1)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${
        level.id === 1 ? 'from-blue-400 to-cyan-400' : 
        level.id === 2 ? 'from-purple-400 to-pink-400' : 
        'from-amber-400 to-orange-400'
      }`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl ${
            isUnlocked ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30'
          }`}>
            <span className="text-sm font-bold tracking-widest uppercase">Nivel {level.id}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-6 h-6 ${i < level.stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
        </div>

        <h3 className={`text-3xl font-bold mb-3 ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
          {level.name}
        </h3>
        <p className={`mb-6 line-clamp-2 ${isUnlocked ? 'text-white/70' : 'text-white/20'}`}>
          {level.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-cyan-400 animate-pulse' : 'bg-white/10'}`}></div>
            <span className={`text-sm ${isUnlocked ? 'text-white/60' : 'text-white/10'}`}>
              {level.requirements}
            </span>
          </div>
        </div>

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-3xl">
            <div className="bg-white/10 p-4 rounded-full border border-white/20">
              <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LevelCard;
