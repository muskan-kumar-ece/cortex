"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EngagementProcessData } from "@/config/contact.types";
import * as LucideIcons from "lucide-react";

const PROCESS_COLORS = ["#06B6D4", "#10B981", "#7C3AED", "#F472B6"];

export function ConsultationProcess({ data }: { data: EngagementProcessData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const renderIcon = (iconName: string, color: string) => {
    const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[iconName] || LucideIcons.Box;
    return <Icon className="w-5 h-5" style={{ color }} />;
  };

  return (
    <section className="relative w-full py-32 overflow-hidden border-t border-border">
      {/* Background Section */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute left-0 top-0 w-1/2 h-full pointer-events-none blur-[150px]"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
      />

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <p className="text-xs font-mono text-on-surface-muted uppercase tracking-[0.18em] mb-3">Next Steps</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {data.title}
          </h2>
          <p className="text-on-surface-muted text-lg">
            {data.description}
          </p>
        </div>

        <div ref={ref} className="relative mt-12 md:mt-32">
          {/* Vertical line (mobile) / Horizontal line (desktop) */}
          <div className="absolute left-8 md:left-[60px] top-0 bottom-0 w-px bg-border-strong md:hidden" />
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-px bg-border-strong">
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, #06B6D4, #10B981, #7C3AED, #F472B6)" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {data.steps.map((step, idx) => {
              const color = PROCESS_COLORS[idx % PROCESS_COLORS.length];

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }}
                  className="relative flex flex-row md:flex-col items-start gap-8 md:gap-0"
                >
                  {/* Step Node */}
                  <div className="relative z-10 shrink-0 md:mb-10">
                    <div className="absolute inset-0 rounded-2xl animate-pulse-glow" style={{ backgroundColor: `${color}20` }} />
                    
                    <div
                      className="w-16 h-16 md:w-[120px] md:h-[120px] rounded-2xl flex items-center justify-center border-2 bg-background md:mx-auto relative z-10"
                      style={{
                        borderColor: `${color}40`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px ${color}20`
                      }}
                    >
                      <div className="w-10 h-10 md:w-[72px] md:h-[72px] rounded-xl flex items-center justify-center border"
                        style={{
                          background: `${color}10`,
                          borderColor: `${color}30`
                        }}
                      >
                        {renderIcon(step.icon, color)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:text-center mt-2 md:mt-0 relative group">
                    <div className="absolute -left-10 top-2 w-4 h-4 rounded-full border-[3px] border-background md:hidden" style={{ backgroundColor: color }} />
                    
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-4 border" style={{ color: color, backgroundColor: `${color}10`, borderColor: `${color}30` }}>
                      Step 0{idx + 1}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-3">{step.title}</h3>
                    <p className="text-sm md:text-base text-on-surface-muted leading-relaxed">{step.description}</p>
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
