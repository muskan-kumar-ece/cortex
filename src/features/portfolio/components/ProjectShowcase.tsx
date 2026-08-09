"use client";


import { motion } from "framer-motion";
import { GlassCard } from "@/components/marketing/GlassCard";
import { ArrowRight, Layers, Target, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { NeonButton } from "@/components/marketing/NeonButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ProjectShowcase({ data }: { data: any }) {
  return (
    <section className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">
            {data.title}
          </h2>
          <p className="text-lg text-on-surface-muted">
            {data.description}
          </p>
        </div>

        <div className="space-y-32">
          {data.projects.map((project: any, index: number) => {
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-12"
              >
                
                {/* Visual Anchor (Hero Image Placeholder) */}
                <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group border border-border">
                  <div className="absolute inset-0 bg-surface/50" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-info/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  {/* Mock UI for Hero Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-xl border border-border-strong bg-background/50 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden">
                      <div className="h-8 border-b border-border-strong bg-surface/50 flex items-center px-4 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-error/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-on-surface-faint font-mono text-sm tracking-wider uppercase">
                          {project.heroImagePlaceholder}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left Column: The Story */}
                  <div className="lg:col-span-8 space-y-10">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-surface border border-border rounded-full text-on-surface-muted">
                          {project.industry}
                        </span>
                        <span className="text-sm text-on-surface-muted font-medium">Client: {project.client}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                        {project.title}
                      </h3>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-warning mb-3">
                          <Target className="w-4 h-4" />
                          Business Challenge
                        </h4>
                        <p className="text-lg text-on-surface leading-relaxed">{project.challenge?.description || project.challenge}</p>
                      </div>

                      <div className="pl-6 border-l-2 border-primary/30">
                        <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                          <Layers className="w-4 h-4" />
                          Engineered Solution
                        </h4>
                        <p className="text-lg text-on-surface leading-relaxed mb-4">{Array.isArray(project.solution) ? project.solution.map((s: any) => s.title || s).join(', ') : project.solution}</p>
                        <p className="text-sm font-mono text-on-surface-muted">
                          <span className="text-primary/70">Architecture:</span> {project.architecture?.title || project.architecture}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Execution & Metrics */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <GlassCard className="p-6 border-border-strong bg-surface/30">
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-4">
                        <Clock className="w-4 h-4" />
                        Execution Timeline
                      </h4>
                      <p className="text-foreground font-medium">{Array.isArray(project.timeline) ? 'Enterprise Delivery' : project.timeline}</p>
                    </GlassCard>

                    <GlassCard className="p-6 border-border-strong bg-surface/30">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-4">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech: any) => (
                          <span key={tech} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-elevated border border-border text-on-surface">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard className="p-6 border-border-strong bg-surface/30 flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-6">
                        Outcome Metrics
                      </h4>
                      <div className="space-y-6">
                        {(project.outcomeMetrics || project.metrics)?.map((metric: any, idx: number) => {
                          const isUp = metric.trend === "up";
                          const isDown = metric.trend === "down";
                          
                          return (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-sm font-medium text-on-surface-muted">{metric.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xl font-bold text-foreground">
                                  {metric.value}
                                </span>
                                {isUp && <TrendingUp className="w-4 h-4 text-success" />}
                                {isDown && <TrendingDown className="w-4 h-4 text-error" />}
                                {!metric.trend && <Minus className="w-4 h-4 text-primary" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* Bottom CTA for Project */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-6 items-center justify-between">
                  <p className="text-on-surface-muted text-sm max-w-xl">
                    <strong className="text-foreground">Impact:</strong> {project.businessImpact?.description || project.businessImpact}
                  </p>
                  <Link href={`/portfolio/${project.slug}`} className="shrink-0">
                     <NeonButton className="h-10 px-6 group">
                        Read Full Case Study
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </NeonButton>
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}









