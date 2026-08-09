"use client";

import { KnowledgeCenterData, ResourceItem } from "@/cms/resources/types";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/marketing/GlassCard";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function KnowledgeCenter({ data }: { data: KnowledgeCenterData }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRecent = activeCategory === "All" 
    ? data.recentArticles 
    : data.recentArticles.filter(a => a.category === activeCategory);

  return (
    <section className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Category Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 no-scrollbar border-b border-border">
          {data.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-t-lg font-medium text-sm transition-colors border-b-2",
                activeCategory === category 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-on-surface-muted hover:text-foreground hover:bg-surface"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Editorial Article (Only show on 'All' or if a featured article matches the category) */}
        {data.featuredArticles.length > 0 && activeCategory === "All" && (
          <div className="mb-24">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Featured Story
            </h3>
            
            <Link href={data.featuredArticles[0].href} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border bg-surface/50 hover:border-primary/50 transition-colors duration-500"
              >
                {/* Visual Half */}
                <div className="relative h-[300px] lg:h-[500px] bg-background border-r border-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-on-surface-faint font-mono text-sm tracking-wider uppercase">
                      {data.featuredArticles[0].heroImagePlaceholder}
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background border border-border rounded-full text-primary">
                      {data.featuredArticles[0].category}
                    </span>
                    <span className="text-sm text-on-surface-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {data.featuredArticles[0].readingTime}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 group-hover:text-primary-hover transition-colors">
                    {data.featuredArticles[0].title}
                  </h2>
                  
                  <p className="text-lg text-on-surface-muted mb-8 leading-relaxed">
                    {data.featuredArticles[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-on-surface-muted">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{data.featuredArticles[0].author.name}</p>
                        <p className="text-xs text-on-surface-muted">{data.featuredArticles[0].author.role}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Standard Grid */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-8">
            Latest Publications
          </h3>
          
          {filteredRecent.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-border rounded-2xl">
              <p className="text-on-surface-muted">No articles found for this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecent.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={article.href} className="group h-full block">
                    <GlassCard className="h-full flex flex-col p-6 border-border hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-surface border border-border rounded-md text-on-surface">
                          {article.contentType}
                        </span>
                        <span className="text-xs font-mono text-on-surface-muted">
                          {article.publishedAt}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary-hover transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      
                      <p className="text-sm text-on-surface-muted mb-8 line-clamp-3 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <span className="text-xs font-medium text-on-surface-muted">
                          By {article.author.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
