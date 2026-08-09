"use client";

import { ResourceDetailsData } from "@/cms/resources/types";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { Clock, BarChart, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function KnowledgeArticleHero({ data }: { data: ResourceDetailsData }) {
  return (
    <section className="relative w-full pt-32 pb-24 flex flex-col justify-center overflow-hidden bg-background border-b border-border">
      {/* Background System */}
      <BackgroundMesh />
      <SpotlightLayer />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-8 font-medium">
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/resources?category=${data.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {data.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-on-surface line-clamp-1">{data.title}</span>
          </nav>

          {/* Meta Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary-hover rounded-full">
              {data.contentType}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            {data.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-on-surface leading-relaxed max-w-3xl mb-12"
          >
            {data.excerpt}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 pt-8 border-t border-border-strong"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-lg text-primary shadow-inner">
                {data.author.avatarPlaceholder || data.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{data.author.name}</p>
                <p className="text-sm text-on-surface-muted">{data.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-on-surface-muted font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/70" />
                {new Date(data.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning/70" />
                {data.readingTime}
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-info/70" />
                {data.difficulty}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
