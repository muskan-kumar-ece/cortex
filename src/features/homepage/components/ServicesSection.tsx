"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ServiceItem } from "@/cms/services/types";
import { AiNetworkVisual } from "@/components/visuals/AiNetworkVisual";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";
import { DataVisualizationVisual } from "@/components/visuals/DataVisualizationVisual";
import { EnterpriseDashboardVisual } from "@/components/visuals/EnterpriseDashboardVisual";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PremiumButton } from "@/components/marketing/PremiumButton";

const VisualMap: Record<string, React.ReactNode> = {
  "ai": <AiNetworkVisual />,
  "web": <EnterpriseDashboardVisual />,
  "cloud": <CloudArchitectureVisual />,
  "devops": <DataVisualizationVisual /> // Using this as a stand-in for DevOps flow
};

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-background">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="mb-24 md:mb-32 max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Core Capabilities
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            We architect and deploy <br className="hidden md:block"/>
            <span className="text-on-surface-muted">mission-critical systems.</span>
          </p>
        </div>

        <div className="relative">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={service.id} 
                className="sticky top-24 min-h-[70vh] flex items-center py-12"
                style={{ zIndex: idx }}
              >
                {/* 
                  We use Framer Motion to create a depth effect where older cards 
                  scale down slightly and fade as new ones stick over them. 
                */}
                <motion.div 
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center bg-background/95 backdrop-blur-xl border border-border-strong rounded-3xl p-8 lg:p-16 shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  
                  {/* Content Side */}
                  <div className={`flex flex-col gap-8 ${isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{service.title}</h3>
                      <p className="text-lg md:text-xl text-on-surface-muted leading-relaxed">{service.description}</p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-border">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">The Challenge</h4>
                        <p className="text-on-surface-muted leading-relaxed">{service.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Our Architecture</h4>
                        <p className="text-on-surface-muted leading-relaxed">{service.howWeBuildIt}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Business Outcome</h4>
                        <p className="text-on-surface-muted leading-relaxed">{service.businessOutcome}</p>
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-mono text-on-surface-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <PremiumButton btnStyle="ghost" render={<Link href={service.href} />} nativeButton={false} className="group shrink-0">
                        Explore Architecture
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </PremiumButton>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`relative w-full aspect-square lg:aspect-auto lg:h-[600px] ${isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
                    {VisualMap[service.id] || <AiNetworkVisual />}
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
