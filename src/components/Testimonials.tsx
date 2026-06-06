"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "The texture is unlike anything I've experienced. It's not just a drink, it's a daily ritual I look forward to.",
    author: "Elena R.",
    role: "Design Director"
  },
  {
    quote: "Finally, a matcha that doesn't compromise. The energy is clean, sustained, and the flavor profile is breathtaking.",
    author: "Marcus T.",
    role: "Wellness Advocate"
  },
  {
    quote: "It looks like art and tastes even better. You can feel the craftsmanship in every single sip.",
    author: "Sarah L.",
    role: "Creative Founder"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section className="py-32  relative z-20 overflow-hidden" style={{ backgroundColor: "#0B0F08" }} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20" ref={headerRef}>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-[#7BA05A] text-xs font-semibold tracking-[0.3em] uppercase mb-4 block"
        >
          Voices
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-medium text-[#F4F6F2] tracking-tighter"
        >
          The <span className="text-[#A3AE9E] italic">Experience.</span>
        </motion.h2>
      </div>

      <div className="pl-6 md:pl-12 lg:pl-24 flex">
        <motion.div 
          style={{ x }}
          className="flex gap-8 md:gap-12 w-max"
        >
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="w-[85vw] md:w-[600px] flex-shrink-0 flex flex-col justify-between p-10 md:p-16 border border-white/[0.04] glass-panel"
            >
              <div className="mb-12">
                <span className="text-6xl text-[#7BA05A]/40 font-serif leading-none absolute -top-4 -left-2 select-none">&quot;</span>
                <p className="text-2xl md:text-4xl font-light text-[#F4F6F2]/90 leading-tight tracking-tight relative z-10">
                  {item.quote}
                </p>
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-px bg-[#7BA05A]" />
                <div>
                  <h5 className="text-[#F4F6F2] font-medium tracking-wide">{item.author}</h5>
                  <p className="text-[#A3AE9E] text-xs uppercase tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Spacer to ensure the last card can be scrolled fully into view */}
          <div className="w-[10vw] md:w-[200px] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
