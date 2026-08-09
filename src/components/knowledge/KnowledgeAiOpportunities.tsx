"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { BrainCircuit, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

export interface KnowledgeAiOpportunitiesProps {
  opportunities: {
    useCase: string;
    description: string;
    impact: string;
  }[];
}

export function KnowledgeAiOpportunities({ opportunities }: KnowledgeAiOpportunitiesProps) {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section className=" border-b border-border/50 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.05),transparent_50%)]">
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
              <BrainCircuit className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                AI & Automation Opportunities
              </h2>
            </div>
            <p className="text-on-surface-muted max-w-2xl">
              High-impact areas where applied AI, machine learning, and workflow automation can create immediate value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, idx) => (
              <motion.div key={idx} variants={slideUp}>
                <GlassCard className="h-full p-6 border-border-strong bg-background/50 hover:border-primary/50 transition-colors flex flex-col">
                  <div className="">
                    <h3 className="text-lg font-bold text-foreground tracking-wide">
                      {opp.useCase}
                    </h3>
                  </div>
                  <p className="text-sm text-on-surface-muted leading-relaxed flex-1">
                    {opp.description}
                  </p>
                  
                  <div className="mt-auto border-t border-border/50">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Impact: {opp.impact}
                      </span>
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
