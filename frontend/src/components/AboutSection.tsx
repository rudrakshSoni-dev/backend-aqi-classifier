'use client';

import React from 'react';
import { motion } from 'framer-motion';

const team = [
  { name: "Abhay Singh" },
  { name: "Rudraksh Soni" },
  { name: "Arka Prabha Bauri" },
];

export const AboutSection = () => {
  return (
    <section className="py-20 border-t border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h2>
        <p className="text-gray-500">The creators behind AI-Based AQI Predictor.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-64 p-8 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              {member.name.charAt(0)}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
            <p className="text-blue-500 text-sm font-medium mt-1">Project Contributor</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
