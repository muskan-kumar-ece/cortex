"use client";

import { cn } from "@/lib/utils";

interface GlowLayerProps {
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  opacity?: number;
  className?: string;
}

export function GlowLayer({ color = "primary", opacity = 0.15, className }: GlowLayerProps) {
  const colorMap = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info"
  };

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px] mix-blend-screen",
          colorMap[color]
        )}
        style={{ opacity }}
      />
    </div>
  );
}
