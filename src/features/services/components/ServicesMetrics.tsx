"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { GlowLayer } from "@/components/backgrounds/GlowLayer";

export function ServicesMetrics({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden border-b border-border">
      <GlowLayer color="primary" opacity={0.1} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Left Content */}
          <div className="w-full md:w-1/3">
            <motion.div variants={slideUp} className="sticky top-32">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                {data.title}
              </h2>
              <p className="text-xl text-on-surface-muted font-light leading-relaxed">
                {data.description}
              </p>
            </motion.div>
          </div>

          {/* Right Metrics Grid */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.items.map((item: any, idx: number) => {
                const TrendIcon = item.trend === "up" ? ArrowUpRight : item.trend === "down" ? ArrowDownRight : Minus;
                const trendColor = item.trend === "up" ? "text-emerald-500" : item.trend === "down" ? "text-blue-500" : "text-muted-foreground";

                return (
                  <motion.div 
                    key={idx} 
                    variants={slideUp}
                    className="group flex flex-col p-8 rounded-3xl bg-surface/40 backdrop-blur-sm border border-border-strong hover:border-primary/50 hover:bg-surface/60 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-muted">
                        Metric_0{idx + 1}
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border ${trendColor}`}>
                        <TrendIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-5xl md:text-6xl font-bold text-foreground font-mono tracking-tighter mb-4 drop-shadow-sm group-hover:text-primary transition-colors">
                      {item.value}
                    </h3>
                    <p className="text-sm font-medium text-on-surface-muted uppercase tracking-wider leading-snug">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
