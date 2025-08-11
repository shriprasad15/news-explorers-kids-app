import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { MessageCircle, Users, Flag, ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockClubs = [
  {
    id: 1,
    name: "Science & Space",
    icon: "🚀",
    color: "from-blue-500 to-purple-600",
    members: 245,
    description: "Explore the wonders of science and space!"
  },
  {
    id: 2,
    name: "History Mysteries",
    icon: "🏛️",
    color: "from-amber-500 to-orange-600",
    members: 189,
    description: "Discover amazing stories from the past!"
  },
  {
    id: 3,
    name: "Awesome Animals",
    icon: "🐾",
    color: "from-green-500 to-teal-600",
    members: 312,
    description: "Learn about incredible creatures!"
  },
  {
    id: 4,
    name: "Art & Culture",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    members: 156,
    description: "Express creativity and explore cultures!"
  },
  {
    id: 5,
    name: "Amazing Inventions",
    icon: "⚡",
    color: "from-yellow-500 to-amber-600",
    members: 203,
    description: "Discover cool inventions and ideas!"
  },
  {
    id: 6,
    name: "Nature Explorers",
    icon: "🌿",
    color: "from-green-600 to-emerald-700",
    members: 278,
    description: "Explore the natural world around us!"
  }
];

const mockMessages = [
  {
    id: 1,
    user: "Explorer Max",
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Max&backgroundColor=b6e3f4&scale=80",
    message: "Did you know that Jupiter has 79 moons? 🌙",
    timestamp: "2 mins ago",
    reactions: ["🤩", "👍", "🚀"]
  },
  {
    id: 2,
    user: "Explorer Zoe",
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Zoe&backgroundColor=f9a8d4&scale=80",
    message: "That's amazing! I want to be an astronaut someday!",
    timestamp: "5 mins ago",
    reactions: ["🚀", "⭐", "👏"]
  },
  {
    id: 3,
    user: "Explorer Sam",
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sam&backgroundColor=86efac&scale=80",
    message: "Cool! The largest moon is called Ganymede 🌕",
    timestamp: "8 mins ago",
    reactions: ["🤓", "👍"]
  },
  {
    id: 4,
    user: "Explorer Luna",
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Luna&backgroundColor=f472b6&scale=80",
    message: "I love learning about space! 🌌",
    timestamp: "10 mins ago",
    reactions: ["❤️", "⭐"]
  }
];

const safeResponses = [
  "Wow! 🤩",
  "That's cool! 😎",
  "Amazing! ⭐",
  "I learned something new! 🧠",
  "So interesting! 🤔",
  "Thanks for sharing! 🙏"
];

const emojiReactions = ["👍", "❤️", "😮", "🤩", "🔥", "⭐", "🚀", "🌟"];

export function ClubhouseScreen() {
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  const [messages, setMessages] = useState(mockMessages);

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...msg.reactions, emoji] }
        : msg
    ));
  };

  const handleResponse = (response: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: "Explorer Anya",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Anya&backgroundColor=fde047&scale=80",
      message: response,
      timestamp: "Just now",
      reactions: []
    };
    setMessages(prev => [...prev, newMessage]);
  };

  if (selectedClub) {
    const club = mockClubs.find(c => c.id === selectedClub);
    
    return (
      <div className="p-4 space-y-4">
        {/* Club Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`bg-gradient-to-r ${club?.color} text-white rounded-3xl border-0 shadow-2xl`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedClub(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </motion.div>
                <div className="text-4xl">{club?.icon}</div>
                <div>
                  <h2 className="text-xl font-bold">{club?.name}</h2>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {club?.members} explorers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10 ring-2 ring-border/50">
                        <AvatarImage src={message.avatar} alt={message.user} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                          {message.user.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{message.user}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto text-muted-foreground hover:text-red-500"
                            >
                              <Flag className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        </div>
                        
                        <p className="text-foreground mb-3 leading-relaxed">{message.message}</p>
                        
                        {/* Reactions */}
                        {message.reactions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {message.reactions.map((reaction, index) => (
                              <Badge key={index} variant="secondary" className="text-sm px-2 py-1 bg-muted/50">
                                {reaction}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {/* Quick Reactions */}
                        <div className="flex flex-wrap gap-2">
                          {emojiReactions.slice(0, 4).map((emoji) => (
                            <motion.div
                              key={emoji}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReaction(message.id, emoji)}
                                className="p-2 h-8 rounded-full border-border/50 hover:bg-muted/50"
                              >
                                {emoji}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Safe Response Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-3xl border border-blue-200/50 dark:border-blue-700/50 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-blue-700 dark:text-blue-300 text-lg flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Share Your Thoughts!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {safeResponses.map((response, index) => (
                  <motion.div
                    key={response}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleResponse(response)}
                      className="p-3 rounded-2xl border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 text-sm w-full"
                    >
                      {response}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <MessageCircle className="w-8 h-8" />
              The Clubhouse
            </CardTitle>
            <p className="text-white/90 mt-2">Join safe discussions with fellow explorers!</p>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {mockClubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:shadow-lg cursor-pointer transition-all duration-300"
              onClick={() => setSelectedClub(club.id)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${club.color} p-4 rounded-t-3xl`}>
                  <div className="flex items-center gap-3 text-white">
                    <div className="text-4xl">{club.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{club.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm text-white/90">{club.members} explorers</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {club.description}
                  </p>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-green-50/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-700/50 rounded-3xl backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Safe Space Rules 🛡️</h3>
            <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
              Be kind, stay curious, and help make this a fun place for everyone to learn!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}