import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RefreshCw, Filter, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';

// Import the new cartoon images
const tigerStoryImage = '/images/tiger.png';
const whaleStoryImage = '/images/whale.png';
const rajasthanNewsImage = '/images/rajasthan.png';

// Function to shuffle array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const baseNewsData = [
  {
    id: 1,
    headline: "How Whale Poop Saves Our World! 🐋",
    summary: "Amazing discovery! Whale poop helps tiny ocean plants grow, which gives us 50% of Earth's oxygen! Learn how these gentle giants are climate heroes.",
    videoThumbnail: whaleStoryImage,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    category: "Science",
    trending: true,
    publishedTime: "1 hour ago",
    quiz: {
      question: "What percentage of Earth's oxygen comes from tiny ocean plants fed by whale poop?",
      options: ["50%", "25%", "75%"],
      correct: 0,
      points: 60
    }
  },
  {
    id: 2,
    headline: "The Tale of the Tigers: Project Tiger Success! 🐅",
    summary: "From just 1,800 tigers in 1973 to over 3,000 today! Discover how Project Tiger became India's greatest wildlife conservation success story.",
    videoThumbnail: tigerStoryImage,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    category: "Animals",
    trending: true,
    publishedTime: "2 hours ago",
    quiz: {
      question: "How many tigers live in India's reserves today thanks to Project Tiger?",
      options: ["Over 3,000", "1,800", "500"],
      correct: 0,
      points: 50
    }
  },
  {
    id: 3,
    headline: "Kids Plant 1 Million Trees in Rajasthan! 🌳",
    summary: "Young environmental heroes work together to bring back green forests and clean water to India's driest state!",
    videoThumbnail: rajasthanNewsImage,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    category: "Environment",
    trending: true,
    publishedTime: "3 hours ago",
    quiz: {
      question: "Which state is known as India's driest state?",
      options: ["Rajasthan", "Kerala", "Punjab"],
      correct: 0,
      points: 40
    }
  },
  {
    id: 4,
    headline: "Kids Invent Solar-Powered Water Cleaner! ☀️",
    summary: "Amazing students from Chennai created a special machine that cleans dirty water using sunshine! Science saves the day!",
    videoThumbnail: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    category: "Science",
    trending: false,
    publishedTime: "5 hours ago",
    quiz: {
      question: "What powers the water cleaner invented by the kids?",
      options: ["Solar energy", "Wind energy", "Battery"],
      correct: 0,
      points: 45
    }
  },
  {
    id: 5,
    headline: "Space Scientists Find Water on the Moon! 🌙",
    summary: "Indian space heroes discovered water drops on the Moon using their super cool Chandrayaan satellite! Space exploration rocks!",
    videoThumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    category: "Space",
    trending: false,
    publishedTime: "8 hours ago",
    quiz: {
      question: "What did ISRO scientists find on the Moon?",
      options: ["Water molecules", "Gold", "Diamonds"],
      correct: 0,
      points: 55
    }
  },
  {
    id: 6,
    headline: "Ancient Chola Kingdom Secrets Found! 🏛️",
    summary: "Archaeologists discovered amazing treasures from the super cool Chola dynasty in Tamil Nadu! History comes alive!",
    videoThumbnail: "https://images.unsplash.com/photo-1661358985240-fc286e095bf5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4",
    category: "History",
    trending: false,
    publishedTime: "12 hours ago",
    quiz: {
      question: "Which dynasty built the great Brihadeeswara Temple?",
      options: ["Chola Dynasty", "Pandya Dynasty", "Pallava Dynasty"],
      correct: 0,
      points: 50
    }
  },
  {
    id: 7,
    headline: "Young Marine Biologists Save Coral Reefs! 🐠",
    summary: "Teen scientists in Kerala develop new ways to protect colorful coral reefs and ocean fish! Ocean heroes in action!",
    videoThumbnail: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    category: "Environment",
    trending: false,
    publishedTime: "1 day ago",
    quiz: {
      question: "Which ocean life creates beautiful coral reefs?",
      options: ["Tiny polyps", "Big fish", "Seaweed"],
      correct: 0,
      points: 45
    }
  },
  {
    id: 8,
    headline: "Robot Helpers in Indian Hospitals! 🤖",
    summary: "Cool robots now help doctors and nurses take care of patients in hospitals across India! Technology meets healthcare!",
    videoThumbnail: "https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_5mb.mp4",
    category: "Science",
    trending: false,
    publishedTime: "1 day ago",
    quiz: {
      question: "How do robots help in hospitals?",
      options: ["Assist doctors and nurses", "Cook food", "Clean windows"],
      correct: 0,
      points: 40
    }
  }
];

const categories = ["All", "Science", "Animals", "Environment", "Space", "History"];

interface NewsFeedProps {
  onQuizStart: (quiz: any) => void;
  onMediaOpen: (media: any) => void;
}

export function NewsFeed({ onQuizStart, onMediaOpen }: NewsFeedProps) {
  const [news, setNews] = useState(() => shuffleArray(baseNewsData));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredNews = selectedCategory === "All" 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Shuffle news for demo
    setNews(shuffleArray(baseNewsData));
    setIsRefreshing(false);
  };

  const handleTrendingClick = (item: any) => {
    const mediaContent = {
      type: item.videoUrl ? 'video' : 'image',
      src: item.videoUrl || item.videoThumbnail,
      poster: item.videoThumbnail,
      title: item.headline,
      category: item.category,
      description: item.summary
    };
    onMediaOpen(mediaContent);
  };

  const trendingNews = news.filter(item => item.trending);

  return (
    <div className="space-y-6">
      {/* Trending Section */}
      {trendingNews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-foreground">Trending Now</h2>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {trendingNews.map((item, index) => (
              <motion.div
                key={item.id}
                className="min-w-[280px] snap-start cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTrendingClick(item)}
              >
                <div className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-lg">
                  {/* Image Background with proper fallback */}
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={item.videoThumbnail}
                      alt={item.headline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Story icon (all are now image stories) */}
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                      {item.headline}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30 text-xs px-2 py-1">
                        {item.category}
                      </Badge>
                      <span className="text-white/80 text-xs">
                        {item.publishedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filter Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Latest Stories</h2>
          
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full border-border/50 hover:bg-muted/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-full border-border/50 hover:bg-muted/50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Category Filter */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'border-border/50 hover:bg-muted/50'
                      }`}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* News Cards */}
      <div className="px-4 space-y-6">
        <AnimatePresence>
          {filteredNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsCard 
                news={newsItem}
                onQuizStart={onQuizStart}
                onMediaOpen={onMediaOpen}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      <div className="px-4 pb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full rounded-2xl py-6 border-border/50 hover:bg-muted/50 transition-all duration-300"
          >
            Load More Stories
          </Button>
        </motion.div>
      </div>
    </div>
  );
}