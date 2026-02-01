import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Wind, Pause, Play, RotateCcw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ExercisePhase = "inhale" | "hold" | "exhale" | "rest";

const phaseConfig: Record<ExercisePhase, { label: string; duration: number; color: string }> = {
  inhale: { label: "Breathe In", duration: 4, color: "bg-primary" },
  hold: { label: "Hold", duration: 4, color: "bg-accent" },
  exhale: { label: "Breathe Out", duration: 4, color: "bg-emvia-blue-medium" },
  rest: { label: "Rest", duration: 2, color: "bg-secondary" },
};

const ActionScreen = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<ExercisePhase>("inhale");
  const [counter, setCounter] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [completed, setCompleted] = useState(false);

  const totalCycles = 4;

  useEffect(() => {
    if (!isActive || completed) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Move to next phase
          const phases: ExercisePhase[] = ["inhale", "hold", "exhale", "rest"];
          const currentIndex = phases.indexOf(phase);
          const nextIndex = (currentIndex + 1) % phases.length;
          const nextPhase = phases[nextIndex];
          
          setPhase(nextPhase);
          
          // Count cycles
          if (nextPhase === "inhale") {
            setCycles((prev) => {
              if (prev + 1 >= totalCycles) {
                setCompleted(true);
                setIsActive(false);
                return prev + 1;
              }
              return prev + 1;
            });
          }
          
          return phaseConfig[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, completed]);

  const handleStart = () => {
    setIsActive(true);
    setPhase("inhale");
    setCounter(phaseConfig.inhale.duration);
    setCycles(0);
    setCompleted(false);
  };

  const handlePauseResume = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCounter(4);
    setCycles(0);
    setCompleted(false);
  };

  const currentConfig = phaseConfig[phase];
  const progress = ((cycles * 4 + ["inhale", "hold", "exhale", "rest"].indexOf(phase)) / (totalCycles * 4)) * 100;

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <Wind className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Breathing Exercise
            </h1>
            <p className="text-muted-foreground text-sm">
              4-4-4-2 Box Breathing
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Exercise Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-stress-calm-bg flex items-center justify-center mb-6 mx-auto">
                <Check className="w-16 h-16 text-stress-calm" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Great Job!</h2>
              <p className="text-muted-foreground mb-8">
                You completed {totalCycles} breathing cycles
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleReset}
                  className="w-full h-12 rounded-xl gradient-hero"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Do Another Session
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/mood")}
                  className="w-full h-12 rounded-xl"
                >
                  Log How You Feel
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="exercise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Cycle {cycles + 1} of {totalCycles}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full gradient-hero"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Breathing Circle */}
              <div className="relative mb-8">
                <motion.div
                  animate={{
                    scale: phase === "inhale" ? 1.2 : phase === "exhale" ? 0.8 : 1,
                  }}
                  transition={{ duration: currentConfig.duration, ease: "easeInOut" }}
                  className="w-48 h-48 mx-auto rounded-full gradient-hero shadow-soft flex items-center justify-center"
                >
                  <div className="w-40 h-40 rounded-full bg-card shadow-card flex flex-col items-center justify-center">
                    <motion.span 
                      key={counter}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-5xl font-bold text-foreground"
                    >
                      {counter}
                    </motion.span>
                    <span className="text-muted-foreground text-sm mt-1">
                      {currentConfig.label}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                {!isActive && cycles === 0 ? (
                  <Button 
                    onClick={handleStart}
                    className="h-14 px-8 rounded-xl gradient-hero text-lg font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Exercise
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handlePauseResume}
                      variant="outline"
                      className="h-14 w-14 rounded-xl"
                    >
                      {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="h-14 w-14 rounded-xl"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 pb-8"
      >
        <div className="bg-card rounded-2xl shadow-card p-4">
          <h3 className="font-semibold text-foreground text-sm mb-2">How it works</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, 
            then rest for 2 seconds. This pattern helps activate your parasympathetic 
            nervous system and reduce stress.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ActionScreen;
