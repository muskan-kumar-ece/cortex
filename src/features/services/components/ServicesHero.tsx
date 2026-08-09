"use client";

import { motion } from "framer-motion";
import { GlowLayer } from "@/components/backgrounds/GlowLayer";
import { HeroLayout } from "@/components/marketing/HeroLayout";

export function ServicesHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-center overflow-hidden bg-background">
      <GlowLayer color="primary" opacity={0.15} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      <HeroLayout alignment="center" className="pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-strong text-on-surface-muted text-xs font-mono tracking-widest mb-8 uppercase"
        >
          <span>{data.subheadline || "Services"}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-8 leading-tight"
        >
          {data.headline || "Capabilities"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-xl md:text-2xl text-on-surface-muted max-w-2xl leading-relaxed font-light"
        >
          {data.description || "Discover our range of enterprise services."}
        </motion.p>
      </HeroLayout>
    </section>
  );
}
