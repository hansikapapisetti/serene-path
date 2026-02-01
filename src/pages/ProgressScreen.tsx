import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Award, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import BottomNav from "@/components/BottomNav";

const weeklyData = [
  { day: "Mon", calm: 75, moderate: 20, elevated: 5 },
  { day: "Tue", calm: 60, moderate: 30, elevated: 10 },
  { day: "Wed", calm: 80, moderate: 15, elevated: 5 },
  { day: "Thu", calm: 55, moderate: 35, elevated: 10 },
  { day: "Fri", calm: 65, moderate: 25, elevated: 10 },
  { day: "Sat", calm: 85, moderate: 12, elevated: 3 },
  { day: "Sun", calm: 70, moderate: 22, elevated: 8 },
];

const stats = [
  {
    icon: Award,
    label: "Calm Time",
    value: "68%",
    change: "+5%",
    positive: true,
    description: "of monitored time",
  },
  {
    icon: TrendingDown,
    label: "Stress Episodes",
    value: "12",
    change: "-3",
    positive: true,
    description: "this week",
  },
  {
    icon: Target,
    label: "Recovery Time",
    value: "8 min",
    change: "-2 min",
    positive: true,
    description: "avg to calm down",
  },
];

const achievements = [
  { emoji: "🌟", label: "7-Day Streak", unlocked: true },
  { emoji: "🧘", label: "10 Exercises", unlocked: true },
  { emoji: "📊", label: "First Week", unlocked: true },
  { emoji: "🎯", label: "Stress Master", unlocked: false },
];

const ProgressScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="gradient-hero pt-12 pb-6 px-6"
      >
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 hover:bg-primary-foreground/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-primary-foreground">
              Progress & Trends
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Your stress awareness journey
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 py-6"
      >
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl shadow-card p-4 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary mx-auto mb-2 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`text-xs font-medium ${stat.positive ? 'text-stress-calm' : 'text-stress-elevated'}`}>
                {stat.change}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 pb-6"
      >
        <div className="bg-card rounded-2xl shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">This Week</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last 7 days</span>
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barCategoryGap="20%">
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
                <Bar dataKey="calm" stackId="a" fill="hsl(145, 60%, 45%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="moderate" stackId="a" fill="hsl(45, 95%, 55%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="elevated" stackId="a" fill="hsl(0, 75%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stress-calm" />
              <span className="text-xs text-muted-foreground">Calm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stress-moderate" />
              <span className="text-xs text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stress-elevated" />
              <span className="text-xs text-muted-foreground">Elevated</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6"
      >
        <h3 className="font-semibold text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className={`bg-card rounded-2xl shadow-card p-4 text-center ${
                !achievement.unlocked && 'opacity-50'
              }`}
            >
              <span className="text-2xl block mb-1">{achievement.emoji}</span>
              <span className="text-xs text-muted-foreground">{achievement.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default ProgressScreen;
