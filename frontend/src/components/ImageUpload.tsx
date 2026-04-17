'use client';

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onFileSelect, 
  selectedFile, 
  onClear 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group h-80 sm:h-[400px]"
          >
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="absolute top-4 right-4 p-2 bg-white/90 text-red-500 rounded-2xl shadow-lg hover:bg-white transition-colors z-20"
            >
              <X size={20} strokeWidth={3} />
            </motion.button>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
               <p className="text-white font-bold text-lg flex items-center gap-2">
                 <Sparkles className="text-yellow-400" size={20} />
                 Ready for AI Analysis
               </p>
               <div className="relative">
                 <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                   Change Image
                 </button>
                 <input 
                   type="file" 
                   className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                   onChange={handleFileChange} 
                   accept="image/*" 
                 />
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-4 border-dashed rounded-[40px] p-12 sm:p-20 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden",
              isDragging 
                ? "border-blue-500 bg-blue-50/50 scale-[1.02]" 
                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/20 bg-white"
            )}
          >
            {/* Animated background pulse */}
            {isDragging && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-blue-400/5 animate-pulse"
              />
            )}
            
            <div className="relative mb-8 pointer-events-none">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl text-white relative z-10"
              >
                <Upload size={40} strokeWidth={2.5} />
              </motion.div>
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            </div>

            <div className="text-center relative z-10 pointer-events-none">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-3 tracking-tight">
                Upload Sky Image
              </h3>
              <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
                Drag and drop your photo here or click to browse files
              </p>
              
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-900/20 hover:bg-blue-600 transition-colors">
                <ImageIcon size={20} />
                Select Photo
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-8 left-8 flex gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-blue-200" />
              <div className="w-2 h-2 rounded-full bg-indigo-100" />
            </div>

            {/* The Input is now at the very top of the stack */}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-50"
              onChange={handleFileChange}
              accept="image/*"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
