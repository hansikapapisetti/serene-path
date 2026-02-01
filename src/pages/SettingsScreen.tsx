import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Bell, Database, Shield, Trash2, 
  ChevronRight, Download, Info, Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [stressAlerts, setStressAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(false);

  const handleDeleteData = () => {
    localStorage.clear();
    toast.success("All data has been deleted");
    navigate("/");
  };

  const handleExportData = () => {
    toast.success("Data export started");
  };

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
        <h1 className="text-2xl font-display font-bold text-primary-foreground">
          Settings & Privacy
        </h1>
        <p className="text-primary-foreground/80 mt-1">
          Control your data and preferences
        </p>
      </motion.div>

      {/* Notifications Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 py-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h2>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">Enable all notifications</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Stress Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified when stress is elevated</p>
            </div>
            <Switch 
              checked={stressAlerts} 
              onCheckedChange={setStressAlerts}
              disabled={!notifications}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Daily Check-in Reminder</h3>
              <p className="text-sm text-muted-foreground">Remind me to log my mood</p>
            </div>
            <Switch 
              checked={dailyReminders} 
              onCheckedChange={setDailyReminders}
              disabled={!notifications}
            />
          </div>
        </div>
      </motion.div>

      {/* Data Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-6 pb-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Data Management
        </h2>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          <button 
            onClick={handleExportData}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <h3 className="font-medium text-foreground">Export My Data</h3>
                <p className="text-sm text-muted-foreground">Download all stored data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-destructive" />
                  <div className="text-left">
                    <h3 className="font-medium text-destructive">Delete All Data</h3>
                    <p className="text-sm text-muted-foreground">Permanently remove all stored data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All your biometric data, mood logs, 
                  and preferences will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteData}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>

      {/* Privacy Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 pb-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Privacy
        </h2>
        <div className="bg-emvia-yellow/10 rounded-2xl p-5 border border-accent/20">
          <div className="flex items-start gap-3 mb-4">
            <Lock className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your Privacy is Protected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data is stored locally on your device. We never collect personal 
                identifiers like names, emails, or locations. Biometric data is processed 
                anonymously and never shared with third parties.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-xl">
            <Info className="w-4 h-4 mr-2" />
            View Privacy Policy
          </Button>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6 text-center"
      >
        <p className="text-sm text-muted-foreground">Emvia v1.0.0</p>
        <p className="text-xs text-muted-foreground mt-1">
          Your personal stress awareness companion
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default SettingsScreen;
