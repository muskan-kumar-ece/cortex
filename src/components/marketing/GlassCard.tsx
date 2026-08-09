"use client";

import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

// Extracted from our brand tokens
const GLOW_MAP: Record<string, { orb: string; shadow: string; border: string }> = {
  primary: {
    orb:    "var(--cortex-violet)",
    shadow: "0 0 40px rgba(124,58,237,0.3)",
    border: "rgba(124,58,237,0.5)",
  },
  cyan: {
    orb:    "var(--cortex-cyan)",
    shadow: "0 0 40px rgba(6,182,212,0.3)",
    border: "rgba(6,182,212,0.5)",
  },
  emerald: {
    orb:    "var(--cortex-emerald)",
    shadow: "0 0 40px rgba(16,185,129,0.3)",
    border: "rgba(16,185,129,0.5)",
  },
  none: {
    orb: "transparent", shadow: "none", border: "transparent",
  },
};

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: "tilt" | "glow" | "lift" | "none";
  glowColor?: keyof typeof GLOW_MAP;
  /** Pass inner padding via className instead */
  noPadding?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = "tilt",
  glowColor = "primary",
  noPadding = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = GLOW_MAP[glowColor] ?? GLOW_MAP.primary;

  // 3-D tilt using motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (hoverEffect === "tilt") {
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const motionProps = hoverEffect === "tilt"
    ? { style: { rotateX, rotateY, transformStyle: "preserve-3d" as const } }
    : hoverEffect === "lift"
    ? { whileHover: { y: -8, scale: 1.01, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } } }
    : {};

  return (
    <motion.div
      ref={ref}
      {...motionProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-700",
        // Base Glassmorphism System
        "bg-[var(--glass-bg)] backdrop-blur-2xl",
        "border border-[var(--glass-border)]",
        "shadow-[var(--glass-shadow)]",
        "hover:bg-white/[0.05]",
        className
      )}
      style={{
        ...(hoverEffect === "tilt" ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}),
      }}
    >
      {/* Interactive Spotlight Glow (Follows cursor) */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${colors.orb}, transparent 60%)`,
        }}
      />

      {/* Dynamic hover border glow */}
      <div 
        className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        style={{ borderColor: colors.border }} 
      />

      {/* Premium Inner Specular Reflection */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] pointer-events-none" />

      {/* Internal Grid/Blueprint Texture for density */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Tech Greebles (Corners) */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 rounded-br-2xl pointer-events-none" />

      {/* Top-edge specular highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Hover glow shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ boxShadow: colors.shadow }}
      />

      {/* Content */}
      <div className={cn("relative z-10 h-full flex flex-col", !noPadding && "p-6 md:p-8")}>
        {children}
      </div>
    </motion.div>
  );
}
