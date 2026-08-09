"use client";

import { motion } from "framer-motion";

import { staggerContainer, slide } from "@/motion/variants";
import * as LucideIcons from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

const ACCENTS = ["violet", "cyan", "emerald", "indigo"] as const;

export function TechnologyExpertise({ data }: { data: any }) {
  const renderIcon = (iconName: string, color: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
    if (!Icon) return <LucideIcons.Box className="h-6 w-6" style={{ color }} />;
    return <Icon className="h-6 w-6" style={{ color }} />;
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/[0.04]">
      {/* Background gradients */}
      <div className="absolute right-0 top-0 w-1/2 h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-[0.18em] mb-3">Core Stack</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground">{data.description}</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {data.categories.map((category: any, idx: number) => {
            const accent = ACCENTS[idx % ACCENTS.length];
            const colorMap: Record<string, { bg: string; text: string; border: string }> = {
              violet: { bg: "rgba(124,58,237,0.1)", text: "#a78bfa", border: "rgba(124,58,237,0.2)" },
              cyan: { bg: "rgba(6,182,212,0.1)", text: "#22d3ee", border: "rgba(6,182,212,0.2)" },
              emerald: { bg: "rgba(16,185,129,0.1)", text: "#34d399", border: "rgba(16,185,129,0.2)" },
              indigo: { bg: "rgba(79,70,229,0.1)", text: "#818cf8", border: "rgba(79,70,229,0.2)" },
            };
            const c = colorMap[accent];

            return (
              <motion.div key={category.id} variants={slide} className="h-full">
                <GlassCard hoverEffect="lift" glowColor={accent} className="h-full p-8 flex flex-col relative overflow-hidden group">
                  {/* Decorative background circle */}
                  <div 
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: c.text }}
                  />

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.text }} />
                    <h3 className="text-lg font-bold text-foreground">
                      {category.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3 relative z-10">
                    {category.technologies?.map((tech: any) => (
                      <div 
                        key={tech.id} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] group/tech hover:bg-white/[0.06] transition-colors"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover/tech:scale-110 group-hover/tech:rotate-3"
                          style={{ backgroundColor: c.bg, borderColor: c.border }}
                        >
                          {renderIcon(tech.icon, c.text)}
                        </div>
                        <span className="text-sm font-semibold text-foreground/80 group-hover/tech:text-foreground transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
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




