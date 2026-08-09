"use client";

import { StorySectionData } from "@/cms/about/types";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/marketing/GlassCard";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { AiNetworkVisual } from "@/components/visuals/AiNetworkVisual";
import { DataVisualizationVisual } from "@/components/visuals/DataVisualizationVisual";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";

export function StorySection({ data, index }: { data: StorySectionData; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <section className="py-24 relative z-10 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className={cn(
          "flex flex-col lg:flex-row gap-16 items-center",
          isReversed ? "lg:flex-row-reverse" : ""
        )}>
          
          {/* Narrative Text */}
          <motion.div 
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border text-on-surface-muted font-mono text-sm mb-4">
              0{index + 1}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {data.title}
            </h2>
            <p className="text-xl text-on-surface-muted leading-relaxed font-light max-w-xl">
              {data.description}
            </p>
          </motion.div>

          {/* Supporting Visuals / Points */}
          <motion.div 
            initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            {/* Visual Anchor for the section */}
            <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-30 mix-blend-screen bg-background border border-border">
              {index % 3 === 0 && <AiNetworkVisual />}
              {index % 3 === 1 && <DataVisualizationVisual />}
              {index % 3 === 2 && <CloudArchitectureVisual />}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {data.points.map((point, idx) => {
              const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[point.icon] || LucideIcons.CheckCircle;
              return (
                <GlassCard key={idx} className="p-8 border-border-strong bg-surface/50 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-6 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{point.title}</h3>
                  <p className="text-sm text-on-surface-muted leading-relaxed">{point.description}</p>
                </GlassCard>
              );
            })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
