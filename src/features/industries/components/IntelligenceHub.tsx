"use client";

import React from "react";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/marketing/GlassCard";
import { Activity, LineChart, ShoppingCart, Factory, CheckCircle2, AlertTriangle, Lightbulb, GitMerge } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  Activity,
  LineChart,
  ShoppingCart,
  Factory
};

export function IntelligenceHub({ data }: { data: any }) {
  return (
    <section className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">
            {data.title}
          </h2>
          <p className="text-lg text-on-surface-muted">
            {data.description}
          </p>
        </div>

        <div className="space-y-32">
          {data.industries.map((industry: any, index: number) => {
            const Icon = iconMap[industry.icon as keyof typeof iconMap] || Activity;
            const isReversed = index % 2 !== 0;

            return (
              <motion.div 
                key={industry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex flex-col lg:flex-row gap-12",
                  isReversed ? "lg:flex-row-reverse" : ""
                )}
              >
                {/* Left Column: Core Identity & Challenges */}
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-surface border border-border-strong flex items-center justify-center text-primary">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground tracking-tight">{industry.title}</h3>
                      <p className="text-on-surface-muted text-sm mt-1">{industry.description}</p>
                    </div>
                  </div>

                  <p className="text-lg text-on-surface leading-relaxed">
                    {industry.overview}
                  </p>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" /> 
                      Core Challenges
                    </h4>
                    <ul className="space-y-3">
                      {industry.challenges.map((challenge: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                          <span className="text-on-surface">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-info" /> 
                      Provided Solutions
                    </h4>
                    <ul className="space-y-3">
                      {industry.solutions.map((solution: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-info mt-2" />
                          <span className="text-on-surface">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Workflows, Tech & Outcomes */}
                <div className="flex-1">
                  <GlassCard className="p-8 h-full flex flex-col justify-between border-border-strong bg-surface/50">
                    <div className="space-y-10">
                      
                      {/* Example Workflow */}
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-6 flex items-center gap-2">
                          <GitMerge className="w-4 h-4 text-primary" />
                          Example Workflow
                        </h4>
                        <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-on-surface-muted overflow-hidden">
                          {industry.workflowSteps.map((step: any, idx: number) => (
                            <React.Fragment key={idx}>
                              <span className="px-3 py-1.5 rounded-md bg-background border border-border shrink-0">{step}</span>
                              {idx < industry.workflowSteps.length - 1 && (
                                <div className="h-[1px] flex-1 bg-border-strong min-w-[10px]" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-4">
                          Relevant Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {industry.technologies.map((tech: any, idx: number) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary-hover text-xs font-semibold">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Business Outcome */}
                    <div className="mt-12 p-6 rounded-xl bg-success/5 border border-success/20">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-success mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Business Outcome
                      </h4>
                      <p className="text-lg text-foreground font-medium leading-relaxed">
                        &quot;{industry.businessOutcome}&quot;
                      </p>
                    </div>

                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

