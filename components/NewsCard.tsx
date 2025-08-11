import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, HelpCircle, Bookmark, Eye, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';

interface NewsCardProps {
  news: {
    id: number;
    headline: string;
    summary: string;
    videoThumbnail: string;
    videoPlaceholder?: string; // Placeholder for future video functionality
    category: string;
    quiz: any;
  };
  onQuizStart: (quiz: any) => void;
  onMediaOpen: (media: any) => void;
}

export function NewsCard({ news, onQuizStart, onMediaOpen }: NewsCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'History': return 'from-amber-500 to-orange-500';
      case 'Science': return 'from-green-500 to-emerald-500';
      case 'Arts': return 'from-purple-500 to-pink-500';
      case 'Space': return 'from-blue-500 to-indigo-500';
      case 'Animals': return 'from-orange-500 to-red-500';
      case 'Environment': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'History': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200/50 dark:border-amber-700/50';
      case 'Science': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200/50 dark:border-green-700/50';
      case 'Arts': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200/50 dark:border-purple-700/50';
      case 'Space': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200/50 dark:border-blue-700/50';
      case 'Animals': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200/50 dark:border-orange-700/50';
      case 'Environment': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200/50 dark:border-emerald-700/50';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50';
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleMediaClick = () => {
    const mediaContent = {
      type: 'image', // All content is now image-only
      src: news.videoThumbnail,
      poster: news.videoThumbnail,
      title: news.headline,
      category: news.category,
      description: news.summary,
      placeholder: news.videoPlaceholder || 'future-video-content'
    };
    onMediaOpen(mediaContent);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-3xl shadow-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-0">
          {/* Image Container */}
          <div 
            className="relative group cursor-pointer"
            onClick={handleMediaClick}
          >
            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <ImageWithFallback
                src={news.videoThumbnail}
                alt={news.headline}
                className="w-full h-48 object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              
              {/* Hover overlay for images */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="bg-white/90 dark:bg-black/90 p-3 rounded-full backdrop-blur-sm">
                    <Eye className="w-6 h-6 text-gray-800 dark:text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className={`absolute top-3 right-3 px-3 py-1.5 rounded-full border shadow-lg ${getCategoryBg(news.category)}`}>
                {news.category}
              </Badge>
            </motion.div>

            {/* Story type indicator */}
            <motion.div
              className="absolute bottom-3 left-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs px-3 py-1.5 rounded-full">
                📖 Story
              </Badge>
            </motion.div>

            {/* Future video placeholder indicator */}
            {news.videoPlaceholder && (
              <motion.div
                className="absolute bottom-3 right-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Badge className="bg-blue-500/20 backdrop-blur-sm text-blue-200 border-blue-400/30 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  <span>Video Soon</span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <motion.h3 
              className="text-lg font-semibold text-foreground leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {news.headline}
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {news.summary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex justify-between items-center pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                    liked 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-all duration-300 ${liked ? 'fill-current scale-110' : ''}`} />
                  <span className="text-sm font-medium">Like</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuizStart(news.quiz);
                  }}
                  className={`flex items-center gap-2 bg-gradient-to-r ${getCategoryColor(news.category)} hover:shadow-lg text-white rounded-full px-4 py-2 font-medium shadow-md transition-all duration-300`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm">Quiz Time!</span>
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full border-0">
                    +{news.quiz.points}
                  </Badge>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                    saved 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 transition-all duration-300 ${saved ? 'fill-current scale-110' : ''}`} />
                  <span className="text-sm font-medium">Save</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}