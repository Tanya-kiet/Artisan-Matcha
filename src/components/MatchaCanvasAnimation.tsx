"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface Props {
  scrollProgress: MotionValue<number>;
  onProgress: (progress: number) => void;
  onLoadComplete: () => void;
}

const FRAME_COUNT = 120;

export default function MatchaCanvasAnimation({ scrollProgress, onProgress, onLoadComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const frameIndex = useTransform(scrollProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let loaded = 0;
    const imgArray: HTMLImageElement[] = [];
    
    // We start loading frames immediately
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.jpg`; // Changed to jpg based on directory contents
      img.onload = () => {
        loaded++;
        onProgress((loaded / FRAME_COUNT) * 100);
        if (loaded === FRAME_COUNT) {
          setIsLoaded(true);
          onLoadComplete();
        }
      };
      // Error handling to prevent infinite loading if a frame is missing
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        loaded++;
        onProgress((loaded / FRAME_COUNT) * 100);
        if (loaded === FRAME_COUNT) {
          setIsLoaded(true);
          onLoadComplete();
        }
      }
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [onProgress, onLoadComplete]);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame];
      
      if (img && img.complete) {
        const { width, height } = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, width, height);

        // Calculate aspect ratio covering for full bleed background
        const hRatio = width / img.width;
        const vRatio = height / img.height;
        // 1. Start with contain scaling to ensure the entire composition is visible
        const containRatio = Math.min(hRatio, vRatio); 
        
        // Mobile layout detection
        const isMobile = width < 768;
        
        // 2. Apply a slight zoom to make it premium but not oversized
        // For mobile, we use a smaller zoom to ensure cup/splash stay in view
        const zoomFactor = isMobile ? 1.05 : 1.15;
        const ratio = containRatio * zoomFactor; 
        
        // 3. Shift the composition to the right to leave safe space for text on the left
        // On mobile, keep it centered since text overlays on bottom/middle
        const rightShift = isMobile ? 0 : width * 0.15;
        const centerShift_x = ((width - img.width * ratio) / 2) + rightShift;
        const centerShift_y = (height - img.height * ratio) / 2;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    
    // Also re-render when frameIndex changes, framer motion handles values outside of React render cycle
    const unsubscribe = frameIndex.on("change", render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 w-full h-full object-cover mix-blend-screen brightness-[1.02] contrast-[1.05] pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
