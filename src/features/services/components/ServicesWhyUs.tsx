"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Shield, Zap, Users, Hexagon } from "lucide-react";

const iconMap: Record<string, any> = {
  Shield,
  Zap,
  Users,
  Hexagon
};

export function ServicesWhyUs({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div variants={slideUp} className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                {data.title}
              </h2>
              <p className="text-xl text-on-surface-muted font-light leading-relaxed">
                {data.intro}
              </p>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.reasons.map((reason: any, idx: number) => {
              const Icon = reason.icon && iconMap[reason.icon] ? iconMap[reason.icon] : Hexagon;
              
              return (
                <motion.div 
                  key={idx} 
                  variants={slideUp}
                  className="group relative p-8 rounded-3xl bg-surface/30 border border-border-strong overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-on-surface-muted leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
