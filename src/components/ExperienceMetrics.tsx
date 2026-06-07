"use client";

import React, { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  const display = useTransform(spring, (current) => Math.round(current));

  return <motion.span ref={ref}>{display}</motion.span>;
};

export default function ExperienceMetrics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const metrics = [
    { value: 30, suffix: "+ Hours", label: "Sourcing Per Batch" },
    { value: 100, suffix: "%", label: "Ceremonial Grade" },
    { value: 0, suffix: " Additives", label: "Pure Nature Energy" }
  ];

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 relative z-20 pb-12 md:pb-24" style={{ backgroundColor: "#0B0F08" }}>
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 md:py-16 border-t border-b border-white/[0.04]">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F4F6F2] tracking-tight leading-none flex items-baseline gap-1">
                <AnimatedNumber value={metric.value} />
                <span className="text-4xl md:text-5xl lg:text-6xl">{metric.suffix}</span>
              </div>
              <div className="text-sm text-[#A3AE9E] tracking-wider uppercase mt-4 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
