"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitMerge } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

interface KnowledgeWorkflowProps {
  workflow: WorkflowStep[];
}

export function KnowledgeWorkflow({ workflow }: KnowledgeWorkflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className=" bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="w-full">
        <div className="">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-muted flex items-center gap-2">
            <GitMerge className="w-3.5 h-3.5 text-primary" />
            Execution Model
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Development Workflow
          </h2>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border-strong md:-translate-x-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24">
            {workflow.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "" : "md:flex-row-reverse"}`}>
                  
                  {/* Glowing Node */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-[7px] md:-translate-x-1/2 z-10">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ delay: 0.2 }}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <GlassCard className="p-6 md:p-8 hover:border-primary/50 transition-colors">
                        <div className={`text-[10px] font-mono text-primary uppercase tracking-widest ${isEven ? "md:justify-end" : "md:justify-start"} flex`}>
                          Phase 0{step.step}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{step.title}</h3>
                        <p className="text-on-surface-muted leading-relaxed">{step.description}</p>
                      </GlassCard>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
