"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export interface VisualAssetProps {
  src: string;
  alt: string;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
}

export function VisualAsset({ 
  src, 
  alt, 
  className, 
  glowColor = "rgba(124,58,237,0.3)",
  interactive = true 
}: VisualAssetProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), { stiffness: 400, damping: 40 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={interactive ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      className={cn("group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700", className)}
    >
      {/* Glow shadow behind image */}
      <div 
        className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl -z-10 pointer-events-none"
        style={{ backgroundColor: glowColor.replace(/[\d.]+\)$/g, '0.4)') }} // Increase opacity for shadow
      />

      <div className="relative w-full h-full border border-white/10 rounded-2xl overflow-hidden bg-black/50">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={100}
        />
        
        {/* Subtle overlay gradient to blend into dark backgrounds better */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

        {/* Specular Edge Highlight */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-none" />

        {/* Interactive Spotlight */}
        {interactive && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
            style={{
              background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
