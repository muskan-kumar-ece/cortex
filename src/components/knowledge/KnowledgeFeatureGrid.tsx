import { ProductFeature } from "@/config/products.types";
import { CheckCircle2, Zap, ShieldCheck, Database, Lock, Activity, Cpu } from "lucide-react";

const iconMap: Record<string, any> = {
  CheckCircle2,
  Zap,
  ShieldCheck,
  Database,
  Lock,
  Activity,
  Cpu
};

export function KnowledgeFeatureGrid({ features }: { features: ProductFeature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Core Capabilities
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          Engineered for performance, security, and scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : CheckCircle2;
          
          return (
            <div 
              key={idx} 
              className="flex flex-col p-6 md:p-8 rounded-2xl border border-border-strong bg-surface/30 hover:bg-surface/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-foreground">
                {feature.title}
              </h4>
              <p className="text-on-surface-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
