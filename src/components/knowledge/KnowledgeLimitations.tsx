import { TechnologyLimitation } from "@/constants/technology-types";
import { AlertTriangle } from "lucide-react";

export function KnowledgeLimitations({ limitations }: { limitations: TechnologyLimitation[] }) {
  if (!limitations || limitations.length === 0) return null;

  return (
    <section className=" md: bg-warning/5 rounded-3xl border border-warning/20 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <AlertTriangle className="w-64 h-64 text-warning" />
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 text-sm font-semibold uppercase tracking-wider text-warning bg-warning/10 border border-warning/20 rounded-full">
          <AlertTriangle className="w-4 h-4" />
          Trade-offs & Limitations
        </div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          When Not To Use This Technology
        </h3>
        <p className="text-xl text-on-surface max-w-3xl">
          Enterprise engineering is about choosing the right tool for the job. Here are the architectural constraints and scenarios where this stack might not be the optimal choice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {limitations.map((limitation, idx) => (
          <div 
            key={idx} 
            className="flex flex-col p-6 rounded-2xl bg-background border border-warning/20 shadow-sm"
          >
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
              {limitation.title}
            </h4>
            <p className="text-on-surface-muted leading-relaxed">
              {limitation.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
