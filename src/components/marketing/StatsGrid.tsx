"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, slide } from "@/motion/variants";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12", className)}
    >
      {stats.map((stat) => (
        <motion.div key={stat.id} variants={slide} className="flex flex-col items-center text-center">
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-2">
            {stat.value}
          </div>
          <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
