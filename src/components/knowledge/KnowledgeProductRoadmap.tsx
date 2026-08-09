import { ProductRelease } from "@/config/products.types";
import { GitCommit, Milestone, CheckCircle2, CircleDashed } from "lucide-react";

export function KnowledgeProductRoadmap({ roadmap }: { roadmap: ProductRelease[] }) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Milestone className="w-8 h-8 text-primary" />
          Product Roadmap
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          The future of this platform. We ship aggressively and transparently.
        </p>
      </div>

      <div className="relative border-l border-border-strong ml-6 space-y-12">
        {roadmap.map((release, idx) => (
          <div key={idx} className="relative pl-10">
            <div className="absolute -left-[17px] top-1 w-8 h-8 bg-background border border-border-strong rounded-full flex items-center justify-center">
              {release.status === "Released" ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : release.status === "Beta" ? (
                <GitCommit className="w-4 h-4 text-warning" />
              ) : (
                <CircleDashed className="w-4 h-4 text-on-surface-muted" />
              )}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h4 className="text-2xl font-bold text-foreground">
                {release.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 rounded-full ${
                  release.status === "Released" ? "bg-success/10 text-success border border-success/20" :
                  release.status === "Beta" ? "bg-warning/10 text-warning border border-warning/20" :
                  "bg-surface text-on-surface-muted border border-border"
                }`}>
                  {release.status}
                </span>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 rounded-md">
                  {release.version}
                </span>
                <span className="text-sm text-on-surface-muted">
                  {release.date}
                </span>
              </div>
            </div>
            
            <p className="text-on-surface-muted text-lg max-w-3xl">
              {release.description}
            </p>
            
            <div className="bg-surface/30 rounded-xl p-6 border border-border-strong max-w-3xl">
              <ul className="space-y-3">
                {release.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-on-surface">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
