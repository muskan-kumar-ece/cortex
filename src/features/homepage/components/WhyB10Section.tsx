"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { WhyB10Item } from "@/cms/homepage/types";
import { Cpu, Eye, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, React.ElementType> = {
  Cpu, Eye, Layers
};

export function WhyB10Section({ items }: { items: WhyB10Item[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  
  // Parallax effect for floating elements
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-background overflow-hidden border-t border-border-strong">
      
      {/* Floating abstract geometry in background */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] left-[10%] w-64 h-64 border border-primary/20 rounded-full mix-blend-screen opacity-50 blur-[2px]" />
      <motion.div style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [0, -90]) }} className="absolute bottom-[20%] right-[10%] w-80 h-80 border border-indigo-500/20 rounded-lg mix-blend-screen opacity-50 blur-[2px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Why Cortex
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            We don&apos;t just ship code. <br />
            <span className="text-on-surface-muted">We architect outcomes.</span>
          </h3>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 max-w-5xl mx-auto relative">
          
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 md:-translate-x-1/2 w-px bg-border-strong -z-10" />

          {items.map((item, idx) => {
            const Icon = IconMap[item.icon] || Layers;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-start gap-8 md:gap-0",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Center Node */}
                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                  <span className="text-xs font-bold font-mono text-primary">0{idx + 1}</span>
                </div>

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-1/2 pl-16 md:pl-0 md:px-12 flex",
                  isEven ? "md:justify-end" : "md:justify-start"
                )}>
                  <div className="bg-surface/50 backdrop-blur-xl border border-border-strong rounded-3xl p-8 w-full max-w-md hover:border-primary/50 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-6 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-3">{item.title}</h4>
                    <p className="text-on-surface-muted leading-relaxed relative z-10">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
