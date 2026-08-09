import { SolutionProblem } from "@/config/solutions.types";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export function KnowledgeProblemGrid({ problems }: { problems: SolutionProblem[] }) {
  if (!problems || problems.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Core Business Problems
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          The structural friction points we eliminate for our enterprise partners.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {problems.map((item, idx) => (
          <div 
            key={idx} 
            className="group grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-border-strong bg-surface/30 relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-error/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* The Problem */}
            <div className="md:col-span-5 p-8 border-b md:border-b-0 md:border-r border-border-strong bg-background/50 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error border border-error/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-foreground">The Challenge</h4>
              </div>
              <h5 className="text-2xl font-semibold text-error">{item.problem}</h5>
              <p className="text-on-surface-muted leading-relaxed">
                <strong className="text-on-surface font-semibold block">Business Impact:</strong>
                {item.impact}
              </p>
            </div>
            
            {/* Arrow Divider (Desktop only) */}
            <div className="hidden md:flex absolute left-[41.666%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border-strong items-center justify-center text-on-surface-muted z-10 group-hover:text-primary transition-colors group-hover:border-primary/50 group-hover:scale-110 duration-500">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* The Solution */}
            <div className="md:col-span-7 p-8 pl-8 md:pl-12 bg-surface/10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success border border-success/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Our Solution</h4>
              </div>
              <p className="text-lg md:text-xl text-on-surface leading-relaxed font-medium">
                {item.solution}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
