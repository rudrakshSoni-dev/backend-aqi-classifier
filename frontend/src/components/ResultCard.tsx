'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResultCardProps {
  label: string;
  confidence: number;
}

const getAqiColor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('good')) return 'text-green-600 bg-green-50 border-green-200';
  if (l.includes('satisfactory')) return 'text-lime-600 bg-lime-50 border-lime-200';
  if (l.includes('moderate')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  if (l.includes('poor') && !l.includes('very')) return 'text-orange-600 bg-orange-50 border-orange-200';
  if (l.includes('very poor') || l.includes('unhealthy')) return 'text-red-600 bg-red-50 border-red-200';
  if (l.includes('severe') || l.includes('hazardous')) return 'text-red-900 bg-red-100 border-red-900/20';
  return 'text-gray-600 bg-gray-50 border-gray-200';
};

const getBadgeColor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('good')) return 'bg-green-500';
  if (l.includes('satisfactory')) return 'bg-lime-500';
  if (l.includes('moderate')) return 'bg-yellow-500';
  if (l.includes('poor') && !l.includes('very')) return 'bg-orange-500';
  if (l.includes('very poor') || l.includes('unhealthy')) return 'bg-red-500';
  if (l.includes('severe') || l.includes('hazardous')) return 'bg-red-950'; // Maroon style
  return 'bg-blue-500';
};

export const ResultCard: React.FC<ResultCardProps> = ({ label, confidence }) => {
  const confidencePercent = Math.round(confidence * 100);
  const colorClasses = getAqiColor(label);
  const badgeColor = getBadgeColor(label);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className={cn(
        "rounded-3xl border-2 p-8 shadow-xl transition-all duration-500",
        colorClasses
      )}>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className={cn("p-6 rounded-full shadow-inner", badgeColor, "bg-opacity-10")}>
              <div className={cn("p-4 rounded-full text-white shadow-lg", badgeColor)}>
                <AlertCircle size={48} />
              </div>
            </div>
            <motion.div 
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-gray-800"
            >
              <Info size={20} />
            </motion.div>
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-2 block">
              AI Prediction Result
            </span>
            <h2 className="text-4xl font-black mb-4 tracking-tight">{label}</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="opacity-70 uppercase tracking-wider">Confidence Level</span>
                <span>{confidencePercent}%</span>
              </div>
              <div className="w-full bg-black/5 rounded-full h-4 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${confidencePercent}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={cn("h-full rounded-full shadow-sm", badgeColor)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
