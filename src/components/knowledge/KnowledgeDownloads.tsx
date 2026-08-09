import { DownloadBlock } from "@/cms/resources/types";
import { Download, FileText, FileJson, LayoutTemplate, Box } from "lucide-react";

export function KnowledgeDownloads({ downloads }: { downloads: Omit<DownloadBlock, "id" | "type">[] }) {
  if (!downloads || downloads.length === 0) return null;

  return (
    <div className="">
      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
        <Download className="w-4 h-4 text-primary" />
        Available Resources
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {downloads.map((dl, idx) => {
          const Icon = {
            PDF: FileText,
            DOCX: FileText,
            ZIP: Box,
            Presentation: LayoutTemplate,
            Template: LayoutTemplate,
            Whitepaper: FileText,
            Architecture: Box
          }[dl.fileType] || FileText;

          return (
            <a 
              key={idx}
              href={dl.url}
              className="group flex flex-col p-5 rounded-xl border border-border-strong bg-surface/30 hover:bg-surface/60 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient flare */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-surface border border-border px-2.5 rounded text-on-surface-muted">
                    {dl.fileType}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-primary/10 border border-primary/20 px-2.5 rounded text-primary">
                    v{dl.version}
                  </span>
                </div>
              </div>

              <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{dl.title}</h5>
              <p className="text-sm text-on-surface-muted line-clamp-2">{dl.description}</p>
              
              <div className="mt-auto flex items-center justify-between text-xs font-medium text-on-surface-muted">
                <span>{dl.size}</span>
                <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                  Download <Download className="w-3 h-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
