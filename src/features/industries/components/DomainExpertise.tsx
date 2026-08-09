"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

import { Activity, ServerCrash, Cpu, DatabaseZap, ShieldCheck } from "lucide-react";
import { BlueprintGrid } from "@/components/marketing/DataViz";

function AnimatedCounter({ target, duration = 2 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    const match = target.match(/^([\d.]+)(\D*)$/);
    if (!match) { 
      setTimeout(() => setDisplay(target), 0);
      return; 
    }

    const end = parseFloat(match[1]);
    const suffix = match[2];
    const start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * eased;

      const decimals = (match[1].split(".")[1] || "").length;
      setDisplay(`${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{display}</span>;
}

const STAT_THEMES = [
  { icon: ServerCrash, color: "#22d3ee", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  { icon: DatabaseZap, color: "#10B981", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { icon: ShieldCheck, color: "#7C3AED", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: Cpu,         color: "#F472B6", bg: "bg-pink-500/10", border: "border-pink-500/30" },
];

export function DomainExpertise({ data }: { data: any }) {
  // Stable random bars for visual effect
  const graphBars = useMemo(() => {
    const baseHeights = [40, 60, 30, 80, 50, 90, 45, 75, 100, 65];
    return baseHeights.map((h, i) => ({
      h,
      midH: ((i * 7) % 50) + 50, // deterministic pseudo-random height
      duration: 2 + ((i * 3) % 2) // deterministic pseudo-random duration
    }));
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background abstract layout */}
      <BlueprintGrid className="opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24 relative">
          
          {/* Sticky Left Content */}
          <div className="w-full md:w-5/12 md:sticky md:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-6">
              <Activity className="w-3.5 h-3.5" />
              Real-time Metrics
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {data.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {data.description}
            </p>
            
            <div className="hidden md:block w-full max-w-xs h-32 rounded-xl border border-white/10 bg-black/50 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]" />
              <div className="flex justify-between items-end h-full w-full gap-2 opacity-50">
                {graphBars.map((bar, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [`${bar.h}%`, `${bar.midH}%`, `${bar.h}%`] }}
                    transition={{ duration: bar.duration, repeat: Infinity }}
                    className="w-full bg-cyan-500 rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Scrolling Layered Cards */}
          <div className="w-full md:w-7/12 flex flex-col gap-6 pt-10">
            {data.stats.map((stat: any, idx: number) => {
              const theme = STAT_THEMES[idx % STAT_THEMES.length];
              const Icon = theme.icon;
              
              return (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 md:p-10 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl z-${10 - idx}`}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 50%, ${theme.color}15, transparent 70%)` }} />
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner ${theme.bg} ${theme.border}`}>
                      <Icon className="w-8 h-8" style={{ color: theme.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</h4>
                      <p className="text-[10px] font-mono text-white/40">SYS_METRIC_{String(idx + 1).padStart(2, '0')}</p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-0 relative z-10">
                    <span className="text-5xl md:text-6xl font-bold tracking-tight text-white font-mono drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      <AnimatedCounter target={stat.value} />
                    </span>
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

