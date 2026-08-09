"use client";


import { motion } from "framer-motion";
import { ParticleLayer } from "@/components/backgrounds/ParticleLayer";
import { GlobalNetwork } from "@/components/visuals/GlobalNetwork";
import { HeroLayout } from "@/components/marketing/HeroLayout";

export function IndustriesHero({ data }: { data: any }) {
  return (
    <section className="relative w-full min-h-[75vh] flex flex-col justify-center overflow-hidden bg-background">
      {/* Background System */}
      <ParticleLayer />
      <div className="absolute inset-0 z-0 opacity-30">
        <GlobalNetwork />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-0" />

      <HeroLayout alignment="left" className="pt-20">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-hover text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span>{data.subheadline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-tight"
          >
            {data.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-muted max-w-2xl leading-relaxed"
          >
            {data.description}
          </motion.p>
      </HeroLayout>
    </section>
  );
}

