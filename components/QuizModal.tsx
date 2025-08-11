import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, Star, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizModalProps {
  quiz: {
    question: string;
    options: string[];
    correct: number;
    points: number;
  };
  onClose: () => void;
  onComplete: (points: number) => void;
}

export function QuizModal({ quiz, onClose, onComplete }: QuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === quiz.correct;
    setIsCorrect(correct);
    setShowResult(true);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(correct ? [100, 50, 100] : [200]);
    }

    // Auto close after showing result
    setTimeout(() => {
      onComplete(correct ? quiz.points : 10);
    }, 2500);
  };

  const getAnswerStyle = (index: number) => {
    if (!showResult) {
      return "border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300";
    }
    
    if (index === quiz.correct) {
      return "border-2 border-green-400 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
    }
    
    if (index === selectedAnswer && index !== quiz.correct) {
      return "border-2 border-red-400 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
    }
    
    return "border border-border/30 opacity-50";
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="relative w-full max-w-sm bg-card/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                    Quiz Time! 
                    <span className="text-2xl">🎯</span>
                  </CardTitle>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-0">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-foreground mb-6 text-center leading-relaxed">
                    {quiz.question}
                  </h3>

                  <div className="space-y-3">
                    {quiz.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left justify-start rounded-2xl transition-all duration-300 ${getAnswerStyle(index)}`}
                        >
                          <span className="text-base">{option}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200/50 dark:border-amber-700/50">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Answer to earn +{quiz.points} points!
                    </Badge>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.div 
                    className="mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-3" />
                    ) : (
                      <XCircle className="w-20 h-20 text-red-500 mx-auto mb-3" />
                    )}
                  </motion.div>

                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isCorrect ? "Awesome! 🎉" : "Good try! 👍"}
                  </motion.h3>

                  <motion.p 
                    className="text-muted-foreground mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isCorrect 
                      ? "You got it right!" 
                      : `The correct answer was: ${quiz.options[quiz.correct]}`
                    }
                  </motion.p>

                  <motion.div 
                    className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 p-6 rounded-3xl border border-amber-200/50 dark:border-amber-700/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-2"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0] 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <Star className="w-8 h-8 text-amber-500" fill="currentColor" />
                      <span className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                        +{isCorrect ? quiz.points : 10} Points!
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}