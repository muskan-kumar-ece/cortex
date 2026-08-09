"use client";

import { motion } from "framer-motion";
import { slideUp } from "@/motion/variants";

export interface KnowledgeSummaryProps {
  summary: string;
}

export function KnowledgeSummary({ summary }: KnowledgeSummaryProps) {
  if (!summary) return null;

  return (
    <section className="py-24 border-b border-border/50 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={slideUp} className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/3 shrink-0">
              <h2 className="text-xl font-bold tracking-widest text-primary uppercase border-t-2 border-primary pt-4 inline-block">
                Executive Summary
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl md:text-3xl lg:text-4xl text-foreground font-light leading-snug md:leading-normal tracking-tight">
                {summary}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
