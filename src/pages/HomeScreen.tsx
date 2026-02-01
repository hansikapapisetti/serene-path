import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Smile, Meh, Frown, Activity, TrendingUp, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

type StressLevel = "calm" | "moderate" | "elevated";

const stressConfig = {
  calm: {
    icon: Smile,
    label: "Calm",
    message: "Your body appears calm and relaxed",
    color: "stress-calm",
    bgGradient: "from-stress-calm-bg to-background",
  },
  moderate: {
    icon: Meh,
    label: "Moderate",
    message: "Your stress level is slightly elevated",
    color: "stress-moderate",
    bgGradient: "from-stress-moderate-bg to-background",
  },
  elevated: {
    icon: Frown,
    label: "Elevated",
    message: "Your stress level is elevated",
    color: "stress-elevated",
    bgGradient: "from-stress-elevated-bg to-background",
  },
};

const HomeScreen = () => {
  const navigate = useNavigate();
  
  // Simulated current stress level
  const currentStress: StressLevel = "calm";
  const config = stressConfig[currentStress];
  const StressIcon = config.icon;

  const quickActions = [
    { icon: Activity, label: "Biometrics", path: "/biometrics", description: "View your data" },
    { icon: Brain, label: "AI Insights", path: "/insights", description: "Pattern analysis" },
    { icon: TrendingUp, label: "Progress", path: "/progress", description: "Your trends" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-b ${config.bgGradient} pt-12 pb-8 px-6`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6"
        >
          <p className="text-muted-foreground mb-1">Current Status</p>
          <h1 className="text-2xl font-display font-bold text-foreground">How You're Feeling</h1>
        </motion.div>

        {/* Stress Indicator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className={`relative w-40 h-40 rounded-full ${config.color} flex items-center justify-center animate-pulse-slow`}>
            <div className="absolute inset-2 rounded-full bg-card shadow-card flex items-center justify-center">
              <StressIcon className={`w-16 h-16 text-${currentStress === 'calm' ? 'stress-calm' : currentStress === 'moderate' ? 'stress-moderate' : 'stress-elevated'}`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${config.color} mb-3`}>
            {config.label}
          </span>
          <p className="text-foreground text-lg">{config.message}</p>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="px-6 py-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <button
                onClick={() => navigate(action.path)}
                className="w-full bg-card rounded-2xl shadow-card p-4 flex items-center gap-4 hover:shadow-soft transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                  <action.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Take Action Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="px-6"
      >
        <div className="bg-emvia-yellow/10 rounded-2xl p-5 border border-accent/20">
          <h3 className="font-semibold text-foreground mb-2">Need a moment?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Take a quick breathing exercise to maintain your calm state.
          </p>
          <Button 
            onClick={() => navigate("/action")}
            className="w-full h-12 rounded-xl gradient-warm text-accent-foreground font-semibold hover:opacity-90 transition-all"
          >
            Start Breathing Exercise
          </Button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
