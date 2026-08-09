"use client";

import { motion } from "framer-motion";
import { Activity, Factory, LineChart, ShoppingCart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PremiumButton } from "@/components/marketing/PremiumButton";

const IconMap: Record<string, React.ElementType> = {
  Activity,
  LineChart,
  ShoppingCart,
  Factory
};

export function IndustriesSection({ industries }: { industries: any[] }) {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden border-t border-border-strong">
      {/* Network Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              <circle cx="0" cy="0" r="1.5" className="fill-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-grid)" />
        </svg>
      </div>
      
      {/* Radial fade for the grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(var(--background),1)_80%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Global Infrastructure
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Engineered for <span className="text-on-surface-muted">highly regulated domains.</span>
          </h3>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {industries.map((industry: any, idx: number) => {
            const Icon = IconMap[industry.icon] || Activity;
            
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border-strong bg-surface/50 backdrop-blur-sm p-8 md:p-10 flex flex-col h-full min-h-[350px] transition-colors hover:border-primary/50 hover:bg-surface"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-foreground mb-3">{industry.title}</h4>
                  <p className="text-on-surface-muted leading-relaxed mb-8 flex-1">{industry.description}</p>
                  
                  <div className="mt-auto">
                    <div className="text-xs font-mono text-on-surface-muted uppercase tracking-wider mb-3">Core Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {industry.technologies && industry.technologies.slice(0, 3).map((tech: any) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <PremiumButton btnStyle="glass" render={<Link href="/industries" />} nativeButton={false} className="group">
            View All Industries
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  );
}
