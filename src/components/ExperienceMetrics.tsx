"use client";

import React, { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef(null);
  // Replaced strict negative margin triggers that fail on mobile with simple viewport entry
  const isInView = useInView(ref, { once: true });
  
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
  const metrics = [
    { 
      value: 26, 
      suffix: "+", 
      label: "Hours of Sourcing", 
      desc: "Per batch, ensuring perfect leaf selection." 
    },
    { 
      value: 87, 
      suffix: "%", 
      label: "Ceremonial Grade", 
      desc: "First-harvest, shade-grown excellence." 
    },
    { 
      value: 0, 
      suffix: "", 
      label: "Artificial Additives", 
      desc: "Pure nature, pure sustained energy." 
    }
  ];

  return (
    <section className="w-full h-auto bg-[#050704] py-16 px-6 md:px-24 border-t border-b border-white/[0.08] relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid setup: 1 single column on mobile layout, scales cleanly up to 3 columns on tablet/desktop sizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-left">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${idx !== metrics.length - 1 ? 'border-b border-white/[0.05] pb-6 md:border-b-0 md:pb-0' : ''}`}
            >
              <div className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none flex items-baseline">
                <AnimatedNumber value={metric.value} />
                <span>{metric.suffix}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5E8C3B] mt-2">
                {metric.label}
              </span>
              <p className="text-white/60 text-xs md:text-sm mt-1 max-w-xs">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
