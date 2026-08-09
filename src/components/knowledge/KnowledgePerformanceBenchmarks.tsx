import { TechnologyPerformance } from "@/constants/technology-types";
import { Gauge, ArrowUpRight } from "lucide-react";

export function KnowledgePerformanceBenchmarks({ performance }: { performance: TechnologyPerformance[] }) {
  if (!performance || performance.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Performance Benchmarks
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          Empirical data and performance metrics collected from our production deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performance.map((perf, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col p-6 rounded-2xl border border-border-strong bg-surface/30 hover:bg-surface hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Gauge className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
            </div>
            
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {perf.value}
            </div>
            
            <h4 className="text-sm font-semibold text-on-surface uppercase tracking-wider">
              {perf.metric}
            </h4>
            
            <p className="text-sm text-on-surface-muted mt-auto">
              {perf.context}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
