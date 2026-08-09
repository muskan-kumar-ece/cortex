"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCTAProps {
  headline: string;
  subheadline: string;
  children: ReactNode;
  className?: string;
}

import { GlassCard } from "@/components/marketing/GlassCard";

export function PremiumCTA({ headline, subheadline, children, className }: PremiumCTAProps) {
  return (
    <section className={cn("relative py-28 overflow-hidden bg-background", className)}>
      {/* Background atmosphere using CSS variables from the theme */}
      <div
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-[100%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--primary)/0.2) 0%, hsl(var(--primary)/0.05) 50%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[10%] right-[10%] w-[25%] h-[40%] rounded-full pointer-events-none bg-info/10 blur-[50px]"
      />

      <div className="container relative mx-auto px-4 md:px-6 z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl w-full"
        >
          <GlassCard glowColor="primary" className="p-10 md:p-16 text-center flex flex-col items-center">

            <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] mb-5 text-foreground text-balance">
              {headline}
            </h2>
            <p className="relative text-base md:text-lg text-muted-foreground mb-10 text-balance max-w-xl mx-auto leading-relaxed">
              {subheadline}
            </p>

            <div className="relative flex flex-col sm:flex-row justify-center items-center gap-4">
              {children}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
