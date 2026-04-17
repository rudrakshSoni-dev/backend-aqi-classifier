'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertOctagon, Info, Skull } from 'lucide-react';

interface SafetySectionProps {
  label: string;
}

const safetyConfig: Record<string, { color: string; bg: string; icon: React.ReactNode; title: string; precautions: string[] }> = {
  "UNHEALTHY FOR SENSITIVE PEOPLE": {
    color: "bg-orange-500",
    bg: "shadow-orange-500/20",
    icon: <Info size={28} />,
    title: "Sensitivity Alert",
    precautions: [
      "Children and elderly should limit outdoor exertion",
      "People with asthma should keep medicine handy",
      "Reduce prolonged outdoor intensity",
      "Consider wearing a standard mask if sensitive"
    ]
  },
  "UNHEALTHY": {
    color: "bg-red-500",
    bg: "shadow-red-500/20",
    icon: <AlertTriangle size={28} />,
    title: "Health Warning",
    precautions: [
      "Everyone should limit outdoor physical activity",
      "Sensitive groups should avoid all outdoor exertion",
      "Wear N95 masks for outdoor movements",
      "Keep indoor air filtered and windows closed"
    ]
  },
  "VERY UNHEALTHY": {
    color: "bg-purple-600",
    bg: "shadow-purple-500/20",
    icon: <AlertOctagon size={28} />,
    title: "Emergency Health Alert",
    precautions: [
      "Avoid all outdoor activities immediately",
      "Keep windows and doors strictly sealed",
      "Run air purifiers at maximum capacity",
      "Monitor respiratory health closely"
    ]
  },
  "SEVERE": {
    color: "bg-red-950",
    bg: "shadow-red-900/40",
    icon: <Skull size={28} />,
    title: "Critical Danger: Severe Condition",
    precautions: [
      "Remain indoors at all costs",
      "Extreme risk of respiratory distress",
      "Seal all indoor air vents and gaps",
      "Follow local emergency government directives"
    ]
  }
};

export const SafetySection: React.FC<SafetySectionProps> = ({ label }) => {
  const l = label.toUpperCase();
  const config = safetyConfig[l];

  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full mt-8 p-6 ${config.color} rounded-3xl shadow-xl ${config.bg} text-white relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle size={140} />
      </div>
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="p-3 bg-white/20 rounded-2xl">
          {config.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{config.title}</h3>
          <p className="text-white/80 text-sm mb-4 max-w-xl font-medium">
            Air pollution has reached dangerous levels for the "{label}" category. Please follow these mandatory precautions:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wide">
            {config.precautions.map((p, i) => (
              <li key={i} className="flex items-center gap-3 bg-black/10 p-3 rounded-xl border border-white/10">
                <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
