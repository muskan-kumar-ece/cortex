"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { ArrowRight, Box, Activity, Library, Layers } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/marketing/GlassCard";

export interface KnowledgeRelatedContentProps {
  relatedGroups: {
    domain: "Services" | "Industries" | "Case Studies" | "Resources" | "Products" | "Technologies" | "Solutions";
    items: {
      slug: string;
      title: string;
      shortDescription?: string;
    }[];
  }[];
}

const iconMap: Record<string, any> = {
  "Services": Box,
  "Industries": Activity,
  "Case Studies": Layers,
  "Resources": Library,
  "Products": Box,
  "Technologies": Layers,
  "Solutions": Activity,
};

const pathMap: Record<string, string> = {
  "Services": "/services",
  "Industries": "/industries",
  "Case Studies": "/portfolio",
  "Resources": "/resources",
  "Products": "/products",
  "Technologies": "/technologies",
  "Solutions": "/solutions",
};

export function KnowledgeRelatedContent({ relatedGroups }: KnowledgeRelatedContentProps) {
  if (!relatedGroups || relatedGroups.length === 0) return null;

  return (
    <section className="bg-surface-elevated border-b border-border/50 py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div variants={slideUp} className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground border-b border-border-strong">
              Continue Exploring
            </h2>
          </motion.div>

          <div className="space-y-16">
            {relatedGroups.map((group, groupIdx) => {
              const Icon = iconMap[group.domain];
              const basePath = pathMap[group.domain];
              
              if (!group.items || group.items.length === 0) return null;

              return (
                <div key={groupIdx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {group.domain}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((item, idx) => (
                      <motion.div key={idx} variants={slideUp}>
                        <Link href={`${basePath}/${item.slug}`}>
                          <GlassCard className="h-full p-6 border-border-strong bg-background/50 hover:bg-background hover:border-primary/50 transition-colors group flex flex-col justify-between">
                            <div>
                              <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm text-on-surface-muted line-clamp-2">
                                {item.shortDescription}
                              </p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-primary font-medium text-sm">
                              Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </GlassCard>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
