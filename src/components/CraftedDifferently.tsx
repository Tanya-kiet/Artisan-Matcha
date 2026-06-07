"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const comparisonData = [
  {
    id: "traditional",
    label: "The Traditional Way",
    points: [
      "Powdery texture",
      "Inconsistent flavor",
      "Time-consuming prep",
      "Quick energy spike & crash"
    ]
  },
  {
    id: "modern",
    label: "The Artisan Way",
    points: [
      "Silky micro-foam texture",
      "Perfectly balanced profile",
      "Ready instantly",
      "Sustained calm energy"
    ]
  }
];

export default function CraftedDifferently() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("modern");

  return (
    <section className="py-12 md:py-20 lg:py-32 px-6 md:px-12 lg:px-24  relative z-20 border-t border-white/[0.03]" style={{ backgroundColor: "#0B0F08" }}>
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="text-center mb-12 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-[#7BA05A] text-xs font-semibold tracking-[0.3em] uppercase mb-4 block"
          >
            Evolution
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#F4F6F2] tracking-tighter"
          >
            Crafted <span className="text-[#A3AE9E] italic">Differently.</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Toggle buttons */}
          <div className="flex justify-center mb-12 md:mb-16 relative z-10 w-full">
            <div className="flex w-full md:w-auto border border-[#F4F6F2]/[0.04] rounded-full p-1 shadow-lg" style={{ backgroundColor: "#0B0F08" }}>
              {comparisonData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-1/2 md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-semibold transition-colors duration-300 ${
                    activeTab === tab.id ? "text-[#F4F6F2]" : "text-[#A3AE9E] hover:text-[#F4F6F2]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#5E8C3B] shadow-lg shadow-[#5E8C3B]/20 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[300px] border border-white/[0.04] rounded-3xl glass-panel p-6 md:p-12 overflow-hidden">
            {/* Animated background pulse based on active tab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-[#4C7031]/5 to-transparent pointer-events-none"
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {comparisonData.map((tab) => (
                tab.id === activeTab && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <ul className="space-y-8">
                      {tab.points.map((point, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                          className="flex items-center gap-4 md:gap-6"
                        >
                          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-white/5 shrink-0">
                            {tab.id === "modern" ? (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                                className="w-2 h-2 rounded-full bg-[#7BA05A]" 
                              />
                            ) : (
                              <div className="w-2 h-[2px] bg-white/30" />
                            )}
                          </div>
                          <span className={`text-base md:text-lg lg:text-xl font-light ${tab.id === "modern" ? "text-[#F4F6F2]/90" : "text-[#A3AE9E]"}`}>
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Animated decorative lines */}
            <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-20">
               {[...Array(5)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   animate={isInView ? { height: "100%" } : { height: 0 }}
                   transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
                   className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-[#7BA05A] to-transparent"
                   style={{ left: `${(i + 1) * 20}%` }}
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
