"use client";

import { useEffect, useState } from "react";
import { ContentBlock } from "@/cms/resources/types";
import { ListTree } from "lucide-react";

export function KnowledgeTableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = blocks.filter((b) => b.type === "heading") as any[];

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach((h) => {
      const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-32 p-6 rounded-2xl border border-border bg-surface/30 hidden lg:block">
      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
        <ListTree className="w-4 h-4 text-primary" />
        Table of Contents
      </h4>
      <nav className="space-y-3 relative before:absolute before:inset-y-0 before:left-1 before:w-[1px] before:bg-border-strong">
        {headings.map((h, idx) => {
          const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const isActive = activeId === id || (activeId === "" && idx === 0);
          
          return (
            <div key={h.id} className="relative">
              <div 
                className={`absolute left-[3px] top-1.5 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-primary" : "bg-transparent"
                }`} 
              />
              <a
                href={`#${id}`}
                className={`block pl-5 text-sm transition-colors ${
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-on-surface-muted hover:text-foreground"
                } ${h.level === "h3" ? "pl-8 text-xs" : ""} ${h.level === "h4" ? "pl-11 text-xs" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {h.text}
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
