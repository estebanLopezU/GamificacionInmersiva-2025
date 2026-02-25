import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/gameData';

interface QuestionViewProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  showFeedback,
  isCorrect
}) => {
  const parts = question.codeSnippet.split('___');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Misión en Curso</span>
          <h2 className="text-4xl font-bold text-white mt-2">Desafío {currentQuestionIndex + 1}</h2>
        </div>
        <div className="text-right">
          <span className="text-white/40 text-sm font-mono">{currentQuestionIndex + 1} / {totalQuestions}</span>
          <div className="w-48 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <p className="text-2xl text-white mb-10 leading-relaxed font-medium">
          {question.question}
        </p>

        <div className="bg-black/40 rounded-2xl p-8 font-mono text-xl border border-white/10 shadow-inner mb-10">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
            <span className="text-blue-300">{parts[0]}</span>
            <div className="relative inline-block min-w-[120px]">
              <input
                type="text"
                value={selectedAnswer || ''}
                onChange={(e) => onAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="..."
                className={`w-full bg-white/5 border-2 rounded-lg px-4 py-2 text-center transition-all duration-300 focus:outline-none focus:ring-4 ${
                  showFeedback 
                    ? (isCorrect ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-red-500 text-red-400 bg-red-500/10')
                    : 'border-white/20 text-cyan-300 focus:border-cyan-400 focus:ring-cyan-400/20'
                }`}
                autoFocus
              />
              {showFeedback && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 -right-4"
                >
                  {isCorrect ? (
                    <div className="bg-green-500 rounded-full p-1 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="bg-red-500 rounded-full p-1 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            <span className="text-blue-300">{parts[1]}</span>
          </div>
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border-l-8 ${
                isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
              }`}
            >
              <h4 className={`text-lg font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '¡Excelente!' : 'Casi lo tienes'}
              </h4>
              <p className="text-white/80 leading-relaxed">
                {question.explanation}
              </p>
              {!isCorrect && (
                <p className="mt-4 text-white/60 text-sm">
                  La respuesta correcta era: <code className="bg-white/10 px-2 py-1 rounded text-green-400">{question.correctCompletion}</code>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionView;
