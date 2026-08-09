"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function HeroBadge({ children, className, animate = true }: HeroBadgeProps) {
  const content = (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide",
        "border border-white/10 bg-white/5 backdrop-blur-md text-foreground/80",
        "shadow-[0_0_20px_rgba(124,58,237,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {/* Pulsing brand dot */}
      <span className="relative flex h-1.5 w-1.5 mr-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: "rgba(124,58,237,0.8)" }}
        />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5"
          style={{ background: "rgba(124,58,237,1)" }}
        />
      </span>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.div>
  );
}
