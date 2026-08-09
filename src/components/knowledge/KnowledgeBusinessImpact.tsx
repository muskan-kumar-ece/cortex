"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { CheckCircle2 } from "lucide-react";

export interface KnowledgeBusinessImpactProps {
  impact: {
    title: string;
    description: string;
    points: string[];
  };
  roi?: { label: string; value: string; }[];
}

export function KnowledgeBusinessImpact({ impact, roi }: KnowledgeBusinessImpactProps) {
  if (!impact) return null;

  return (
    <section className=" border-b border-border-strong bg-background">
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Editorial Content */}
          <motion.div variants={slideUp} className="space-y-8">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm block">
                Business Impact
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                {impact.title}
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-on-surface-muted font-light leading-relaxed">
              {impact.description}
            </p>

            <ul className="space-y-4">
              {impact.points.map((point, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0.5" />
                  <span className="text-foreground font-medium leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: ROI Metrics (Editorial Style) */}
          {roi && roi.length > 0 && (
            <motion.div variants={slideUp} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] border border-border-strong -rotate-2 scale-[1.02] z-0" />
              <div className="relative z-10 bg-surface border border-border-strong rounded-[2rem] p-10 md:p-14 shadow-2xl flex flex-col justify-center">
                <div className="space-y-12">
                  {roi.map((metric, idx) => (
                    <div key={idx} className="border-b border-border last:border-0 last:">
                      <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-on-surface-muted tracking-tighter">
                        {metric.value}
                      </div>
                      <div className="text-lg md:text-xl font-bold text-primary uppercase tracking-widest">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
