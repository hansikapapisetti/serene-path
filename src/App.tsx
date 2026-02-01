import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomeScreen from "./pages/HomeScreen";
import BiometricsScreen from "./pages/BiometricsScreen";
import InsightsScreen from "./pages/InsightsScreen";
import ActionScreen from "./pages/ActionScreen";
import MoodScreen from "./pages/MoodScreen";
import ProgressScreen from "./pages/ProgressScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check consent wrapper
const ConsentGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const hasConsent = localStorage.getItem("emvia-consent");
    if (!hasConsent && location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate, location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <ConsentGuard>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/biometrics" element={<BiometricsScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/action" element={<ActionScreen />} />
            <Route path="/mood" element={<MoodScreen />} />
            <Route path="/progress" element={<ProgressScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConsentGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
