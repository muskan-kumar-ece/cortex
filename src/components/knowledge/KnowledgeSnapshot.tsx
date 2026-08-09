"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { GlassCard } from "@/components/marketing/GlassCard";
import { Target, Layers, Cpu } from "lucide-react";

export interface KnowledgeSnapshotProps {
  executiveSummary: string;
  marketChallenges: string[];
}

export function KnowledgeSnapshot({ executiveSummary, marketChallenges }: KnowledgeSnapshotProps) {
  return (
    <section className=" border-b border-border/50">
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Executive Summary */}
          <motion.div variants={slideUp} className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Executive Summary
              </h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-on-surface-muted leading-relaxed font-light">
              <p>{executiveSummary}</p>
            </div>
          </motion.div>

          {/* Market Challenges */}
          <motion.div variants={slideUp} className="lg:col-span-5">
            <GlassCard className="p-8 border-border-strong bg-surface/50 h-full">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Market Challenges
                </h3>
              </div>
              <ul className="space-y-4">
                {marketChallenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3 text-on-surface-muted">
                    <Cpu className="w-5 h-5 text-primary shrink-0.5" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
