"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

export interface KnowledgeComplianceProps {
  items: {
    standard: string;
    description: string;
  }[];
}

export function KnowledgeCompliance({ items }: KnowledgeComplianceProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className=" border-b border-border/50 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_50%)]">
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
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Security & Compliance
              </h2>
            </div>
            <p className="text-on-surface-muted max-w-2xl">
              Enterprise-grade security controls mapped directly to industry regulatory requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, idx) => (
              <motion.div key={idx} variants={slideUp}>
                <GlassCard className="p-6 border-border-strong bg-background/80 flex flex-col h-full hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-foreground tracking-wide">
                      {item.standard}
                    </h3>
                  </div>
                  <p className="text-sm text-on-surface-muted leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
