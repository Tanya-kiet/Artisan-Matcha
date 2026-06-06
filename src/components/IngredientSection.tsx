"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ingredients = [
  {
    title: "Stone-Ground Matcha",
    description: "First-harvest, shade-grown Tencha leaves milled slowly on stone granite wheels to maximize chlorophyll richness and pure L-Theanine calm.",
    number: "01"
  },
  {
    title: "Uji Heritage Leaves",
    description: "Sourced straight from multi-generational family estates in Kyoto's elite growing terroirs, harvesting only the tenderest top spring buds.",
    number: "02"
  },
  {
    title: "Velvety Micro-Foam",
    description: "Artisan plant-based and dairy micro-foam formulations textured at precise serving temperatures to enrich the bold, earthy umami notes of green tea.",
    number: "03"
  },
  {
    title: "Artisan Preparation",
    description: "Whisked meticulously to aerate the liquor, creating thousands of micro-bubbles that unlock a clean, sustained energy wave.",
    number: "04"
  }
];

const IngredientCard = ({ item, index }: { item: { title: string, description: string, number: string }, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full flex flex-col bg-[#131A10] border border-white/[0.04] rounded-2xl p-8 hover:border-[#5E8C3B]/50 hover:-translate-y-1 transition-all duration-500 ease-out shadow-xl cursor-pointer"
    >
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-[#5E8C3B] text-xs font-mono tracking-widest mb-4 block">
          {item.number}
        </span>
        <h3 className="text-3xl md:text-4xl font-medium text-[#F4F6F2] tracking-tight mb-4">
          {item.title}
        </h3>
        <p className="text-[#A3AE9E] text-sm leading-relaxed font-light mt-auto">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function IngredientSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section className="w-full h-auto bg-[#000000] py-24 px-8 md:px-16 lg:px-24 relative z-20 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12" ref={sectionRef}>
        
        {/* Clean Typography Block */}
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#5E8C3B]"
          >
            01 / Philosophy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#F4F6F2] tracking-tighter mt-3 leading-none"
          >
            Uncompromising<br />Ingredients.
          </motion.h2>
        </div>

        {/* The card grid MUST start directly here. Absolute maximum spacing offset of 80px under heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {ingredients.map((item, idx) => (
            <IngredientCard key={idx} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
