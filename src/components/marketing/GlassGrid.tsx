"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer } from "@/motion/variants";
import { cn } from "@/lib/utils";

interface GlassGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function GlassGrid({ children, className, columns = 2 }: GlassGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("grid gap-6 lg:gap-8 mx-auto", getGridCols(), className)}
    >
      {children}
    </motion.div>
  );
}
