"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/marketing/GlassCard";
import * as LucideIcons from "lucide-react";
import { slideUp, staggerContainer } from "@/motion/variants";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface KnowledgeBenefitsProps {
  benefits: Benefit[];
}

export function KnowledgeBenefits({ benefits }: KnowledgeBenefitsProps) {
  return (
    <section className=" bg-surface border-t border-border relative overflow-hidden">
      <div className="w-full">
        <div className=" max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-muted flex items-center gap-2">
            Value Proposition
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Business Outcomes
          </h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, idx) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[benefit.icon] || LucideIcons.CheckCircle;
            
            return (
              <motion.div key={idx} variants={slideUp}>
                <GlassCard className="h-full p-8 border-border-strong bg-background/50 flex flex-col items-start gap-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-on-surface-muted leading-relaxed">{benefit.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
