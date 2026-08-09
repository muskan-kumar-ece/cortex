"use client";

import { VisualAsset } from "./VisualAsset";

export function DashboardPreview({ className, interactive = true }: { className?: string, interactive?: boolean }) {
  return (
    <VisualAsset 
      src="/images/dashboard_preview.png"
      alt="Enterprise Dashboard Interface"
      className={className}
      glowColor="rgba(6,182,212,0.3)" // Cyan glow matching the image
      interactive={interactive}
    />
  );
}
