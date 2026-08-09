"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ArrowDown, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

export interface KnowledgeBeforeAfterProps {
  metrics: {
    metricName: string;
    beforeLabel: string;
    beforeValue: string;
    afterLabel: string;
    afterValue: string;
    improvement: string;
  }[];
}

export function KnowledgeBeforeAfter({ metrics }: KnowledgeBeforeAfterProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className=" border-b border-border-strong bg-background overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <motion.div variants={slideUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Measurable Transformation
            </h2>
            <p className="text-lg text-on-surface-muted font-light">
              We replace brittle legacy constraints with scalable engineering excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={slideUp} className="relative">
                <GlassCard className="p-8 md:p-12 border-border-strong bg-surface/30 relative overflow-hidden group">
                  
                  {/* Title */}
                  <div className=" flex justify-between items-center border-b border-border">
                    <h3 className="text-2xl font-bold text-foreground">
                      {metric.metricName}
                    </h3>
                    <div className="px-4 rounded-full bg-primary/10 text-primary font-bold tracking-wider uppercase text-sm border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      {metric.improvement}
                    </div>
                  </div>

                  {/* Transformation Flow */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
                    
                    {/* Before */}
                    <div className="flex flex-col items-center text-center space-y-4 w-full md:w-1/3">
                      <span className="px-3 bg-surface-elevated border border-border-strong rounded-full text-xs font-bold text-on-surface-muted uppercase tracking-widest">
                        Before
                      </span>
                      <p className="text-sm font-medium text-on-surface-muted h-10 flex items-center justify-center">
                        {metric.beforeLabel}
                      </p>
                      <div className="text-4xl md:text-5xl font-bold text-on-surface opacity-50 line-through decoration-rose-500/50">
                        {metric.beforeValue}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center w-1/3 text-primary relative">
                      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                      <ArrowRight className="w-12 h-12 stroke-[1.5] group-hover:translate-x-4 transition-transform duration-500" />
                    </div>
                    <div className="flex md:hidden flex-col items-center justify-center text-primary relative">
                      <ArrowDown className="w-8 h-8 stroke-[2] group-hover:translate-y-2 transition-transform duration-500" />
                    </div>

                    {/* After */}
                    <div className="flex flex-col items-center text-center space-y-4 w-full md:w-1/3">
                      <span className="px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-500 uppercase tracking-widest">
                        After
                      </span>
                      <p className="text-sm font-bold text-foreground h-10 flex items-center justify-center">
                        {metric.afterLabel}
                      </p>
                      <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600 drop-shadow-sm scale-110">
                        {metric.afterValue}
                      </div>
                    </div>

                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
