import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardScreenProps {
  currentUser: {
    id: number;
    name: string;
    avatar: string;
    points: number;
  };
}

const mockLeaderboardData = {
  weekly: [
    { rank: 1, id: 2, name: "Explorer Max", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Max&backgroundColor=b6e3f4&scale=80", points: 890 },
    { rank: 2, id: 1, name: "Explorer Anya", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Anya&backgroundColor=fde047&scale=80", points: 750 },
    { rank: 3, id: 3, name: "Explorer Sam", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sam&backgroundColor=86efac&scale=80", points: 720 },
    { rank: 4, id: 4, name: "Explorer Zoe", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Zoe&backgroundColor=f9a8d4&scale=80", points: 680 },
    { rank: 5, id: 5, name: "Explorer Leo", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Leo&backgroundColor=fbbf24&scale=80", points: 650 },
    { rank: 6, id: 6, name: "Explorer Maya", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Maya&backgroundColor=c084fc&scale=80", points: 620 },
    { rank: 7, id: 7, name: "Explorer Alex", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Alex&backgroundColor=fb7185&scale=80", points: 590 },
  ],
  allTime: [
    { rank: 1, id: 8, name: "Explorer Nova", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Nova&backgroundColor=a78bfa&scale=80", points: 2340 },
    { rank: 2, id: 9, name: "Explorer Kai", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Kai&backgroundColor=34d399&scale=80", points: 2180 },
    { rank: 3, id: 1, name: "Explorer Anya", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Anya&backgroundColor=fde047&scale=80", points: 1250 },
    { rank: 4, id: 10, name: "Explorer Rio", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Rio&backgroundColor=60a5fa&scale=80", points: 1190 },
    { rank: 5, id: 11, name: "Explorer Luna", avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Luna&backgroundColor=f472b6&scale=80", points: 1150 },
  ]
};

export function LeaderboardScreen({ currentUser }: LeaderboardScreenProps) {
  const [activeTab, setActiveTab] = useState('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" fill="currentColor" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400 dark:text-gray-300" fill="currentColor" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" fill="currentColor" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700";
    }
    
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border-2 border-yellow-300 dark:border-yellow-700";
      case 2:
        return "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 border-2 border-gray-300 dark:border-gray-700";
      case 3:
        return "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-2 border-amber-300 dark:border-amber-700";
      default:
        return "bg-card/50 backdrop-blur-sm border border-border/50";
    }
  };

  const renderLeaderboard = (data: any[]) => (
    <div className="space-y-3">
      <AnimatePresence>
        {data.map((user, index) => {
          const isCurrentUser = user.id === currentUser.id;
          
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`rounded-2xl ${getRankColor(user.rank, isCurrentUser)} transition-all hover:shadow-lg`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-700">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                          {user.name.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {user.name}
                          {isCurrentUser && (
                            <Badge className="ml-2 bg-blue-500 text-white text-xs">You</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">Rank #{user.rank}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span className="font-bold text-lg text-foreground">
                          {user.points.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl border-0 mb-6 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Trophy className="w-8 h-8" />
              Leaderboard
            </CardTitle>
            <p className="text-white/90 mt-2">See how you stack up against other explorers!</p>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 backdrop-blur-sm rounded-2xl p-1">
            <TabsTrigger 
              value="weekly" 
              className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
            >
              This Week
            </TabsTrigger>
            <TabsTrigger 
              value="allTime"
              className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
            >
              All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-0">
            {renderLeaderboard(mockLeaderboardData.weekly)}
          </TabsContent>

          <TabsContent value="allTime" className="mt-0">
            {renderLeaderboard(mockLeaderboardData.allTime)}
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200/50 dark:border-green-700/50 rounded-3xl backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Keep Exploring! 🚀</h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Complete more quizzes and watch more stories to climb the leaderboard!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}