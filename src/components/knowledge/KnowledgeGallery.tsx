"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface KnowledgeGalleryProps {
  gallery: {
    url: string;
    alt: string;
    span?: "col-span-1" | "col-span-2" | "row-span-2";
  }[];
}

export function KnowledgeGallery({ gallery }: KnowledgeGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="border-b border-border-strong bg-surface py-16 px-6 md:px-12 rounded-3xl">
      <div className="w-full">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div variants={slideUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Visual Overview
            </h2>
            <p className="text-lg text-on-surface-muted font-light">
              Explorations, architecture diagrams, and interface highlights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {gallery.map((image, idx) => (
              <motion.div 
                key={idx} 
                variants={slideUp}
                className={cn(
                  "relative group rounded-3xl overflow-hidden border border-border-strong bg-background cursor-pointer",
                  image.span === "col-span-2" ? "md:col-span-2" : "",
                  image.span === "row-span-2" ? "row-span-2" : ""
                )}
              >
                {/* Image */}
                <Image
                  src={image.url} 
                  alt={image.alt} 
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors duration-500 flex flex-col justify-end p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-sm font-bold text-foreground">{image.alt}</p>
                    <div className="w-8 h-8 rounded-full bg-surface-elevated/80 backdrop-blur-md flex items-center justify-center">
                      <Maximize className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
