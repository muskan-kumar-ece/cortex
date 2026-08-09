"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/motion/variants";
import { cn } from "@/lib/utils";

interface HeroLayoutProps {
  children: ReactNode;
  className?: string;
  alignment?: "center" | "left";
}

export function HeroLayout({ children, className, alignment = "center" }: HeroLayoutProps) {
  return (
    <div className={cn("container relative z-20 mx-auto px-4 md:px-6 py-12 flex flex-col", 
      alignment === "center" ? "items-center text-center" : "items-start text-left",
      className
    )}>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className={cn(
          "max-w-4xl flex flex-col gap-6",
          alignment === "center" ? "items-center" : "items-start"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
