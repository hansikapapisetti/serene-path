import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Heart, Activity, Thermometer, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const dataPoints = [
  { icon: Heart, label: "Heart Rate", description: "Continuous heart rhythm monitoring" },
  { icon: Activity, label: "Heart Rate Variability", description: "Stress and recovery indicators" },
  { icon: Thermometer, label: "Skin Temperature", description: "Temperature fluctuations" },
  { icon: Zap, label: "Skin Conductance", description: "Emotional response signals" },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      localStorage.setItem("emvia-consent", "true");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-12 pb-6 px-6 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-hero shadow-soft mb-6">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Welcome to Emvia
        </h1>
        <p className="text-muted-foreground text-lg">
          Your personal stress awareness companion
        </p>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 px-6 pb-6"
      >
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            What data we collect
          </h2>
          <div className="space-y-4">
            {dataPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{point.label}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-emvia-yellow/10 rounded-2xl p-5 border border-accent/20"
        >
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            Privacy First
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All data is stored anonymously on your device. We never collect personal identifiers 
            like names, emails, or locations. You can delete all data at any time.
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="px-6 pb-8"
      >
        <div className="flex items-start gap-3 mb-6">
          <Checkbox 
            id="consent" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="mt-0.5"
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
            I understand and agree to the anonymous collection of biometric data for stress 
            awareness purposes only.
          </label>
        </div>
        
        <Button 
          onClick={handleContinue}
          disabled={!agreed}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-hero shadow-soft hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Check className="w-5 h-5 mr-2" />
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
