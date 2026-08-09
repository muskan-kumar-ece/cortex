"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";


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

export function EngineeringOutcomes({ data }: { data: any }) {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/[0.04]">
      {/* Visual background element */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-[0.18em] mb-3">Measured Impact</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.stats.map((stat: any, idx: number) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden group hover:bg-white/[0.04] transition-colors flex flex-col items-center text-center backdrop-blur-md"
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span className="text-5xl font-bold tracking-tighter text-white mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                <AnimatedCounter target={stat.value} />
              </span>
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest relative z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

