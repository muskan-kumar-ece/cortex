"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface TimelineProps {
  title: string;
  description: string;
  steps: TimelineStep[];
  className?: string;
}

export function Timeline({ title, description, steps, className }: TimelineProps) {
  return (
    <section className={cn("py-24 bg-background relative overflow-hidden", className)}>
      {/* Background Mesh */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="relative">
          {/* Main vertical line background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className="relative flex items-center md:justify-between flex-col md:flex-row gap-8 md:gap-0">
                  
                  {/* Left Content (or empty spacer for odd items) */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? "md:text-right" : "md:order-3"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="p-6 rounded-2xl border border-white/5 bg-white/5 dark:bg-white/[0.02] backdrop-blur-md hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Node & Animated Line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 md:order-2 flex flex-col items-center">
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full h-full bg-gradient-to-b from-primary to-accent origin-top"
                    />
                    
                    {/* Icon Node positioned relative to the container */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", delay: 0.4 }}
                      className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary/20 text-primary shadow-[0_0_20px_rgba(124,58,237,0.3)] backdrop-blur-xl z-10"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Right Content Spacer (needed for md:flex-row layout) */}
                  <div className={`w-full md:w-[45%] hidden md:block ${isEven ? "md:order-3" : ""}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
