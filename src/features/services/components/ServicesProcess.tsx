"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Lightbulb, Network, PenTool, Code, ShieldCheck, Rocket } from "lucide-react";

const iconMap: Record<string, any> = {
  Lightbulb,
  Network,
  PenTool,
  Code,
  ShieldCheck,
  Rocket
};

export function ServicesProcess({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <motion.div variants={slideUp} className="max-w-2xl text-center mx-auto">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-surface border border-border-strong rounded-md text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
              <Rocket className="w-3.5 h-3.5" />
              Execution
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {data.title}
            </h2>
            <p className="text-xl text-on-surface-muted font-light leading-relaxed">
              {data.description}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {data.steps.map((step: any, idx: number) => {
              const Icon = step.icon && iconMap[step.icon] ? iconMap[step.icon] : Code;
              
              return (
                <motion.div key={step.id} variants={slideUp} className="relative group">
                  {/* Connective Line (hidden on mobile) */}
                  {idx % 3 !== 2 && idx !== data.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(100%-2rem)] w-[calc(100%-2rem)] h-px bg-border-strong group-hover:bg-primary/50 transition-colors duration-500" />
                  )}

                  <div className="flex flex-col gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-surface border border-border-strong flex items-center justify-center text-on-surface-muted group-hover:text-primary group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all duration-500 relative z-10">
                      <Icon className="w-8 h-8" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold font-mono text-primary">
                        0{idx + 1}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-on-surface-muted leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
