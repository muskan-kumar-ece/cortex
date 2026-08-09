"use client";

import { motion } from "framer-motion";
import { EngineeringExcellenceData } from "@/cms/homepage/types";
import { cn } from "@/lib/utils";
import { Server, Database, Globe, Shield, Terminal, Settings } from "lucide-react";

const TechIconMap: Record<string, React.ElementType> = {
  react: Globe,
  nextjs: Globe,
  typescript: Terminal,
  python: Terminal,
  django: Server,
  postgresql: Database,
  aws: Server,
  docker: Settings,
  openai: Server,
  redis: Database,
  kubernetes: Settings
};

export function EngineeringExcellenceSection({ data }: { data: EngineeringExcellenceData }) {
  // Stack layers
  const layers = [
    { title: "Application Edge", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { title: "Microservices & APIs", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
    { title: "Distributed Data", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    { title: "Infrastructure & DevOps", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" }
  ];
  // Hardcoded for visual presentation in the Blueprint layer
  const technologies = [
    { id: "react", name: "React" },
    { id: "nextjs", name: "Next.js" },
    { id: "typescript", name: "TypeScript" },
    { id: "python", name: "Python" },
    { id: "django", name: "Django" },
    { id: "postgresql", name: "PostgreSQL" },
    { id: "aws", name: "AWS" },
    { id: "docker", name: "Docker" },
    { id: "openai", name: "OpenAI" },
    { id: "redis", name: "Redis" },
    { id: "kubernetes", name: "Kubernetes" }
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden border-t border-border-strong">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="1" />
            </pattern>
            <pattern id="blueprint-large" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#3b82f6" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
          <rect width="100%" height="100%" fill="url(#blueprint-large)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4">
            System Architecture
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            The Tech Stack <span className="text-blue-500/70">Blueprint.</span>
          </h3>
          <p className="text-lg text-on-surface-muted leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* 3D Blueprint Diagram */}
        <div className="max-w-5xl mx-auto relative perspective-1000">
          <div className="flex flex-col gap-6" style={{ transformStyle: "preserve-3d" }}>
            {layers.map((layer, idx) => {
              // Group some dummy techs into layers for the visual representation
              const layerTechs = technologies.slice(idx * 3, (idx + 1) * 3);
              
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, rotateX: 30, y: 50, z: -100 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15, type: "spring" }}
                  className={cn(
                    "relative w-full rounded-2xl border p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden",
                    layer.bg, layer.border
                  )}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="font-mono text-8xl font-black">{idx + 1}</span>
                  </div>

                  <div className="relative z-10 w-full md:w-1/3">
                    <h4 className={cn("text-xl font-bold mb-2", layer.color)}>{layer.title}</h4>
                    <p className="text-sm text-on-surface-muted">Scalable, resilient, and optimized for performance.</p>
                  </div>

                  <div className="relative z-10 flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {layerTechs.map((tech) => {
                      const Icon = TechIconMap[tech.id] || Server;
                      return (
                        <div key={tech.id} className="flex items-center gap-3 bg-background/50 border border-border rounded-xl p-3">
                          <div className={cn("p-2 rounded-lg bg-background", layer.border, layer.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Connection Lines running down */}
          <div className="absolute top-10 bottom-10 left-8 md:left-[30%] w-px bg-gradient-to-b from-blue-500/50 via-blue-500/50 to-transparent -z-10 hidden md:block">
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
