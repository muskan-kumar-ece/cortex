"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroData } from "@/cms/homepage/types";
import { heroEntrance, staggerContainer } from "@/motion/variants";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { ParticleLayer } from "@/components/backgrounds/ParticleLayer";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { HeroBadge } from "@/components/marketing/HeroBadge";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { GradientText } from "@/components/marketing/GradientHeading";
import { ArrowRight, Mouse } from "lucide-react";
import { EnterpriseDashboardVisual } from "@/components/visuals/EnterpriseDashboardVisual";

export function HeroSection({ data }: { data: HeroData }) {
  // Split headline: apply gradient to last word
  const words = data.headline.split(" ");
  const lastWord = words.pop();
  const restOfHeadline = words.join(" ");

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-center overflow-hidden bg-background pt-24 lg:pt-0">
      {/* ── Background System ── */}
      <BackgroundMesh />
      <ParticleLayer />
      <SpotlightLayer />
      
      {/* Floating Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container relative z-20 mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* ── Left Content (60%) ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="col-span-1 lg:col-span-6 flex flex-col items-start text-left lg:py-24"
          >
            <motion.div variants={heroEntrance} className="mb-6">
              <HeroBadge>Enterprise-Grade Engineering</HeroBadge>
            </motion.div>

            <motion.h1
              variants={heroEntrance}
              className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight leading-[1.05] text-foreground mb-6"
            >
              {restOfHeadline} <br className="hidden md:block" />
              <GradientText>{lastWord}</GradientText>
            </motion.h1>

            <motion.p
              variants={heroEntrance}
              className="text-lg md:text-xl text-on-surface-muted leading-relaxed max-w-xl mb-10"
            >
              {data.subheadline}
            </motion.p>

            <motion.div
              variants={heroEntrance}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
            >
              <PremiumButton render={<Link href={data.primaryCta.href} />} nativeButton={false} className="w-full sm:w-auto justify-center group">
                {data.primaryCta.title} 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
              <PremiumButton btnStyle="glass" render={<Link href={data.secondaryCta.href} />} nativeButton={false} className="w-full sm:w-auto justify-center">
                {data.secondaryCta.title}
              </PremiumButton>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              variants={heroEntrance}
              className="flex items-center gap-6 pt-6 border-t border-border w-full max-w-md"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold font-mono">10M+</div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-bold font-mono text-primary text-center leading-none">99%<br/>Uptime</div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold font-mono">24/7</div>
              </div>
              <p className="text-sm font-mono text-on-surface-muted uppercase tracking-widest">
                {data.trustIndicator}
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right Visual Anchor (40%) ── */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="col-span-1 lg:col-span-6 relative w-full h-[500px] lg:h-[700px] hidden md:flex items-center justify-center"
          >
            {/* Floating Architecture Card 1 */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-1/4 z-20 w-48 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400">API Gateway</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[85%]" />
              </div>
            </motion.div>

            {/* Floating Architecture Card 2 */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/3 z-20 w-56 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="text-[10px] text-primary font-bold">DB</span>
                </div>
                <span className="text-xs font-mono text-white">PostgreSQL Cluster</span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Replication</span>
                <span className="text-primary">Syncing...</span>
              </div>
            </motion.div>

            <EnterpriseDashboardVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-on-surface-faint"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Mouse className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Fade the background into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
