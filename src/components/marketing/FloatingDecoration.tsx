"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingDecorationProps {
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  rotation?: number;
}

export function FloatingDecoration({
  className,
  delay = 0,
  duration = 6,
  yOffset = -20,
  rotation = 5,
}: FloatingDecorationProps) {
  return (
    <motion.div
      animate={{ y: [0, yOffset, 0], rotate: [0, rotation, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={cn(
        "absolute rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.2)]",
        className
      )}
    />
  );
}
