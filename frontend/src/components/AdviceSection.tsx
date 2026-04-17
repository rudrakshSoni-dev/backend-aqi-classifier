'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Activity } from 'lucide-react';

interface AdviceSectionProps {
  label: string;
}

const adviceData: Record<string, { health: string; safety: string; actions: string }> = {
  "GOOD": {
    health: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    safety: "No specific precautions needed. Enjoy outdoor activities freely.",
    actions: "Maintain your healthy lifestyle and continue protecting the environment."
  },
  "MODERATE": {
    health: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern.",
    safety: "Sensitive individuals should consider reducing heavy outdoor exertion.",
    actions: "Keep an eye on air quality updates if you are sensitive to pollution."
  },
  "UNHEALTHY FOR SENSITIVE PEOPLE": {
    health: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    safety: "Sensitive groups (children, elderly, those with heart/lung disease) should limit outdoor exposure.",
    actions: "Reduce intense outdoor activities. Consider wearing a mask if you feel discomfort."
  },
  "UNHEALTHY": {
    health: "Everyone may begin to experience health effects. Serious for sensitive groups.",
    safety: "Avoid prolonged outdoor exertion. Wear N95 masks for necessary outdoor movements.",
    actions: "Stay indoors as much as possible. Use high-efficiency air purifiers if available."
  },
  "VERY UNHEALTHY": {
    health: "Health alert: everyone may experience more serious health effects. High risk of respiratory issues.",
    safety: "Strictly avoid all outdoor activities. Keep all windows and doors closed tightly.",
    actions: "Use indoor air purifiers at max settings. Monitor health for any breathing difficulty."
  },
  "SEVERE": {
    health: "Emergency conditions. Entire population is likely to be seriously affected.",
    safety: "Absolute avoidance of all outdoor physical activity. Complete indoor isolation required.",
    actions: "Follow emergency government instructions. Seek medical help immediately for respiratory distress."
  }
};

export const AdviceSection: React.FC<AdviceSectionProps> = ({ label }) => {
  const l = label.toUpperCase();
  const advice = adviceData[l] || adviceData["MODERATE"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-red-50 text-red-500 rounded-2xl mb-4">
          <Heart size={24} />
        </div>
        <h4 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Health Effects</h4>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">{advice.health}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl mb-4">
          <Shield size={24} />
        </div>
        <h4 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Safety Measures</h4>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">{advice.safety}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-green-50 text-green-500 rounded-2xl mb-4">
          <Activity size={24} />
        </div>
        <h4 className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-widest">Recommended Actions</h4>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">{advice.actions}</p>
      </div>
    </motion.div>
  );
};
