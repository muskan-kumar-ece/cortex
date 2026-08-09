import { ContentBlock } from "@/cms/resources/types";
import { KnowledgeCodeBlock } from "./KnowledgeCodeBlock";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { AiNetworkVisual } from "@/components/visuals/AiNetworkVisual";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";
import { EnterpriseDashboardVisual } from "@/components/visuals/EnterpriseDashboardVisual";
import { DataVisualizationVisual } from "@/components/visuals/DataVisualizationVisual";

const VisualMap = {
  AiNetworkVisual,
  CloudArchitectureVisual,
  EnterpriseDashboardVisual,
  DataVisualizationVisual
};

export function KnowledgeContent({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-8 text-on-surface">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level;
            const sizeClass = {
              h2: "text-3xl md:text-4xl font-bold mt-16 mb-6 text-foreground tracking-tight",
              h3: "text-2xl md:text-3xl font-semibold mt-12 mb-4 text-foreground",
              h4: "text-xl md:text-2xl font-medium mt-8 mb-4 text-foreground"
            }[block.level];
            
            // The id is used for the Table of Contents linking
            const id = block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return <Tag key={block.id} id={id} className={`scroll-m-24 ${sizeClass}`}>{block.text}</Tag>;
          }
          
          case "paragraph":
            // Normally you would use dangerouslySetInnerHTML for safe markdown
            return (
              <p key={block.id} className="text-lg leading-relaxed mb-6">
                {block.text}
              </p>
            );

          case "code":
            return (
              <KnowledgeCodeBlock 
                key={block.id}
                code={block.code}
                language={block.language}
                filename={block.filename}
                highlightLines={block.highlightLines}
              />
            );

          case "architecture": {
            const VisualComponent = VisualMap[block.visualType];
            return (
              <figure key={block.id} className="my-12">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border-strong relative bg-surface/30">
                  {VisualComponent ? <VisualComponent /> : <div className="absolute inset-0 bg-surface flex items-center justify-center">Visual Not Found</div>}
                </div>
                {block.caption && (
                  <figcaption className="text-center text-sm text-on-surface-muted mt-4">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "alert": {
            const colors = {
              info: "bg-info/10 border-info/20 text-info",
              warning: "bg-warning/10 border-warning/20 text-warning",
              success: "bg-success/10 border-success/20 text-success",
              error: "bg-error/10 border-error/20 text-error",
            };
            
            const Icon = {
              info: Info,
              warning: AlertTriangle,
              success: CheckCircle2,
              error: AlertCircle
            }[block.variant];

            return (
              <div key={block.id} className={`my-8 p-6 rounded-xl border flex gap-4 ${colors[block.variant]}`}>
                <Icon className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  {block.title && <h5 className="font-semibold mb-1 text-foreground">{block.title}</h5>}
                  <p className="text-on-surface leading-relaxed text-sm md:text-base">{block.text}</p>
                </div>
              </div>
            );
          }

          case "checklist":
            return (
              <ul key={block.id} className="my-8 space-y-4 bg-surface/20 border border-border rounded-xl p-6 md:p-8">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                      item.checked 
                        ? "bg-success/20 border-success/30 text-success" 
                        : "bg-surface border-border-strong text-on-surface-muted"
                    }`}>
                      {item.checked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`text-base md:text-lg ${item.checked ? "text-on-surface" : "text-on-surface-muted"}`}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "metrics":
            return (
              <div key={block.id} className="my-12">
                {block.title && <h4 className="text-xl font-semibold mb-6 text-foreground">{block.title}</h4>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {block.stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border-strong bg-surface/30">
                      <p className="text-sm text-on-surface-muted font-medium mb-2 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-3xl md:text-4xl font-mono font-bold text-foreground">
                        {stat.value}
                        {stat.trend === "up" && <span className="text-success text-xl ml-2">↑</span>}
                        {stat.trend === "down" && <span className="text-error text-xl ml-2">↓</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
            
          default:
            return <div key={block.id} className="p-4 border border-error/50 bg-error/10 text-error rounded-md text-sm my-4">Unsupported block type: {(block as any).type}</div>;
        }
      })}
    </div>
  );
}
