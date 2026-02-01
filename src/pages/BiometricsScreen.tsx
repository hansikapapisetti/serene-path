import { motion } from "framer-motion";
import { Heart, Activity, Thermometer, Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";
import BottomNav from "@/components/BottomNav";

const heartRateData = [
  { time: "6AM", value: 62 },
  { time: "8AM", value: 75 },
  { time: "10AM", value: 80 },
  { time: "12PM", value: 72 },
  { time: "2PM", value: 78 },
  { time: "4PM", value: 85 },
  { time: "6PM", value: 70 },
];

const hrvData = [
  { time: "6AM", value: 55 },
  { time: "8AM", value: 48 },
  { time: "10AM", value: 42 },
  { time: "12PM", value: 50 },
  { time: "2PM", value: 45 },
  { time: "4PM", value: 38 },
  { time: "6PM", value: 52 },
];

const tempData = [
  { time: "6AM", value: 36.2 },
  { time: "8AM", value: 36.5 },
  { time: "10AM", value: 36.8 },
  { time: "12PM", value: 36.6 },
  { time: "2PM", value: 36.9 },
  { time: "4PM", value: 37.0 },
  { time: "6PM", value: 36.7 },
];

const conductanceData = [
  { time: "6AM", value: 2.1 },
  { time: "8AM", value: 3.5 },
  { time: "10AM", value: 4.2 },
  { time: "12PM", value: 3.0 },
  { time: "2PM", value: 3.8 },
  { time: "4PM", value: 5.1 },
  { time: "6PM", value: 2.8 },
];

const metrics = [
  { 
    icon: Heart, 
    label: "Heart Rate", 
    value: "72", 
    unit: "BPM",
    data: heartRateData,
    color: "#ef4444",
    bgColor: "bg-red-50"
  },
  { 
    icon: Activity, 
    label: "HRV", 
    value: "48", 
    unit: "ms",
    data: hrvData,
    color: "#3b82f6",
    bgColor: "bg-blue-50"
  },
  { 
    icon: Thermometer, 
    label: "Skin Temp", 
    value: "36.7", 
    unit: "°C",
    data: tempData,
    color: "#f97316",
    bgColor: "bg-orange-50"
  },
  { 
    icon: Zap, 
    label: "Conductance", 
    value: "3.2", 
    unit: "μS",
    data: conductanceData,
    color: "#eab308",
    bgColor: "bg-yellow-50"
  },
];

const BiometricsScreen = () => {
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
        <h1 className="text-2xl font-display font-bold text-primary-foreground">
          Biometric Data
        </h1>
        <p className="text-primary-foreground/80 mt-1">
          Today's measurements and trends
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="px-6 py-6 space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{metric.label}</h3>
                  <p className="text-xs text-muted-foreground">Last 12 hours</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
            </div>
            <div className="h-32 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metric.data}>
                  <defs>
                    <linearGradient id={`gradient-${metric.label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metric.color}
                    strokeWidth={2}
                    fill={`url(#gradient-${metric.label})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default BiometricsScreen;
