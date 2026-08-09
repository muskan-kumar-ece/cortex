import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

interface PaginationItem {
  slug: string;
  title: string;
  label: string; // e.g. "Previous Service"
}

interface PaginationNavProps {
  prev: PaginationItem | null;
  next: PaginationItem | null;
  basePath: string; // e.g. "/services"
}

export function PaginationNav({ prev, next, basePath }: PaginationNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-8 border-t border-border">
      {prev ? (
        <Link href={`${basePath}/${prev.slug}`} className="block h-full">
          <GlassCard className="h-full p-6 flex flex-col items-start gap-4 hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-on-surface-muted group-hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              {prev.label}
            </div>
            <div className="text-xl font-bold text-foreground truncate w-full">
              {prev.title}
            </div>
          </GlassCard>
        </Link>
      ) : (
        <div /> // Empty placeholder for grid
      )}

      {next ? (
        <Link href={`${basePath}/${next.slug}`} className="block h-full">
          <GlassCard className="h-full p-6 flex flex-col items-end gap-4 hover:border-primary/50 transition-colors group text-right">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-on-surface-muted group-hover:text-primary transition-colors">
              {next.label}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-xl font-bold text-foreground truncate w-full">
              {next.title}
            </div>
          </GlassCard>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
