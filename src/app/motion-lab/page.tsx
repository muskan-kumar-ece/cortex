"use client";

import { motion } from "framer-motion";
import { fade, slide, slideUp, staggerContainer } from "@/motion/variants";
import { GlassCard } from "@/components/marketing/GlassCard";
import { FloatingDecoration } from "@/components/marketing/FloatingDecoration";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { AuroraBackground } from "@/components/marketing/AuroraBackground";

export default function MotionLabPage() {
  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="container mx-auto px-4 py-24 space-y-32 max-w-7xl">
        
        {/* Intro */}
        <div className="border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Motion Lab</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Internal playground for interaction design, physics, and choreography testing. 
          </p>
        </div>

        {/* 1. Text & Stagger Motion */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">1. Text & Sequence Choreography</h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="p-12 border border-white/10 rounded-3xl bg-white/[0.01] space-y-4"
          >
            <motion.h3 variants={slide} className="text-3xl font-bold text-foreground">Sequenced Heading</motion.h3>
            <motion.p variants={fade} className="text-muted-foreground max-w-md">
              This paragraph fades in gently after the heading slides up, utilizing the staggerContainer variant to orchestrate the children.
            </motion.p>
            <motion.div variants={slideUp} className="pt-4">
              <PremiumButton>Action Button</PremiumButton>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. Hover Physics */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">2. Hover Physics & Depth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard hoverEffect="lift" glowColor="primary" className="p-8 h-48 flex items-center justify-center">
              <h3 className="font-bold">Lift Physics</h3>
            </GlassCard>
            <GlassCard hoverEffect="tilt" glowColor="accent" className="p-8 h-48 flex items-center justify-center">
              <h3 className="font-bold">3D Tilt Matrix</h3>
            </GlassCard>
            <motion.div 
              whileHover={{ scale: 0.95, rotate: -2 }}
              className="p-8 h-48 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <h3 className="font-bold">Shrink & Rotate</h3>
            </motion.div>
          </div>
        </section>

        {/* 3. 3D & Parallax Decorations */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">3. Floating 3D Elements</h2>
          <div className="relative h-[400px] border border-white/10 rounded-3xl bg-white/[0.01] overflow-hidden">
            <AuroraBackground className="opacity-50">
              <FloatingDecoration 
                className="top-1/4 left-1/4 w-32 h-32 bg-primary/20 blur-xl"
                yOffset={40}
                duration={5}
              />
              <FloatingDecoration 
                className="bottom-1/3 right-1/3 w-24 h-24 bg-accent/20 rounded-full border border-white/10 backdrop-blur-md"
                yOffset={-30}
                rotation={15}
                duration={8}
                delay={1}
              />
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <h3 className="text-2xl font-bold text-foreground">Observe background motion</h3>
              </div>
            </AuroraBackground>
          </div>
        </section>
        
        {/* 4. Experimental / Physics Constraints */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">4. Draggable / Physics Constraints</h2>
          <div className="h-[400px] border border-white/10 rounded-3xl bg-white/[0.01] relative overflow-hidden flex items-center justify-center">
            <motion.div
              drag
              dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center text-white font-bold cursor-grab shadow-2xl shadow-primary/20"
            >
              Drag Me
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
