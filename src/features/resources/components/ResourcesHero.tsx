"use client";

import { ResourcesHeroData } from "@/cms/resources/types";
import { motion } from "framer-motion";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";

export function ResourcesHero({ data }: { data: ResourcesHeroData }) {
  return (
    <section className="relative w-full pt-32 pb-16 overflow-hidden bg-background">
      <BackgroundMesh />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-0" />

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="max-w-3xl">
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-tight"
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
        </div>
      </div>
    </section>
  );
}
