"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Database, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function EnterpriseDashboardVisual({ className }: { className?: string }) {
  // Stagger children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
  };

  return (
    <div className={cn("w-full h-full relative perspective-1000", className)}>
      {/* Glow Behind Dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* 3D Tilted Dashboard Container */}
      <motion.div 
        initial={{ rotateX: 45, rotateY: -15, rotateZ: 5, scale: 0.8, opacity: 0 }}
        animate={{ rotateX: 15, rotateY: -25, rotateZ: 10, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full aspect-[4/3] rounded-2xl border border-border-strong bg-background/80 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* macOS Style Header */}
        <div className="h-10 border-b border-border-strong bg-surface/50 flex items-center px-4 gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="ml-auto w-48 h-5 rounded bg-background/50 border border-border" />
        </div>

        {/* Dashboard Body */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show"
          className="flex-1 p-4 grid grid-cols-12 gap-4"
        >
          {/* Sidebar */}
          <div className="col-span-3 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} variants={item} className="h-8 rounded-md bg-surface border border-border flex items-center px-2 gap-2">
                <div className="w-4 h-4 rounded-full bg-primary/20" />
                <div className="h-2 w-16 bg-on-surface-faint rounded" />
              </motion.div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 grid grid-cols-2 gap-4">
            
            {/* Top Stat Cards */}
            <motion.div variants={item} className="col-span-1 p-4 rounded-xl bg-surface border border-border flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">+24.5%</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1.2M</div>
                <div className="text-xs text-on-surface-muted">Active Sessions</div>
              </div>
            </motion.div>

            <motion.div variants={item} className="col-span-1 p-4 rounded-xl bg-surface border border-border flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">-12ms</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">42ms</div>
                <div className="text-xs text-on-surface-muted">Avg Latency</div>
              </div>
            </motion.div>

            {/* Large Chart Area */}
            <motion.div variants={item} className="col-span-2 row-span-2 p-4 rounded-xl bg-surface border border-border relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-4 h-4 text-on-surface-muted" />
                <div className="h-3 w-24 bg-on-surface-faint rounded" />
              </div>
              
              {/* Animated Bars */}
              <div className="absolute bottom-4 left-4 right-4 h-32 flex items-end justify-between gap-1 sm:gap-2">
                {[40, 25, 60, 30, 80, 45, 90, 55, 100, 70, 85, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                    className={cn(
                      "w-full rounded-t-sm",
                      i === 8 ? "bg-primary" : "bg-primary/20 hover:bg-primary/40 transition-colors"
                    )}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bottom Widgets */}
            <motion.div variants={item} className="col-span-1 h-20 rounded-xl bg-surface border border-border p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Secure</div>
                <div className="text-xs text-on-surface-muted">Zero threats detected</div>
              </div>
            </motion.div>

            <motion.div variants={item} className="col-span-1 h-20 rounded-xl bg-surface border border-border p-3 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 relative z-10">
                <Zap className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <div className="text-sm font-bold text-foreground">Optimized</div>
                <div className="text-xs text-on-surface-muted">Edge routing active</div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Ambient Front Glow */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
