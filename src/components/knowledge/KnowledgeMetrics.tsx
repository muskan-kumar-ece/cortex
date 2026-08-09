"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { GlassCard } from "@/components/marketing/GlassCard";
import { TrendingUp, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

export interface KnowledgeMetricsProps {
  metrics: {
    label: string;
    value: string;
    trend: "up" | "down" | "neutral";
    description?: string;
  }[];
}

export function KnowledgeMetrics({ metrics }: KnowledgeMetricsProps) {
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
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Business Outcomes
              </h2>
            </div>
            <p className="text-on-surface-muted max-w-2xl">
              Measurable impact and performance indicators achieved in this domain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={slideUp}>
                <GlassCard className="h-full p-6 border-border-strong bg-background/50 flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
                        {metric.label}
                      </span>
                      {metric.trend === "up" && <ArrowUpRight className="w-5 h-5 text-emerald-500" />}
                      {metric.trend === "down" && <ArrowDownRight className="w-5 h-5 text-rose-500" />}
                      {metric.trend === "neutral" && <TrendingUp className="w-5 h-5 text-blue-500" />}
                    </div>
                    
                    <div className="text-4xl font-bold tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
                      {metric.value}
                    </div>
                    
                    {metric.description && (
                      <p className="text-sm text-on-surface-muted">
                        {metric.description}
                      </p>
                    )}
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
