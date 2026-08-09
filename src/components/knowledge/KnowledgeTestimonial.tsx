"use client";

import { motion } from "framer-motion";
import { slideUp } from "@/motion/variants";
import { Quote } from "lucide-react";
import Image from "next/image";

export interface KnowledgeTestimonialProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    logo?: string;
  };
}

export function KnowledgeTestimonial({ testimonial }: KnowledgeTestimonialProps) {
  if (!testimonial) return null;

  return (
    <section className=" border-b border-border-strong bg-[url('/noise.png')] bg-repeat relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />
      
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={slideUp} className="relative">
            <Quote className="absolute -top-12 -left-8 md:-top-16 md:-left-16 w-24 h-24 md:w-32 md:h-32 text-primary/10 -z-10 rotate-180" />
            
            <div className="p-8 md:p-12 lg:p-16 rounded-[2rem] border border-border bg-surface/50 backdrop-blur-xl shadow-2xl">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-snug">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-6 border-t border-border/50">
                {testimonial.logo && (
                  <div className="w-16 h-16 rounded-full bg-surface-elevated border border-border flex items-center justify-center shrink-0">
                    <Image src={testimonial.logo} alt={testimonial.company} width={40} height={40} className="object-contain opacity-80" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-lg text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-on-surface-muted">
                    {testimonial.role}, <span className="text-primary">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
