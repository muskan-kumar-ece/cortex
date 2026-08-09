"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cloud, Database, Server } from "lucide-react";

export function CloudArchitectureVisual({ className }: { className?: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
  };

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-background rounded-3xl border border-border-strong p-8 flex flex-col justify-between", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative z-10 h-full flex flex-col justify-between">
        
        {/* Load Balancer / Edge */}
        <motion.div variants={item} className="w-full h-16 rounded-xl border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <Cloud className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-mono text-indigo-300">Global Edge Network</span>
        </motion.div>

        {/* Connection lines */}
        <div className="flex-1 flex justify-center py-4 relative">
          <div className="w-px h-full bg-indigo-500/20 relative">
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Compute Layer */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} variants={item} className="h-24 rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md flex flex-col items-center justify-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: "200ms" }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection lines */}
        <div className="flex-1 flex justify-center py-4">
          <div className="w-px h-full bg-emerald-500/20" />
        </div>

        {/* Data Layer */}
        <motion.div variants={item} className="w-full h-20 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md flex items-center justify-center gap-4">
          <Database className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-sm font-mono text-amber-300">Distributed Datastore</div>
            <div className="w-32 h-1.5 bg-amber-500/20 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-amber-400 rounded-full"
                animate={{ width: ["30%", "70%", "40%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
