"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrainCircuit, Cpu, Network } from "lucide-react";

export function AiNetworkVisual({ className }: { className?: string }) {
  const nodes = [
    { id: 1, x: "20%", y: "30%", icon: Cpu, delay: 0 },
    { id: 2, x: "80%", y: "20%", icon: Network, delay: 0.2 },
    { id: 3, x: "50%", y: "50%", icon: BrainCircuit, delay: 0.4 },
    { id: 4, x: "30%", y: "70%", icon: Network, delay: 0.6 },
    { id: 5, x: "70%", y: "80%", icon: Cpu, delay: 0.8 },
  ];

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-background rounded-3xl border border-border-strong", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15)_0%,transparent_70%)]" />
      
      {/* Animated Paths */}
      <svg className="absolute inset-0 w-full h-full stroke-border-strong" style={{ fill: "none", strokeWidth: 1, strokeDasharray: "4 4" }}>
        <motion.path 
          d="M 20% 30% L 50% 50% L 80% 20%" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path 
          d="M 30% 70% L 50% 50% L 70% 80%" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path 
          d="M 20% 30% L 30% 70%" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: node.delay, type: "spring" }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow" />
              <div className="w-12 h-12 rounded-full border border-primary bg-surface/80 backdrop-blur-md flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
