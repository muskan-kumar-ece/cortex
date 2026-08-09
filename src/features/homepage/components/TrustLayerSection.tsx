"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { StatItem } from "@/cms/homepage/types";

function AnimatedCounter({ target, duration = 1.8 }: { target: string; duration?: number }) {
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

export function TrustLayerSection({ stats }: { stats: StatItem[] }) {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-background">
      {/* Dense Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-4">Enterprise Readiness</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Engineered for Scale
          </h2>
        </div>

        {/* Executive Dashboard Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full rounded-2xl border border-white/10 bg-[#0d1117]/80 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Ambient Inner Glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          {/* MacOS Header */}
          <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="ml-4 text-xs font-mono text-muted-foreground">cortex-operations-dashboard.tsx</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 relative z-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0d1117] p-8 md:p-12 flex flex-col items-center text-center justify-center relative overflow-hidden group transition-colors hover:bg-white/[0.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3">
                  <AnimatedCounter target={stat.value} />
                </span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Server status bar */}
          <div className="h-10 border-t border-white/5 bg-white/[0.01] flex items-center px-6 justify-between relative z-10">
            <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span>Status: <span className="text-emerald-500">Operational</span></span>
              <span className="hidden sm:inline">Regions: US-East, EU-Central, AP-South</span>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              Last deployed: just now
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest border-r border-white/10 pr-6">
            Trusted Infrastructure For
          </span>
          {["FinTrust", "HealthCorp", "RetailMax", "SecureVault", "CloudEdge"].map((name) => (
            <span
              key={name}
              className="text-sm text-white/70 font-semibold tracking-wide hover:text-white transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
