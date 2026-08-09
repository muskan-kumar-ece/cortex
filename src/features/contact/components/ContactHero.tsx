"use client";

import { ContactHeroData } from "@/config/contact.types";
import { motion } from "framer-motion";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { HeroLayout } from "@/components/marketing/HeroLayout";

export function ContactHero({ data }: { data: ContactHeroData }) {
  return (
    <section className="relative w-full pt-32 pb-16 overflow-hidden bg-background">
      <SpotlightLayer />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0" />

      <HeroLayout alignment="left">
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
            className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 leading-tight"
          >
            {data.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-muted leading-relaxed"
          >
            {data.description}
          </motion.p>
      </HeroLayout>
    </section>
  );
}
