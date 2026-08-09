"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CtaData } from "@/cms/homepage/types";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { ArrowRight, Globe } from "lucide-react";

export function CtaSection({ data }: { data: CtaData }) {
  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-background border-t border-border-strong">
      
      {/* Massive Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
      
      {/* Abstract World Map Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] flex items-center justify-center">
        <Globe className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] text-primary" strokeWidth={0.5} />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface/50 backdrop-blur-3xl border border-border-strong rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden group"
        >
          {/* Internal Specular Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 text-balance">
              {data.headline}
            </h2>
            <p className="text-xl text-on-surface-muted leading-relaxed max-w-2xl mx-auto mb-12">
              {data.subheadline}
            </p>

            <PremiumButton 
              render={<Link href={data.button.href} />} 
              nativeButton={false} 
              className="h-16 px-10 text-lg group/btn shadow-[0_0_40px_rgba(var(--primary),0.4)] hover:shadow-[0_0_80px_rgba(var(--primary),0.6)]"
            >
              {data.button.title} <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
