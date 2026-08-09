"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { BlueprintGrid } from "@/components/marketing/DataViz";

interface KnowledgeHeroProps {
  title: string;
  subtitle: string;
  category: string;
}

export function KnowledgeHero({ title, subtitle, category }: KnowledgeHeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-background min-h-[60vh] flex items-center border-b border-border">
      {/* Background System */}
      <BlueprintGrid className="opacity-40" />
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[800px] bg-primary/10 blur-[150px] pointer-events-none rounded-full mix-blend-screen opacity-50" />
      <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full mix-blend-screen opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          <motion.div variants={slideUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-strong text-xs font-mono font-bold uppercase tracking-widest text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {category} Module
            </span>
          </motion.div>

          <motion.h1 
            variants={slideUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-8"
          >
            {title}
          </motion.h1>

          <motion.p 
            variants={slideUp}
            className="text-xl md:text-2xl text-on-surface-muted leading-relaxed font-light max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
