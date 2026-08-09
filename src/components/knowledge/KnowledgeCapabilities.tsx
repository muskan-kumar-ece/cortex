import { SolutionCapability } from "@/config/solutions.types";
import { LayoutGrid, Cpu, Bot, Settings2, ShieldCheck, Zap } from "lucide-react";

export function KnowledgeCapabilities({ capabilities }: { capabilities: SolutionCapability[] }) {
  if (!capabilities || capabilities.length === 0) return null;

  // Map generic icons to create a dynamic feel since we don't have explicit icons mapped in DB
  const icons = [Cpu, Bot, Settings2, ShieldCheck, Zap, LayoutGrid];

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Core Capabilities
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          The technical primitives and execution frameworks we deploy to solve your structural challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl border border-border-strong bg-surface/30 hover:bg-surface hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6" />
              </div>
              
              <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {cap.title}
              </h4>
              <p className="text-on-surface-muted leading-relaxed">
                {cap.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
