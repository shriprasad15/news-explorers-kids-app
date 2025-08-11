import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Star, Award, BookOpen, Trophy, Sparkles, Target, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileScreenProps {
  user: {
    name: string;
    avatar: string;
    points: number;
    level: number;
    levelName: string;
    xp: number;
    xpToNext: number;
    badges: Array<{
      id: number;
      name: string;
      icon: string;
      earned: boolean;
    }>;
  };
}

export function ProfileScreen({ user }: ProfileScreenProps) {
  const progressPercentage = (user.xp / user.xpToNext) * 100;

  // Updated with cartoon avatars
  const cartoonAvatar = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Anya&backgroundColor=fde047&scale=80";

  const mockSavedStories = [
    { id: 1, title: "How Whale Poop Saves Our World! 🐋", category: "Science", timeAgo: "2 days ago" },
    { id: 2, title: "Project Tiger: Saving India's Majestic Cats! 🐅", category: "Animals", timeAgo: "5 days ago" },
    { id: 3, title: "Kids Plant Trees to Save Rajasthan! 🌳", category: "Environment", timeAgo: "1 week ago" }
  ];

  const achievements = [
    { title: "First Quiz Master", description: "Completed your first quiz", date: "Today" },
    { title: "Science Explorer", description: "Watched 10 science videos", date: "Yesterday" },
    { title: "Week Streak", description: "7 days in a row learning", date: "3 days ago" }
  ];

  const stats = [
    { label: "Stories Read", value: "47", icon: BookOpen, color: "from-blue-500 to-indigo-500" },
    { label: "Quizzes Passed", value: "23", icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Days Streak", value: "12", icon: Calendar, color: "from-orange-500 to-amber-500" },
    { label: "Rank", value: "#3", icon: Trophy, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header with enhanced design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-3xl border-0 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full" />
          </div>
          
          <CardContent className="p-8 text-center relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-white/30 shadow-2xl">
                <AvatarImage src={cartoonAvatar} alt={user.name} />
                <AvatarFallback className="bg-white text-blue-500 text-3xl font-bold">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {user.name}
            </motion.h2>
            
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
              <span className="text-xl font-semibold">{user.points.toLocaleString()} Points</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-6 py-3 text-lg rounded-full">
                Level {user.level}: {user.levelName}
              </Badge>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Target className="w-6 h-6" />
              Progress to Next Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>XP: {user.xp}</span>
                <span>Next: {user.xpToNext}</span>
              </div>
              
              <div className="relative">
                <Progress value={progressPercentage} className="h-4 bg-muted/50 rounded-full" />
                <motion.div
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg"
                  style={{ left: `${Math.min(progressPercentage, 95)}%` }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              
              <motion.p 
                className="text-sm text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {user.xpToNext - user.xp} XP to reach Level {user.level + 1}!
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Award className="w-6 h-6" />
              Badges Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {user.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: badge.earned ? 1.05 : 1, y: badge.earned ? -5 : 0 }}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 cursor-pointer ${
                    badge.earned
                      ? 'bg-gradient-to-b from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border-2 border-amber-300 dark:border-amber-700 shadow-lg'
                      : 'bg-muted/30 border-2 border-muted opacity-60'
                  }`}
                >
                  <div className={`text-4xl mb-2 transition-all duration-300 ${badge.earned ? 'animate-pulse' : ''}`}>
                    {badge.icon}
                  </div>
                  <p className={`text-sm font-medium ${
                    badge.earned ? 'text-amber-800 dark:text-amber-200' : 'text-muted-foreground'
                  }`}>
                    {badge.name}
                  </p>
                  {badge.earned && (
                    <motion.div 
                      className="mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Badge className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Earned!
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Trophy className="w-6 h-6" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 bg-muted/30 rounded-2xl border border-border/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {achievement.date}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Saved Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-6 h-6" />
              Saved Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSavedStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-4 bg-muted/30 rounded-2xl border border-border/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <h4 className="font-medium text-foreground text-sm mb-2 leading-tight">
                    {story.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {story.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{story.timeAgo}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Leaderboard Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-3xl text-lg font-medium shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
          <Trophy className="w-6 h-6 mr-2" />
          View Leaderboard
        </Button>
      </motion.div>
    </div>
  );
}