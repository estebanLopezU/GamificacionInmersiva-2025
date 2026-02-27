"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { 
  levels, 
  languages, 
  fundamentalsContentByLanguage, 
  questionsByLanguage,
  Level,
  Question
} from '@/lib/gameData';

// Reusable Components
import LevelCard from '@/components/game/LevelCard';
import QuestionView from '@/components/game/QuestionView';

export default function Games() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  // State Management
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [gamePhase, setGamePhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});

  // Auth & Persistence
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    setMounted(true);
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUnlockedLevels(progress.unlockedLevels || [0]);
      setLevelScores(progress.levelScores || {});
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gameProgress', JSON.stringify({
        unlockedLevels,
        levelScores
      }));
    }
  }, [unlockedLevels, levelScores, mounted]);

  if (authLoading || !user || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl font-mono tracking-widest text-cyan-400"
        >
          INICIALIZANDO SISTEMA...
        </motion.div>
      </div>
    );
  }

  // Derived Data
  const questions = (selectedLanguage && questionsByLanguage[selectedLanguage]) 
    ? questionsByLanguage[selectedLanguage][selectedLevel] || [] 
    : [];

  const fundamentals = (selectedLanguage && fundamentalsContentByLanguage[selectedLanguage])
    ? fundamentalsContentByLanguage[selectedLanguage][selectedLevel] || {}
    : {};

  // Handlers
  const selectLanguage = (langId: string) => {
    setSelectedLanguage(langId);
    setCurrentView('levels');
  };

  const selectLevel = (levelIndex: number) => {
    setSelectedLevel(levelIndex);
    setCurrentView('game');
    setGamePhase('intro');
    setScore(0);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const startGame = () => setGamePhase('play');

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer.trim().toLowerCase() === questions[currentQuestion].correctCompletion.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, selectedAnswer]);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setGamePhase('results');
      if (score + (isCorrect ? 1 : 0) >= questions.length * 0.7) {
        if (!unlockedLevels.includes(selectedLevel + 1)) {
          setUnlockedLevels(prev => [...prev, selectedLevel + 1]);
        }
      }
      const levelKey = `${selectedLanguage}_${selectedLevel}`;
      setLevelScores(prev => ({
        ...prev,
        [levelKey]: Math.max(prev[levelKey] || 0, score + (isCorrect ? 1 : 0))
      }));
    }
  };

  const backToMenu = () => {
    setCurrentView('welcome');
    setGamePhase('intro');
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setGamePhase('intro');
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="text-white selection:bg-cyan-500/30 w-full">
      <main className="w-full max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          
          {/* Welcome / Language Selection */}
          {currentView === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-6xl mx-auto text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-16"
              >
                <h2 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tighter">
                  ELIGE TU <br/> <span className="text-cyan-400">LENGUAJE</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Selecciona la interfaz de programación para iniciar la sincronización neuronal y dominar los fundamentos.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.id}
                    whileHover={{ scale: 1.05, translateY: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectLanguage(lang.id)}
                    className="relative group h-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10"></div>
                    <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[${lang.color}]`}></div>
                    <div className="relative z-20 h-full flex flex-col items-center justify-center p-8">
                      <div className="w-20 h-20 mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                        {lang.id === 'python' ? (
                          <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.97 0C9.01 0 7.15.54 5.92 1.48c-1.32 1-1.89 2.5-1.89 4.31v1.16h4.08V5.79c0-1.12.31-2.02 1.14-2.5.94-.55 2.1-.55 3.01 0 .84.48 1.14 1.38 1.14 2.5v2.85h-4.08c-2.85 0-5.38.48-6.66 1.48-1.42 1.1-2.05 2.76-2.05 4.88 0 2.13.63 3.79 2.05 4.89 1.28 1 3.81 1.48 6.66 1.48h1.16v-4.08H8.85c-1.12 0-2.02-.31-2.5-1.14-.55-.94-.55-2.1 0-3.01.48-.84 1.38-1.14 2.5-1.14h4.08v4.08c0 2.96-.54 4.82-1.48 6.05-.94 1.23-2.44 1.8-4.25 1.8-1.81 0-3.31-.57-4.25-1.8-.94-1.23-1.48-3.09-1.48-6.05v-1.16H0v1.16c0 4.08 1.05 7.15 3.03 9.13 1.98 1.98 5.05 3.03 9.13 3.03s7.15-1.05 9.13-3.03c1.98-1.98 3.03-5.05 3.03-9.13v-1.16h-4.08v1.16c0 1.12-.31 2.02-1.14 2.5-.94.55-2.1.55-3.01 0-.84-.48-1.14-1.38-1.14-2.5V8.85h4.08c2.85 0 5.38-.48 6.66-1.48 1.42-1.1 2.05-2.76 2.05-4.88 0-2.13-.63-3.79-2.05-4.89-1.28-1-3.81-1.48-6.66-1.48H11.97z"/>
                          </svg>
                        ) : (
                          <svg className="w-12 h-12 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.105-.78 0-.465.06-.75.39-.975.36-.24.945-.315 1.503-.315 1.59 0 2.19.765 2.265 2.025l1.935-.48c-.15-1.35-1.14-2.835-3.9-3.015-1.35-.09-2.52.375-3.21 1.065-.87.87-1.02 1.845-1.02 3.12 0 2.385 1.485 3.255 4.38 4.38 1.47.555 2.04 1.2 2.04 2.145 0 .825-.375 1.44-1.545 1.44-1.425 0-2.205-.51-2.31-2.34l-1.98.54c.165 2.595 1.755 3.51 4.29 3.51 2.82 0 4.155-1.41 4.155-3.3 0-1.89-1.035-2.88-2.79-3.645zM12.015 24h-1.935v-1.95h1.935V24zm-1.11-4.14c.03.315.03.45.165.6.15.15.345.18.525.18.39 0 .6-.21.6-.66V9h2.1v10.38c0 1.695-.975 2.625-2.7 2.625-1.395 0-2.22-.645-2.61-1.605l1.92-.93z"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-3xl font-black tracking-tighter uppercase">{lang.name}</span>
                      <span className="text-xs font-mono text-white/40 mt-2 uppercase tracking-widest">Protocolo v1.0.4</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Levels Selection */}
          {currentView === 'levels' && (
            <motion.div 
              key="levels"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => setCurrentView('welcome')}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-widest">Cambiar Lenguaje</span>
                </button>
                <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
                  <span className="text-xs font-mono text-white/40 uppercase">Sincronización:</span>
                  <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">{selectedLanguage}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {levels.map((level, idx) => (
                  <LevelCard 
                    key={level.id}
                    level={level}
                    index={idx}
                    isUnlocked={unlockedLevels.includes(idx)}
                    onSelect={selectLevel}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Game Implementation */}
          {currentView === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => setCurrentView('levels')}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-widest">Abandonar Misión</span>
                </button>
              </div>

              {gamePhase === 'intro' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 backdrop-blur-3xl rounded-3xl p-12 border border-white/20 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-6 text-white uppercase tracking-tighter">Preparación de Misión</h3>
                  <div className="space-y-6 text-left max-w-2xl mx-auto mb-12">
                    {Object.values(fundamentals).map((item: any, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <h4 className="text-cyan-400 font-bold mb-2 uppercase text-sm tracking-widest">{item.title}</h4>
                        <div className="text-white/70 leading-relaxed prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: item.content }} />
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={startGame}
                    className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-transform active:scale-95"
                  >
                    <span className="relative z-10">Iniciar Secuencia</span>
                    <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30 group-hover:opacity-60 transition-opacity rounded-full"></div>
                  </button>
                </motion.div>
              )}

              {gamePhase === 'play' && (
                <div className="space-y-8">
                  <QuestionView 
                    question={questions[currentQuestion]}
                    currentQuestionIndex={currentQuestion}
                    totalQuestions={questions.length}
                    selectedAnswer={selectedAnswer}
                    onAnswer={setSelectedAnswer}
                    showFeedback={showFeedback}
                    isCorrect={isCorrect}
                  />
                  
                  <div className="flex justify-end">
                    {!showFeedback ? (
                      <button 
                        onClick={checkAnswer}
                        disabled={!selectedAnswer}
                        className="px-12 py-4 rounded-xl bg-cyan-500 disabled:opacity-30 disabled:grayscale font-bold uppercase tracking-widest shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
                      >
                        Enviar Respuesta
                      </button>
                    ) : (
                      <button 
                        onClick={nextQuestion}
                        className="px-12 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                      >
                        {currentQuestion < questions.length - 1 ? 'Siguiente Desafío' : 'Analizar Resultados'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {gamePhase === 'results' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 backdrop-blur-3xl rounded-3xl p-12 border border-white/20 text-center"
                >
                  <h3 className="text-6xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MISIÓN COMPLETADA</h3>
                  
                  <div className="flex justify-center gap-12 mb-12">
                    <div className="text-center">
                      <span className="block text-5xl font-bold text-white mb-2">{score}</span>
                      <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Puntos</span>
                    </div>
                    <div className="w-px h-16 bg-white/10"></div>
                    <div className="text-center">
                      <span className="block text-5xl font-bold text-white mb-2">{((score / questions.length) * 100).toFixed(0)}%</span>
                      <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Precisión</span>
                    </div>
                  </div>

                  <p className="text-2xl text-white/80 mb-12 max-w-xl mx-auto leading-relaxed">
                    {score >= questions.length * 0.7 
                      ? 'Protocolo superado con éxito. Nuevo nivel de red neuronal desbloqueado.' 
                      : 'Nivel de sincronización insuficiente. Se recomienda reiniciar el protocolo.'}
                  </p>

                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button 
                      onClick={resetGame}
                      className="px-10 py-4 rounded-xl border-2 border-white/20 hover:bg-white/10 font-bold uppercase tracking-widest transition-all"
                    >
                      Reiniciar Misión
                    </button>
                    <button 
                      onClick={backToMenu}
                      className="px-10 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest transition-all hover:scale-105"
                    >
                      Volver a la Base
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
