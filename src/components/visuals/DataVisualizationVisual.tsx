"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const STATIC_NODES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  top: `${(i * 17 + 10) % 90}%`,
  left: `${(i * 29 + 15) % 90}%`,
  duration: 2.5 + (i % 3) * 0.5,
  delay: (i % 4) * 0.4,
}));

export function DataVisualizationVisual({ className }: { className?: string }) {
  const [nodes] = useState(STATIC_NODES);

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-background rounded-3xl border border-border-strong p-8 flex items-center justify-center", className)}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-sm aspect-square">
        {/* Concentric Circles */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{ scale: ring * 0.3 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 * ring, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
          </motion.div>
        ))}

        {/* Center Data Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-surface border border-border-strong flex items-center justify-center z-20">
          <div className="w-8 h-8 rounded-full bg-primary/30 animate-pulse-glow flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
        </div>

        {/* Floating Data Points */}
        {nodes.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: p.top,
              left: p.left,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
