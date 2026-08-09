"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { ArrowRight, ArrowUpRight, TrendingUp, Users, Zap } from "lucide-react";
import { useRef } from "react";
import { PremiumButton } from "@/components/marketing/PremiumButton";

const PROJECT_METRICS = [
  { value: "340%", label: "Revenue Growth", icon: TrendingUp },
  { value: "2.1×", label: "Team Velocity", icon: Users },
  { value: "99.9%", label: "System Uptime", icon: Zap },
];

export function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (!projects.length) return null;

  return (
    <section ref={containerRef} className="relative w-full bg-background border-t border-border-strong pb-32">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none -z-10 overflow-hidden">
        {/* Deep ambient glow for the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Featured Work
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              Engineering <span className="text-on-surface-muted">Outcomes.</span>
            </h3>
          </div>
          <PremiumButton btnStyle="ghost" render={<Link href="/portfolio" />} nativeButton={false} className="group shrink-0 border border-border">
            View All Work <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </PremiumButton>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, idx) => {
            const metric = PROJECT_METRICS[idx % PROJECT_METRICS.length];
            const MetricIcon = metric.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-12"
              >
                {/* Massive Image Container */}
                <Link href={`/portfolio/${project.slug}`} className="group relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-surface border border-border-strong block">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Abstract placeholder for the product screen */}
                  <div className="absolute inset-x-8 md:inset-x-24 bottom-0 top-16 md:top-24 rounded-t-3xl border-t border-x border-border-strong bg-background overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                    {/* Fake App Header */}
                    <div className="h-10 border-b border-border-strong bg-surface flex items-center px-4 gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      <div className="ml-4 h-4 w-32 bg-border rounded" />
                    </div>
                    {/* Fake App Body */}
                    <div className="p-6 md:p-10 h-full flex flex-col gap-6">
                      <div className="flex justify-between">
                        <div className="w-1/3 h-8 bg-surface rounded-lg border border-border" />
                        <div className="w-12 h-8 bg-surface rounded-lg border border-border" />
                      </div>
                      <div className="flex-1 bg-surface rounded-xl border border-border flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-[10px] border-primary/20 border-t-primary animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                    </div>
                  </div>

                  {/* Overlay Action */}
                  <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </Link>

                {/* Content & Metrics Split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start px-4 md:px-12">
                  <div className="col-span-1 md:col-span-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 bg-primary/10 text-primary">
                        {project.industry}
                      </span>
                      <span className="text-sm font-mono text-on-surface-muted uppercase tracking-widest">{project.client}</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">The Challenge</h5>
                        <p className="text-lg text-on-surface-muted leading-relaxed">
                          {project.problem?.[0]?.description || project.summary}
                        </p>
                      </div>
                      {project.solution?.[0]?.description && (
                        <div>
                          <h5 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">The Solution</h5>
                          <p className="text-lg text-on-surface-muted leading-relaxed">
                            {project.solution[0].description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end w-full">
                    <div className="w-full h-full min-h-[160px] rounded-3xl border border-primary/20 bg-primary/5 shadow-[inset_0_0_20px_rgba(var(--primary),0.05)] p-8 flex flex-col items-center justify-center text-center">
                      <MetricIcon className="w-6 h-6 mb-4 text-primary" />
                      <span className="text-5xl font-black text-foreground mb-2">
                        {metric.value}
                      </span>
                      <span className="text-xs text-primary font-mono uppercase tracking-widest">{metric.label}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

