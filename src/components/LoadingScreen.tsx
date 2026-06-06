import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center " style={{ backgroundColor: "#0B0F08" }}
        >
          {/* Subtle noise over loading screen */}
          <div className="absolute inset-0 bg-noise pointer-events-none opacity-50 mix-blend-overlay"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="relative w-16 h-16 mb-8"
            >
              <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
              <div 
                className="absolute inset-0 rounded-full border-t border-[#4C7031]" 
              />
            </motion.div>

            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-[#4C7031]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-[#F4F6F2]/40 text-xs font-light tracking-[0.3em] uppercase">
                Preparing Experience
              </p>
              <p className="text-[#A3AE9E] font-mono text-sm">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
