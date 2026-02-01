import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const moods = [
  { emoji: "😊", label: "Great", color: "bg-stress-calm-bg border-stress-calm/30" },
  { emoji: "🙂", label: "Good", color: "bg-emvia-blue-light border-primary/20" },
  { emoji: "😐", label: "Okay", color: "bg-stress-moderate-bg border-stress-moderate/30" },
  { emoji: "😕", label: "Not Great", color: "bg-orange-50 border-orange-300/30" },
  { emoji: "😔", label: "Stressed", color: "bg-stress-elevated-bg border-stress-elevated/30" },
];

const feelings = [
  "Relaxed", "Focused", "Energized", "Tired", "Anxious", 
  "Happy", "Overwhelmed", "Calm", "Motivated", "Distracted"
];

const MoodScreen = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling].slice(0, 3)
    );
  };

  const handleSave = () => {
    if (selectedMood !== null) {
      setSaved(true);
      toast.success("Mood logged successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  if (saved) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-stress-calm-bg flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-stress-calm" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Thank You!</h2>
          <p className="text-muted-foreground">Your mood has been recorded</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-12 pb-6 px-6"
      >
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4 hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">
          How are you feeling?
        </h1>
        <p className="text-muted-foreground mt-1">
          This helps us improve your recommendations
        </p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6">
        {/* Mood Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Overall Mood</h2>
          <div className="flex justify-between gap-2">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                onClick={() => setSelectedMood(index)}
                className={`flex-1 py-4 rounded-2xl border-2 transition-all ${
                  selectedMood === index
                    ? `${mood.color} scale-105 shadow-soft`
                    : "bg-card border-transparent hover:border-border"
                }`}
              >
                <span className="text-3xl block mb-1">{mood.emoji}</span>
                <span className="text-xs text-muted-foreground">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Feelings Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">What describes you best?</h2>
          <p className="text-sm text-muted-foreground mb-4">Select up to 3</p>
          <div className="flex flex-wrap gap-2">
            {feelings.map((feeling, index) => (
              <motion.button
                key={feeling}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                onClick={() => toggleFeeling(feeling)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedFeelings.includes(feeling)
                    ? "gradient-hero text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-primary/30"
                }`}
              >
                {feeling}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Optional Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-emvia-yellow/10 rounded-2xl p-4 border border-accent/20"
        >
          <p className="text-sm text-muted-foreground">
            💡 Your mood data is stored anonymously and only used to personalize 
            your stress management recommendations.
          </p>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 py-8"
      >
        <Button 
          onClick={handleSave}
          disabled={selectedMood === null}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-hero shadow-soft hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Check className="w-5 h-5 mr-2" />
          Save Mood Check-in
        </Button>
      </motion.div>
    </div>
  );
};

export default MoodScreen;
