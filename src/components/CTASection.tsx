"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative rounded-full overflow-hidden group ${className}`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-40  relative z-20 border-t border-white/[0.03] flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#0B0F08" }}>
      
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4C7031]/5 rounded-full blur-[150px] mix-blend-screen" 
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-9xl font-medium text-[#F4F6F2] tracking-tighter mb-12"
        >
          TASTE THE <br className="hidden md:block" />
          FUTURE OF <span className="text-[#A3AE9E] italic">MATCHA.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <MagneticButton className="px-10 py-5 bg-white text-black text-sm font-medium tracking-wide uppercase hover:bg-white/90">
            Order Now
          </MagneticButton>
          
          <MagneticButton className="px-10 py-5 bg-transparent border border-white/20 text-[#F4F6F2] text-sm font-medium tracking-wide uppercase hover:bg-white/5 glass-panel">
            Join the Ritual
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Footer minimal styling */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-0 w-full flex justify-between px-12 text-[#F4F6F2]/30 text-xs font-light uppercase tracking-widest"
      >
        <span>© 2026 Artisan Matcha</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#A3AE9E] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#A3AE9E] transition-colors">Twitter</a>
        </div>
      </motion.div>
    </section>
  );
}
