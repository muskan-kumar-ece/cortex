import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function TechBadge({ icon, label, className }: TechBadgeProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 w-32 group/item cursor-default", className)}>
      <div className="text-muted-foreground/50 transition-all duration-300 group-hover/item:text-foreground group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        {icon}
      </div>
      <span className="text-xs font-medium text-muted-foreground/0 group-hover/item:text-muted-foreground transition-all duration-300 translate-y-2 group-hover/item:translate-y-0 text-center">
        {label}
      </span>
    </div>
  );
}
