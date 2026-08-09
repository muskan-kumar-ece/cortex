"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ArrowRight, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

export interface KnowledgeDigitalRoadmapProps {
  phases: {
    phase: string;
    title: string;
    description: string;
  }[];
}

export function KnowledgeDigitalRoadmap({ phases }: KnowledgeDigitalRoadmapProps) {
  if (!phases || phases.length === 0) return null;

  return (
    <section className=" border-b border-border/50">
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={slideUp}>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Digital Transformation Roadmap
              </h2>
            </div>
            <p className="text-on-surface-muted max-w-2xl">
              A strategic, phased approach to modernizing operations and deploying new capabilities.
            </p>
          </motion.div>

          <div className="relative">
            {/* Horizontal connecting line (hidden on mobile) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-border-strong -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
              {phases.map((phase, idx) => (
                <motion.div key={idx} variants={slideUp} className="relative">
                  {/* Phase Marker */}
                  <div className="hidden lg:flex absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                  
                  <GlassCard className="h-full p-6 border-border-strong bg-background/80 hover:border-primary/50 transition-colors">
                    <span className="inline-block px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      {phase.phase}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-on-surface-muted">
                      {phase.description}
                    </p>
                  </GlassCard>

                  {idx < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-border-strong bg-background rounded-full p-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
