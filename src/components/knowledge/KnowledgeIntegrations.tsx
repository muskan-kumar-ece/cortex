import { TechnologyIntegration } from "@/constants/technology-types";
import { Plug2 } from "lucide-react";

export function KnowledgeIntegrations({ integrations }: { integrations: TechnologyIntegration[] }) {
  if (!integrations || integrations.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Key Integrations & Ecosystem
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          Technologies do not exist in isolation. Here is how we typically integrate this component into broader enterprise architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col p-8 rounded-2xl border border-border-strong bg-surface/30 hover:bg-surface hover:border-primary/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <Plug2 className="w-6 h-6" />
            </div>
            
            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {integration.name}
            </h4>
            <p className="text-on-surface-muted leading-relaxed">
              {integration.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
