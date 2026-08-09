"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Maximize2 } from "lucide-react";
import Image from "next/image";

export interface KnowledgeDashboardProps {
  dashboard: {
    imageUrl: string;
    alt: string;
    hotspots?: { x: number; y: number; label: string; }[];
  };
}

export function KnowledgeDashboard({ dashboard }: KnowledgeDashboardProps) {
  if (!dashboard) return null;

  return (
    <section className=" md: border-b border-border/50 bg-background overflow-hidden">
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={slideUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Enterprise Interface
            </h2>
            <p className="text-lg text-on-surface-muted font-light">
              A high-performance SaaS dashboard designed for complex operational workflows.
            </p>
          </motion.div>

          {/* Interactive Dashboard Container */}
          <motion.div variants={slideUp} className="relative group mx-auto max-w-6xl">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
            
            <div className="relative z-10 rounded-2xl md:rounded-[2rem] overflow-hidden border border-border-strong bg-surface shadow-2xl transition-transform duration-700 hover:scale-[1.01] hover:shadow-primary/20">
              
              {/* Fake Browser Chrome */}
              <div className="h-12 border-b border-border-strong bg-surface-elevated flex items-center px-6 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-32.5 rounded-md bg-background/50 border border-border-strong text-xs text-on-surface-muted truncate max-w-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> secure-platform.app
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/9] w-full bg-surface-elevated/50 overflow-hidden">
                <Image
                  src={dashboard.imageUrl} 
                  alt={dashboard.alt} 
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Hotspots */}
                {dashboard.hotspots && dashboard.hotspots.map((spot, idx) => (
                  <div 
                    key={idx}
                    className="absolute z-20 group/spot"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 animate-ping absolute inset-0" />
                      <div className="w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max max-w-xs px-4 bg-surface-elevated border border-border-strong rounded-lg shadow-xl opacity-0 group-hover/spot:opacity-100 group-hover/spot:-translate-y-2 transition-all duration-300 pointer-events-none">
                        <p className="text-sm font-medium text-foreground">{spot.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground shadow-xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
