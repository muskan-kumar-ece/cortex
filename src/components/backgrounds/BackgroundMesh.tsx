"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BackgroundMesh({ className, opacity = 0.5 }: { className?: string, opacity?: number }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)} style={{ opacity }}>
      {/* Dark Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated Mesh Gradients */}
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(2%, -3%) scale(1.05)",
            "translate(-3%, 4%) scale(0.95)",
            "translate(0%, 0%) scale(1)"
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-30 mix-blend-screen blur-[120px] bg-[radial-gradient(ellipse_at_center,var(--cortex-violet),transparent_70%)]"
      />
      
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(-4%, 2%) scale(0.98)",
            "translate(3%, -4%) scale(1.03)",
            "translate(0%, 0%) scale(1)"
          ]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[10%] w-[60%] h-[80%] rounded-full opacity-20 mix-blend-screen blur-[120px] bg-[radial-gradient(ellipse_at_center,var(--cortex-cyan),transparent_60%)]"
      />
      
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(5%, 5%) scale(1.1)",
            "translate(-5%, -5%) scale(0.9)",
            "translate(0%, 0%) scale(1)"
          ]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full opacity-15 mix-blend-screen blur-[100px] bg-[radial-gradient(ellipse_at_center,var(--cortex-emerald),transparent_70%)]"
      />

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] mask-image-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </div>
  );
}
