"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

interface SolutionData {
  title: string;
  description: string;
  features: string[];
}

export function KnowledgeSolution({ solution }: { solution: SolutionData }) {
  return (
    <section className="py-24 relative bg-surface border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-success flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Strategic Resolution
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {solution.title}
            </h2>
            <p className="text-lg text-on-surface-muted leading-relaxed max-w-xl">
              {solution.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <GlassCard className="p-8 border-success/20 bg-success/5 shadow-[0_0_50px_rgba(43,224,140,0.05)]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-success mb-6">Core Deliverables</h3>
              <ul className="space-y-4">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
