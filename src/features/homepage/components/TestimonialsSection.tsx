"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { TestimonialItem } from "@/cms/testimonials/types";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive(p => (p + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive(p => (p - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  const current = testimonials[active];

  const variants: Variants = {
    enter: (dir: number) => ({ 
      x: dir > 0 ? 100 : -100, 
      opacity: 0, 
      rotateY: dir > 0 ? 10 : -10,
      scale: 0.9,
      filter: "blur(10px)" 
    }),
    center: { 
      x: 0, 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring", bounce: 0.2 } 
    },
    exit: (dir: number) => ({ 
      x: dir > 0 ? -100 : 100, 
      opacity: 0, 
      rotateY: dir > 0 ? -10 : 10,
      scale: 0.9,
      filter: "blur(10px)",
      transition: { duration: 0.5 }
    }),
  };

  return (
    <section className="relative w-full py-32 overflow-hidden bg-background border-t border-border-strong perspective-1000">
      
      {/* Background radial depth lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Trusted Engineering</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            Voices from <span className="text-on-surface-muted">industry leaders.</span>
          </h3>
        </motion.div>

        {/* 3D Glass Carousel Container */}
        <div className="relative w-full min-h-[400px] md:min-h-[350px] flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface/40 backdrop-blur-3xl shadow-2xl p-8 md:p-16 group">
                
                {/* Deep Glass Noise Texture */}
                <div 
                  className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                />

                {/* Specular Edge Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <Quote className="w-12 h-12 text-primary/30 mb-8 relative z-10" />

                <blockquote className="text-2xl md:text-4xl font-semibold leading-tight text-foreground mb-12 relative z-10 max-w-4xl text-balance">
                  &ldquo;{current?.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      {current?.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{current?.author}</div>
                      <div className="text-sm font-mono text-on-surface-muted uppercase tracking-widest mt-1">
                        {current?.role} · {current?.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cinematic Controls */}
        {testimonials.length > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-16"
          >
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border-strong bg-surface/50 backdrop-blur-md flex items-center justify-center text-on-surface-muted hover:text-foreground hover:border-primary/50 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active ? "w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" : "w-2 bg-border-strong hover:bg-border"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border-strong bg-surface/50 backdrop-blur-md flex items-center justify-center text-on-surface-muted hover:text-foreground hover:border-primary/50 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
