'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Flame, Wind, Shield, Leaf, Layout } from 'lucide-react';

const actions = [
  { icon: <Bus size={24} />, title: "Use Public Transport", desc: "Reduce your carbon footprint by opting for buses, trains, or carpooling." },
  { icon: <Flame size={24} />, title: "Avoid Burning Waste", desc: "Open burning of trash releases toxic chemicals and particulate matter." },
  { icon: <Wind size={24} />, title: "Reduce Activity", desc: "Limit vigorous outdoor physical activity when air quality is poor." },
  { icon: <Shield size={24} />, title: "Wear N95 Masks", desc: "Use high-quality masks to filter out fine particulate matter (PM2.5)." },
  { icon: <Leaf size={24} />, title: "Indoor Plants", desc: "Some plants like Snake plants and Spider plants help naturally purify indoor air." },
  { icon: <Layout size={24} />, title: "Close Windows", desc: "Keep windows and doors shut during peak pollution hours to protect indoor air." },
];

export const IndividualActions = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How You Can Help</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Small individual actions can lead to large collective changes in air quality and personal health.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              {action.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-gray-500 text-sm">{action.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
