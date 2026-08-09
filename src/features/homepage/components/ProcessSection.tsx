"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProcessStep } from "@/cms/homepage/types";
import { Search, LayoutTemplate, Code2, TestTube2, Rocket, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, React.ElementType> = {
  "01": Search,
  "02": LayoutTemplate,
  "03": Code2,
  "04": TestTube2,
  "05": Rocket,
  "06": LifeBuoy,
};

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-background border-t border-border-strong overflow-hidden">
      
      {/* Background Depth Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[100%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-4">
            Engineering Methodology
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            From architecture to <span className="text-indigo-400/80">deployment.</span>
          </h3>
          <p className="text-lg text-on-surface-muted leading-relaxed">
            A repeatable, transparent engineering process built for enterprise reliability.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Center Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-border-strong -translate-x-1/2" />
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-primary to-indigo-500 -translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, idx) => {
              const Icon = IconMap[step.step] || Code2;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 perspective-1000",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Glowing Node on Timeline */}
                  <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-50"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-16 md:pl-0 flex",
                    isEven ? "md:justify-end md:pr-16" : "md:justify-start md:pl-16"
                  )}>
                    <div className="w-full bg-surface/50 backdrop-blur-xl border border-border-strong rounded-3xl p-8 hover:border-indigo-500/50 transition-colors group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-5xl font-black text-on-surface-faint group-hover:text-indigo-500/20 transition-colors duration-500">
                          {step.step}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                      <p className="text-on-surface-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
