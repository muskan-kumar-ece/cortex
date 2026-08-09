"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { cn } from "@/lib/utils";

export function ProductsSection({ products }: { products: any[] }) {
  // Only take flagship products: Cortex AI, VenopAI, Sandhi
  const flagship = products.filter(p => ["cortex-ai-assistant", "venopai", "sandhi"].includes(p.slug));

  return (
    <section className="relative w-full py-24 md:py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
        <BackgroundMesh />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 flex justify-center items-center gap-2">
            <Box className="w-4 h-4" /> Flagship Products
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Enterprise platforms ready to <span className="text-primary/80">deploy.</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            We don&apos;t just build custom software. We maintain robust, scalable AI platforms available for immediate enterprise integration.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {flagship.map((product, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
                    {product.category}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.title}</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {product.shortDescription}
                  </p>
                  <PremiumButton btnStyle="glass" render={<Link href={`/products/${product.slug}`} />} nativeButton={false} className="group">
                    Explore Platform
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </PremiumButton>
                </div>

                {/* Dashboard Visual */}
                <div className="w-full lg:w-1/2 relative perspective-1000">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                  
                  <motion.div 
                    whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                      "relative aspect-[4/3] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col",
                      isEven ? "transform-gpu rotate-y-[-10deg] rotate-x-[5deg]" : "transform-gpu rotate-y-[10deg] rotate-x-[5deg]"
                    )}
                  >
                    {/* Fake Mac Header */}
                    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>

                    <div className="flex-1 p-6 flex flex-col gap-4">
                      {/* Dashboard mock rows */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10" />
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="h-4 w-1/3 bg-white/10 rounded" />
                          <div className="h-2 w-1/4 bg-white/5 rounded" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col p-4 justify-between">
                             <div className="h-2 w-8 bg-white/20 rounded" />
                             <div className="h-4 w-16 bg-white/40 rounded" />
                          </div>
                        ))}
                      </div>

                      <div className="flex-1 mt-4 rounded-lg bg-white/5 border border-white/10 p-4 flex items-end gap-2">
                        {[40, 70, 30, 90, 50, 100, 60, 80].map((h, i) => (
                           <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
