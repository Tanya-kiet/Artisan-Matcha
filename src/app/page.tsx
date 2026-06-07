"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import MatchaCanvasAnimation from "@/components/MatchaCanvasAnimation";
import LoadingScreen from "@/components/LoadingScreen";
import IngredientSection from "@/components/IngredientSection";
import CraftedDifferently from "@/components/CraftedDifferently";
import ExperienceMetrics from "@/components/ExperienceMetrics";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

// Custom Cursor Tracker
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
};

// Main Hero Beat (First Viewport)
const HeroOverlay = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  // Fades out entirely by 25% scroll
  const opacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.15], [0, -50]);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: useTransform(opacity, (o) => o > 0 ? "auto" : "none") }}
      className="absolute inset-0 flex flex-col justify-end md:justify-center z-30 w-full max-w-[1600px] mx-auto px-6 md:pl-[clamp(40px,8vw,120px)] md:pr-6 pb-12 md:pb-0"
    >
      <div className="max-w-[700px] relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 hidden md:block"
        >
          <span className="text-[#5E8C3B] text-xs font-bold tracking-[0.25em] uppercase">
            Artisan Matcha Latte
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#F4F6F2] mb-6 drop-shadow-2xl leading-[0.9]"
        >
          MATCHA, <br />
          <span className="text-[#F4F6F2]/80 italic">REIMAGINED.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base lg:text-lg font-light text-[#A3AE9E] max-w-sm md:max-w-md mb-8 md:mb-12 leading-relaxed"
        >
          A cinematic intersection of ceremonial-grade Uji matcha, crystalline ice, and velvety cream. Pure ritual meets modern movement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 relative z-40"
        >
          <button className="w-full sm:w-auto min-h-[44px] px-8 py-4 bg-[#5E8C3B] text-[#F4F6F2] text-sm font-bold tracking-wide uppercase rounded-full hover:bg-[#4C7031] transition-colors shadow-lg shadow-[#5E8C3B]/20">
            Order Now
          </button>
          <button className="w-full sm:w-auto min-h-[44px] px-8 py-4 bg-transparent border border-white/20 text-[#F4F6F2] text-sm font-bold tracking-wide uppercase rounded-full hover:bg-white/5 transition-colors glass-panel hidden md:block">
            Join The Ritual
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator positioned safely within margins */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-12 left-6 md:left-[clamp(40px,8vw,120px)] hidden md:flex flex-col items-start text-white/30 z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-4">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
};

// Scrollytelling Beat Component for subsequent beats
const Beat = ({
  scrollProgress,
  start,
  end,
  title,
  subtitle
}: {
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  title: string;
  subtitle: string;
}) => {
  // Map opacity: [start, start + 0.05, end - 0.05, end] -> [0, 1, 1, 0]
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [40, 0, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: useTransform(opacity, (o) => o > 0 ? "auto" : "none") }}
      className="absolute inset-0 flex flex-col justify-end md:justify-center z-10 w-full max-w-[1600px] mx-auto px-6 md:pl-[clamp(40px,8vw,120px)] md:pr-6 pb-24 md:pb-0"
    >
      <div className="max-w-[700px]">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#F4F6F2] mb-6 drop-shadow-2xl leading-[0.9]">
          {title.split(' ').map((word, i, arr) => (
            i === arr.length - 1 ? <span key={i} className="text-[#F4F6F2]/80 italic">{word}</span> : <span key={i}>{word} </span>
          ))}
        </h2>
        <p className="text-base md:text-xl lg:text-2xl font-light text-[#A3AE9E] max-w-sm md:max-w-xl drop-shadow-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Softer spring for smoother, more cinematic interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoaded]);

  return (
    <main className="bg-[#000000] font-sans selection:bg-[#4C7031]/30 min-h-screen">
      <CustomCursor />
      
      <LoadingScreen progress={loadingProgress} isLoaded={isLoaded} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        {/* SCROLLYTELLING CANVAS SECTION - 400vh */}
        <div ref={containerRef} className="relative w-full h-[400vh] bg-[#000000] z-0">
          <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
            
            <MatchaCanvasAnimation 
              scrollProgress={smoothProgress} 
              onProgress={setLoadingProgress}
              onLoadComplete={() => setIsLoaded(true)}
            />

            {/* Subtle dark gradient overlay for text readability on left side */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#000000]/80 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Radial Vignette Mask */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none" 
              style={{ background: 'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.25) 75%, var(--sequence-bg) 100%)' }} 
            />

            {/* Floating particles over the canvas */}
            <div className="absolute inset-0 z-[11] pointer-events-none opacity-40">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "vw",
                    y: Math.random() * 100 + "vh",
                    opacity: Math.random() * 0.5 + 0.1,
                    scale: Math.random() * 2,
                  }}
                  animate={{
                    y: [null, Math.random() * -100 - 50 + "vh"],
                    opacity: [null, 0],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Hero Beat (0 - 15%) */}
            <HeroOverlay scrollProgress={smoothProgress} />

            {/* Scrollytelling Beats */}
            {/* Beat B: 25-45% */}
            <Beat 
              scrollProgress={smoothProgress} 
              start={0.25} end={0.45} 
              title="EXPLOSIVE FLAVOR." 
              subtitle="Meticulously frozen in time." 
            />
            {/* Beat C: 50-70% */}
            <Beat 
              scrollProgress={smoothProgress} 
              start={0.5} end={0.7} 
              title="DYNAMIC FLUIDS." 
              subtitle="Swirling currents of rich cream and vibrant green tea." 
            />
            {/* Beat D: 75-100% */}
            <Beat 
              scrollProgress={smoothProgress} 
              start={0.75} end={1.0} 
              title="TASTE THE ENERGY." 
              subtitle="Order your cold brew ritual today." 
            />
          </div>
        </div>

        {/* ADDITIONAL SECTIONS */}
        <div className="relative z-20 bg-[#000000]">
          <IngredientSection />
          <CraftedDifferently />
          <ExperienceMetrics />
          <Testimonials />
          <CTASection />
          
          {/* DEDICATED STATIC FOOTER */}
          <footer className="relative mt-24 border-t border-white/10 py-12 px-6 md:px-12 bg-[#0B0F08] z-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#F4F6F2]/40 text-xs font-light uppercase tracking-widest">
              <span>© 2026 Tanya Bhadana</span>
              <div className="flex gap-8">
                <a href="#" className="hover:text-[#A3AE9E] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#A3AE9E] transition-colors">Twitter</a>
                <a href="#" className="hover:text-[#A3AE9E] transition-colors">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </main>
  );
}
