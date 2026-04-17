'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Wind, RefreshCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';
import { ResultCard } from '@/components/ResultCard';
import { AdviceSection } from '@/components/AdviceSection';
import { AqiInfoSection } from '@/components/AqiInfoSection';
import { IndividualActions } from '@/components/IndividualActions';
import { SafetySection } from '@/components/SafetySection';
import { AboutSection } from '@/components/AboutSection';
import { predictAQI, type PredictResponse } from '@/lib/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
    await performPrediction(selectedFile);
  };

  const performPrediction = async (fileToPredict: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await predictAQI(fileToPredict);
      setResult(data);
      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100 to-purple-50 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-green-50 to-blue-50 blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Landing Section */}
        <header className="pt-20 pb-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-8 border border-blue-100"
            >
              <ShieldCheck size={18} />
              AI-Powered Vision System
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6"
            >
              AI-Based <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AQI Predictor</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Harness the power of Deep Learning to predict Air Quality Index instantly from simple sky images. Fast, accurate, and accessible.
            </motion.p>

            {/* Upload CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ImageUpload 
                onFileSelect={handleFileSelect} 
                selectedFile={file} 
                onClear={() => { setFile(null); setResult(null); }} 
              />
            </motion.div>
          </div>
        </header>

        {/* Prediction & Advice Section */}
        <AnimatePresence>
          {(isLoading || result || error) && (
            <section id="result-section" className="py-20 px-4 bg-white/50 backdrop-blur-sm border-y border-gray-100">
              <div className="max-w-5xl mx-auto">
                
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <div className="relative">
                      <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                      <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 animate-pulse" />
                    </div>
                    <p className="mt-6 text-lg font-bold text-gray-700 animate-pulse">Processing Environmental Data...</p>
                  </motion.div>
                )}

                {result && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-gray-800 mb-2">Analysis Complete</h2>
                      <p className="text-gray-500">Based on the visual parameters of your uploaded image.</p>
                    </div>

                    <ResultCard label={result.label} confidence={result.confidence} />
                    
                    <SafetySection label={result.label} />
                    
                    <AdviceSection label={result.label} />

                    <div className="flex justify-center mt-12">
                      <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                      >
                        <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        New Prediction
                      </button>
                    </div>
                  </motion.div>
                )}

                {error && !isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto p-8 bg-red-50 border-2 border-red-100 rounded-[32px] text-center"
                  >
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wind size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Analysis Interrupted</h3>
                    <p className="text-red-600/70 mb-6 font-medium">{error}</p>
                    <button 
                      onClick={() => file && performPrediction(file)}
                      className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors"
                    >
                      Retry Analysis
                    </button>
                  </motion.div>
                )}
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* Info & Actions Grid */}
        <div className="max-w-6xl mx-auto px-4 space-y-32 py-32">
          <AqiInfoSection />
          <IndividualActions />
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto px-4 pb-32">
          <AboutSection />
        </div>

        {/* Footer */}
        <footer className="bg-gray-950 py-20 px-4 text-center text-gray-500 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-3 text-white font-black text-2xl mb-6">
              <Wind className="text-blue-500" />
              AQI VISION
            </div>
            <p className="max-w-md mx-auto mb-10 text-gray-400">
              Leveraging advanced artificial intelligence to build a more sustainable and informed future for environmental monitoring.
            </p>
            <div className="flex justify-center gap-8 mb-12">
              {['Home', 'Methodology', 'API', 'Docs'].map(link => (
                <a key={link} href="#" className="font-bold hover:text-white transition-colors">{link}</a>
              ))}
            </div>
            <p className="text-sm opacity-50">
              © 2026 AI-Based AQI Predictor. Developed with ❤️ for Environmental Awareness.
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
        </footer>
      </div>
    </div>
  );
}
