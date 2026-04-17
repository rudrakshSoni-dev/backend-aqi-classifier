'use client';

import React from 'react';
import { motion } from 'framer-motion';

const aqiLevels = [
  { level: "GOOD", range: "0–50", color: "bg-green-500", text: "text-green-700", border: "border-green-200", bg: "bg-green-50", impact: "Air quality is considered satisfactory, and air pollution poses little or no risk." },
  { level: "MODERATE", range: "51–100", color: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200", bg: "bg-yellow-50", impact: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people." },
  { level: "UNHEALTHY FOR SENSITIVE PEOPLE", range: "101–150", color: "bg-orange-500", text: "text-orange-700", border: "border-orange-200", bg: "bg-orange-50", impact: "Members of sensitive groups (children, elderly, those with respiratory issues) may experience health effects." },
  { level: "UNHEALTHY", range: "151–200", color: "bg-red-500", text: "text-red-700", border: "border-red-200", bg: "bg-red-50", impact: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects." },
  { level: "VERY UNHEALTHY", range: "201–300", color: "bg-purple-600", text: "text-purple-700", border: "border-purple-200", bg: "bg-purple-50", impact: "Health alert: everyone may experience more serious health effects. Significant risk to public health." },
  { level: "SEVERE", range: "301–500+", color: "bg-red-950", text: "text-red-950", border: "border-red-900", bg: "bg-red-50", impact: "Health warning: emergency conditions. The entire population is more likely to be affected." },
];

export const AqiInfoSection = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">AQI Severity Levels</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Detailed breakdown of health impacts based on the specific Air Quality Index categories.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aqiLevels.map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-2xl border ${item.border} ${item.bg} shadow-sm transition-all`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-white text-[10px] font-black tracking-tighter ${item.color}`}>
                {item.range}
              </span>
              <div className={`w-4 h-4 rounded-full ${item.color} shadow-sm`} />
            </div>
            <h3 className={`text-lg font-black mb-2 leading-tight ${item.text}`}>{item.level}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.impact}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
