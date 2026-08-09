import { TrendingUp, ArrowRight } from "lucide-react";

export interface KnowledgeRoiProps {
  roi: {
    description: string;
    percentage: string;
    timeframe: string;
  };
}

export function KnowledgeRoi({ roi }: KnowledgeRoiProps) {
  if (!roi) return null;

  return (
    <section className=" md:">
      <div className="relative p-12 lg:p-20 rounded-[3rem] bg-surface-elevated border border-border overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-primary group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
          <TrendingUp className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 text-sm font-bold uppercase tracking-wider text-success bg-success/10 border border-success/20 rounded-full">
              <TrendingUp className="w-4 h-4" />
              Return on Investment
            </div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Measurable Business Outcomes
            </h3>
            <p className="text-xl text-on-surface-muted leading-relaxed">
              {roi.description}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-[0_0_40px_-15px_rgba(var(--color-primary),0.3)]">
              <span className="block text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
                Projected ROI
              </span>
              <span className="block text-6xl md:text-8xl font-black tracking-tighter">
                {roi.percentage}
              </span>
            </div>
            
            <div className="p-8 rounded-3xl border border-border-strong bg-surface/30">
              <span className="block text-sm font-bold uppercase tracking-wider text-on-surface-muted">
                Payback Period
              </span>
              <span className="block text-3xl font-bold text-foreground">
                {roi.timeframe}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
