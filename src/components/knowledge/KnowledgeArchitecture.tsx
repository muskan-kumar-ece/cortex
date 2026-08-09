"use client";

import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";
import { DataVisualizationVisual } from "@/components/visuals/DataVisualizationVisual";
import { AiNetworkVisual } from "@/components/visuals/AiNetworkVisual";

interface ArchitectureData {
  title: string;
  description: string;
  diagramFeatures: string[];
}

export function KnowledgeArchitecture({ data, slug }: { data: ArchitectureData; slug: string }) {
  // Select a visual based on slug context for dynamic enterprise feel
  const renderVisual = () => {
    if (slug.includes("ai") || slug.includes("machine") || slug.includes("data")) {
      return <AiNetworkVisual />;
    }
    if (slug.includes("web") || slug.includes("mobile") || slug.includes("frontend")) {
      return <DataVisualizationVisual />;
    }
    return <CloudArchitectureVisual />;
  };

  return (
    <section className=" relative bg-background border-t border-border overflow-hidden">
      <div className="w-full">
        <div className=" text-center max-w-3xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary flex items-center justify-center gap-2">
            <Network className="w-3.5 h-3.5" />
            System Topology
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {data.title}
          </h2>
          <p className="text-lg text-on-surface-muted leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="h-[400px] md:h-[600px] relative rounded-3xl overflow-hidden border border-border bg-surface/50 shadow-2xl flex items-center justify-center">
            {/* The Visual */}
            {renderVisual()}
            
            {/* Overlay Grid for context */}
            <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Diagram Features below */}
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.diagramFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="px-4 rounded-lg border border-border-strong bg-surface text-center shadow-sm"
              >
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
