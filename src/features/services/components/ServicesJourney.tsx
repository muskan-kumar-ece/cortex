"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ArrowRight, BrainCircuit, ShieldCheck, Database, Network, Cloud, Code } from "lucide-react";
import Link from "next/link";
import { ServiceItem } from "@/cms/services/types";

const iconMap: Record<string, any> = {
  BrainCircuit,
  ShieldCheck,
  Database,
  Network,
  Cloud,
  Code
};

export function ServicesJourney({ services }: { services: ServiceItem[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-surface border-b border-border-strong relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.div variants={slideUp} className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Our Core Domains
            </h2>
            <p className="text-xl text-on-surface-muted font-light leading-relaxed">
              Targeted engineering solutions designed for high-scale enterprise environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Code;
              
              return (
                <motion.div key={service.id} variants={slideUp}>
                  <Link 
                    href={service.href}
                    className="group block h-full p-8 rounded-3xl bg-background border border-border-strong hover:border-primary/50 transition-all duration-500 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-500">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-on-surface-muted leading-relaxed font-medium mb-8">
                      {service.description}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore Capabilities
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
