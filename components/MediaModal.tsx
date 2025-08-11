import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Play, Maximize2, Minimize2, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    title: string;
    category: string;
    description: string;
    placeholder?: string;
  };
}

export function MediaModal({ isOpen, onClose, content }: MediaModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showPlaceholderInfo, setShowPlaceholderInfo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoading(true);
      setImageError(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFullscreen = () => {
    if (!isFullscreen && modalRef.current) {
      modalRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'History': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200';
      case 'Science': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'Arts': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200';
      case 'Space': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      case 'Animals': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200';
      case 'Environment': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all duration-200"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Content Container */}
        <motion.div
          className="relative max-w-4xl max-h-[90vh] w-full mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media Content */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
            <div className="relative bg-gray-800 flex items-center justify-center min-h-[400px]">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: imageLoading ? 0.9 : 1,
                  opacity: imageLoading ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {content.type === 'video' ? (
                  <video
                    controls
                    poster={content.poster}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onLoadedData={handleImageLoad}
                    onError={handleImageError}
                  >
                    <source src={content.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <ImageWithFallback
                    src={content.src}
                    alt={content.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )}
              </motion.div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`px-3 py-1.5 rounded-full border-0 ${getCategoryColor(content.category)}`}>
                {content.category}
              </Badge>
            </div>

            {/* Content Type Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1.5 rounded-full border-0">
                {content.type === 'video' ? '🎥 Story Video' : '📖 Story Image'}
              </Badge>
            </div>

            {/* Video Placeholder Info */}
            {content.placeholder && (
              <div className="absolute bottom-4 left-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowPlaceholderInfo(!showPlaceholderInfo)}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border-blue-400/30 rounded-full px-3 py-1.5 text-xs"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Video Coming Soon
                    <Info className="w-3 h-3 ml-1" />
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Fullscreen Button */}
            <div className="absolute bottom-4 right-4">
              <motion.button
                onClick={handleFullscreen}
                className="p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-white" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </div>

            {/* Placeholder Info Panel */}
            <AnimatePresence>
              {showPlaceholderInfo && content.placeholder && (
                <motion.div
                  className="absolute inset-x-4 bottom-16 bg-blue-900/90 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Play className="w-4 h-4 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-blue-200 font-medium text-sm mb-1">
                        Interactive Video Experience
                      </h4>
                      <p className="text-blue-300/80 text-xs leading-relaxed">
                        This story will soon feature an interactive video with quiz questions, 
                        fun animations, and kid-friendly narration. Stay tuned for an amazing learning adventure!
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-xs px-2 py-1">
                          Placeholder: {content.placeholder}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Info */}
          <motion.div
            className="mt-6 text-center px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
              {content.title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              {content.description}
            </p>
            
            {/* Interactive Elements Coming Soon */}
            {content.placeholder && (
              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-400/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2 text-blue-300 text-sm">
                  <Play className="w-4 h-4" />
                  <span>Enhanced video experience with quizzes and animations coming soon!</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}