import { motion } from "framer-motion";
import { Brain, ArrowLeft, TrendingUp, Clock, Sun, Moon, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const insights = [
  {
    icon: Clock,
    title: "Afternoon Stress Pattern",
    description: "Your stress levels tend to rise during late afternoons, typically between 3-5 PM. Consider scheduling breaks during this time.",
    type: "pattern",
    priority: "medium",
  },
  {
    icon: TrendingUp,
    title: "Recovery Improvement",
    description: "Your stress recovery time has improved by 15% over the past week. Great progress!",
    type: "positive",
    priority: "low",
  },
  {
    icon: Sun,
    title: "Morning Calmness",
    description: "Your mornings consistently show low stress indicators. This is your optimal time for focused work.",
    type: "positive",
    priority: "low",
  },
  {
    icon: AlertCircle,
    title: "Sustained Stress Alert",
    description: "You've experienced sustained stress for the past 30 minutes. Would you like to try a quick relaxation exercise?",
    type: "alert",
    priority: "high",
  },
];

const getInsightStyle = (type: string) => {
  switch (type) {
    case "positive":
      return {
        bg: "bg-stress-calm-bg",
        border: "border-stress-calm/20",
        iconBg: "bg-stress-calm/20",
        iconColor: "text-stress-calm",
      };
    case "alert":
      return {
        bg: "bg-stress-elevated-bg",
        border: "border-stress-elevated/20",
        iconBg: "bg-stress-elevated/20",
        iconColor: "text-stress-elevated",
      };
    default:
      return {
        bg: "bg-stress-moderate-bg",
        border: "border-stress-moderate/20",
        iconBg: "bg-stress-moderate/20",
        iconColor: "text-stress-moderate",
      };
  }
};

const InsightsScreen = () => {
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary-foreground">
            AI Insights
          </h1>
        </div>
        <p className="text-primary-foreground/80">
          Patterns detected from your biometric data
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 py-6"
      >
        <div className="bg-card rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-stress-calm" />
            <h3 className="font-semibold text-foreground">Weekly Summary</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This week, you've maintained calm stress levels for 68% of your monitored time. 
            Your best days were Monday and Wednesday. Focus on the patterns below to continue improving.
          </p>
        </div>
      </motion.div>

      {/* Insights List */}
      <div className="px-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Detected Patterns</h2>
        
        {insights.map((insight, index) => {
          const style = getInsightStyle(insight.type);
          
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className={`${style.bg} rounded-2xl p-5 border ${style.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`w-5 h-5 ${style.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default InsightsScreen;
