import React, { useState, useEffect } from "react";
import { NewsFeed } from "./components/NewsFeed";
import { ProfileScreen } from "./components/ProfileScreen";
import { LeaderboardScreen } from "./components/LeaderboardScreen";
import { ClubhouseScreen } from "./components/ClubhouseScreen";
import { ParentDashboard } from "./components/ParentDashboard";
import { QuizModal } from "./components/QuizModal";
import { MediaModal } from "./components/MediaModal";
import { Button } from "./components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Switch } from "./components/ui/switch";
import {
  Home,
  User,
  Trophy,
  MessageCircle,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock user data with cartoon avatar
const mockUser = {
  id: 1,
  name: "Explorer Anya",
  avatar:
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Anya&backgroundColor=fde047&scale=80",
  points: 1250,
  level: 5,
  levelName: "History Buff",
  xp: 750,
  xpToNext: 1000,
  badges: [
    { id: 1, name: "Space Reporter", icon: "🚀", earned: true },
    { id: 2, name: "Paleontologist", icon: "🦕", earned: true },
    { id: 3, name: "Art Expert", icon: "🎨", earned: false },
    { id: 4, name: "Science Whiz", icon: "🔬", earned: true },
  ],
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("feed");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [user, setUser] = useState(mockUser);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const updateUserPoints = (points) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + points,
      xp: prev.xp + points,
    }));
  };

  const handleScreenChange = (screenId) => {
    console.log("Changing screen to:", screenId); // Debug log
    setCurrentScreen(screenId);
  };

  const handleMediaOpen = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "feed":
        return (
          <NewsFeed
            onQuizStart={(quiz) => {
              setSelectedQuiz(quiz);
              setShowQuiz(true);
            }}
            onMediaOpen={handleMediaOpen}
          />
        );
      case "profile":
        return <ProfileScreen user={user} />;
      case "leaderboard":
        return <LeaderboardScreen currentUser={user} />;
      case "clubhouse":
        return <ClubhouseScreen />;
      case "parent":
        return <ParentDashboard user={user} />;
      default:
        return (
          <NewsFeed
            onQuizStart={(quiz) => {
              setSelectedQuiz(quiz);
              setShowQuiz(true);
            }}
            onMediaOpen={handleMediaOpen}
          />
        );
    }
  };

  const navItems = [
    { id: "feed", icon: Home, label: "Home" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
    {
      id: "clubhouse",
      icon: MessageCircle,
      label: "Clubhouse",
    },
    { id: "parent", icon: Settings, label: "Parent" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-green-500/10" />

      {/* Header with frosted glass effect */}
      <motion.div
        className="sticky top-0 z-40 backdrop-blur-2xl bg-background/80 border-b border-border/50 supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="p-4 safe-area-top">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-lg">🌟</span>
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                News Explorers
              </h1>
            </motion.div>

            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <motion.div
                className="flex items-center gap-2 p-2 rounded-xl bg-muted/80 dark:bg-slate-800/80 border border-border/20 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sun className={`w-4 h-4 transition-colors ${!isDarkMode ? 'text-amber-500' : 'text-amber-400/50'}`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-600"
                />
                <Moon className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-blue-400' : 'text-blue-500/50'}`} />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-full border border-amber-200/50 dark:border-amber-700/50 shadow-sm"
                >
                  <span className="mr-1">✨</span>
                  {user.points.toLocaleString()} PTS
                </Badge>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Avatar
                  className="w-10 h-10 cursor-pointer ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg"
                  onClick={() => handleScreenChange("profile")}
                >
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          className="pb-24 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation with glassmorphism - Fixed Implementation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md backdrop-blur-2xl bg-background/90 border-t border-border/50 supports-[backdrop-filter]:bg-background/70 z-50">
        <div className="px-4 py-3 safe-area-bottom">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleScreenChange(item.id);
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 cursor-pointer relative ${
                    isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "drop-shadow-sm" : ""}
                  />
                  <span
                    className={`text-xs font-medium ${isActive ? "text-white" : ""}`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quiz Modal with enhanced animations */}
      <AnimatePresence>
        {showQuiz && selectedQuiz && (
          <QuizModal
            quiz={selectedQuiz}
            onClose={() => setShowQuiz(false)}
            onComplete={(points) => {
              updateUserPoints(points);
              setShowQuiz(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Media Modal for images and videos */}
      <AnimatePresence>
        {showMediaModal && selectedMedia && (
          <MediaModal
            isOpen={showMediaModal}
            onClose={() => setShowMediaModal(false)}
            content={selectedMedia}
          />
        )}
      </AnimatePresence>

      {/* Safe area adjustments for notched devices */}
      <style>{`
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}