"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Clock, Users, ArrowRight } from "lucide-react";

export interface KnowledgeHeroXLProps {
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  metrics?: { label: string; value: string; }[];
  visualType?: "dashboard" | "architecture" | "network" | "data";
}

import { EnterpriseDashboardVisual } from "@/components/visuals/EnterpriseDashboardVisual";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";
import { AiNetworkVisual } from "@/components/visuals/AiNetworkVisual";
import { DataVisualizationVisual } from "@/components/visuals/DataVisualizationVisual";

export function KnowledgeHeroXL({ 
  title, 
  subtitle, 
  client, 
  industry, 
  duration, 
  teamSize,
  metrics,
  visualType = "architecture"
}: KnowledgeHeroXLProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden border-b border-border-strong bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.1),transparent_50%)] z-0" />
      <div className="absolute inset-0 bg-[url('/blueprint-pattern.png')] opacity-[0.03] bg-repeat z-0 mix-blend-overlay" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: 60% */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="lg:col-span-7 space-y-8"
          >
            <motion.div variants={slideUp} className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                {industry}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-foreground text-xs font-medium uppercase tracking-widest">
                Client: {client}
              </span>
            </motion.div>

            <motion.h1 variants={slideUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
              {title}
            </motion.h1>

            <motion.p variants={slideUp} className="text-lg md:text-xl text-on-surface-muted max-w-2xl leading-relaxed font-light">
              {subtitle}
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-on-surface-muted">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{duration}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-muted">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{teamSize}</span>
              </div>
            </motion.div>

            {metrics && metrics.length > 0 && (
              <motion.div variants={slideUp} className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                {metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl font-bold text-foreground">{m.value}</span>
                    <span className="text-xs text-on-surface-muted uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div variants={slideUp} className="pt-4">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg overflow-hidden transition-transform active:scale-95">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  Read Case Study <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: 40% (Dashboard / Architecture Preview) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-border-strong bg-surface/50 backdrop-blur-sm group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
              
              <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                {visualType === "dashboard" && <EnterpriseDashboardVisual />}
                {visualType === "architecture" && <CloudArchitectureVisual />}
                {visualType === "network" && <AiNetworkVisual />}
                {visualType === "data" && <DataVisualizationVisual />}
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 p-6 bg-background/90 backdrop-blur-md border border-border-strong rounded-xl shadow-2xl">
                <div className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">Status</div>
                <div className="text-xl font-bold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  System Operational
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
