import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, TrendingUp, Award, Activity, BookOpen, MessageCircle } from 'lucide-react';

interface ParentDashboardProps {
  user: {
    name: string;
    points: number;
    level: number;
    badges: Array<{
      name: string;
      earned: boolean;
    }>;
  };
}

const weeklyTimeData = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 35 },
  { day: 'Wed', minutes: 20 },
  { day: 'Thu', minutes: 45 },
  { day: 'Fri', minutes: 30 },
  { day: 'Sat', minutes: 40 },
  { day: 'Sun', minutes: 28 }
];

const topicsData = [
  { name: 'Science', value: 40, color: '#22c55e' },
  { name: 'History', value: 30, color: '#f59e0b' },
  { name: 'Arts', value: 20, color: '#a855f7' },
  { name: 'Space', value: 10, color: '#3b82f6' }
];

const recentQuizzes = [
  { topic: 'Ancient Chola Dynasty', score: '8/10', date: '2 days ago', category: 'History' },
  { topic: 'Solar System Facts', score: '9/10', date: '3 days ago', category: 'Space' },
  { topic: 'Water Conservation', score: '7/10', date: '5 days ago', category: 'Science' },
  { topic: 'Musical Instruments', score: '10/10', date: '1 week ago', category: 'Arts' }
];

const activityLog = [
  { action: 'Completed quiz', detail: 'Ancient Chola Secrets', time: '2 hours ago', points: '+50' },
  { action: 'Watched story', detail: 'Kids Invent Solar Purifier', time: '5 hours ago', points: '+20' },
  { action: 'Earned badge', detail: 'History Buff', time: '1 day ago', points: '+100' },
  { action: 'Joined discussion', detail: 'Science & Space Club', time: '2 days ago', points: '+10' },
  { action: 'Completed quiz', detail: 'Dinosaur Discovery', time: '3 days ago', points: '+45' }
];

export function ParentDashboard({ user }: ParentDashboardProps) {
  const totalWeeklyMinutes = weeklyTimeData.reduce((sum, day) => sum + day.minutes, 0);
  const averageDaily = Math.round(totalWeeklyMinutes / 7);
  const earnedBadges = user.badges.filter(badge => badge.earned).length;
  const totalBadges = user.badges.length;

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Parent Dashboard</CardTitle>
          <p className="text-indigo-100 mt-2">Track {user.name}'s learning journey</p>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-2xl border-2 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{averageDaily}m</p>
            <p className="text-sm text-gray-600">Daily Average</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{user.points}</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{earnedBadges}/{totalBadges}</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">Level {user.level}</p>
            <p className="text-sm text-gray-600">Current Level</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Time Spent */}
      <Card className="rounded-3xl border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <BarChart className="w-6 h-6" />
            Weekly Screen Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTimeData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            Total this week: {totalWeeklyMinutes} minutes
          </p>
        </CardContent>
      </Card>

      {/* Topics Explored */}
      <Card className="rounded-3xl border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <BookOpen className="w-6 h-6" />
            Topics Explored
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {topicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Quiz Performance */}
      <Card className="rounded-3xl border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Award className="w-6 h-6" />
            Recent Quiz Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{quiz.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {quiz.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{quiz.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{quiz.score}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="rounded-3xl border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Activity className="w-6 h-6" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLog.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.action}: {activity.detail}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  {activity.points}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-200 rounded-3xl">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-green-800 mb-3">📚 Learning Insights</h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>• {user.name} shows strong interest in Science topics</p>
            <p>• Consistent daily engagement with 25-45 minutes</p>
            <p>• Excellent quiz performance with 85% average score</p>
            <p>• Active participation in safe community discussions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}