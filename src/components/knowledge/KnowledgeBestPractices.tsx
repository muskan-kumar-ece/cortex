import { TechnologyBestPractice } from "@/constants/technology-types";
import { CheckCircle, XCircle } from "lucide-react";

export function KnowledgeBestPractices({ practices }: { practices: TechnologyBestPractice[] }) {
  if (!practices || practices.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Engineering Best Practices
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          Guidelines and architectural standards we enforce when deploying this technology in enterprise environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practices.map((practice, idx) => (
          <div 
            key={idx} 
            className="flex flex-col p-6 md:p-8 rounded-2xl border border-border-strong bg-surface/30 hover:bg-surface/60 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={` flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                practice.type === "do" 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-error/10 text-error border-error/20"
              }`}>
                {practice.type === "do" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
              <div>
                <div className={`text-xs font-bold uppercase tracking-wider ${
                  practice.type === "do" ? "text-success" : "text-error"
                }`}>
                  {practice.type === "do" ? "Do This" : "Don't Do This"}
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  {practice.title}
                </h4>
              </div>
            </div>
            
            <p className="text-on-surface-muted leading-relaxed pl-12">
              {practice.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
