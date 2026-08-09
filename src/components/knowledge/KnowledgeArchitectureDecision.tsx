import { ArchitectureDecision } from "@/constants/case-study-types";
import { Network, Server, GitMerge, FileCode, CheckCircle2 } from "lucide-react";

export function KnowledgeArchitectureDecision({ decisions }: { decisions: ArchitectureDecision[] }) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Architecture Decision Log
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          Engineering is about tradeoffs. Here is the technical reasoning behind our core architectural choices for this project.
        </p>
      </div>

      <div className="space-y-8">
        {decisions.map((decision, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col md:flex-row gap-6 p-8 rounded-3xl border border-border-strong bg-surface/30 hover:bg-surface/80 transition-colors"
          >
            <div className="md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border-strong md: md:pr-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <FileCode className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  {decision.technology}
                </h4>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {decision.question}
              </p>
            </div>
            
            <div className="md:w-2/3 flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-lg text-on-surface leading-relaxed">
                  {decision.reasoning}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
