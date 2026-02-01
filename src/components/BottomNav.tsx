import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Activity, Brain, TrendingUp, Settings, Smile } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Activity, label: "Data", path: "/biometrics" },
  { icon: Brain, label: "Insights", path: "/insights" },
  { icon: Smile, label: "Mood", path: "/mood" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-4 pb-safe"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <item.icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
