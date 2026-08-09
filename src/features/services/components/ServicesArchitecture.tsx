"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { BlueprintGrid } from "@/components/marketing/DataViz";
import { Layers } from "lucide-react";

export function ServicesArchitecture({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden border-b border-border">
      <BlueprintGrid className="opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
        >
          {/* Left Text */}
          <div className="w-full md:w-1/2">
            <motion.div variants={slideUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-strong rounded-md text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
                <Layers className="w-3.5 h-3.5" />
                System Architecture
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {data.title}
              </h2>
              <p className="text-lg text-on-surface-muted leading-relaxed mb-8">
                {data.description}
              </p>

              <ul className="space-y-4">
                {data.features.map((feature: string, idx: number) => (
                  <motion.li 
                    key={idx} 
                    variants={slideUp}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Visual Representation (Mock Diagram) */}
          <div className="w-full md:w-1/2 h-[400px] rounded-3xl border border-border-strong bg-surface/50 backdrop-blur-sm relative overflow-hidden flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative z-10 w-full max-w-md flex flex-col gap-8 items-center p-8">
              {/* Nodes */}
              <div className="w-48 h-16 rounded-xl border border-primary/50 bg-background flex items-center justify-center font-mono text-sm text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                API_GATEWAY
              </div>
              
              <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              
              <div className="flex gap-8 w-full justify-center">
                <div className="w-32 h-16 rounded-xl border border-border-strong bg-surface flex items-center justify-center font-mono text-xs text-on-surface-muted">
                  AUTH_SVC
                </div>
                <div className="w-32 h-16 rounded-xl border border-border-strong bg-surface flex items-center justify-center font-mono text-xs text-on-surface-muted">
                  DATA_SVC
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
