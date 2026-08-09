"use client";

import { VisualAsset } from "./VisualAsset";

export function DataFlow({ className, interactive = true }: { className?: string, interactive?: boolean }) {
  return (
    <VisualAsset 
      src="/images/api_flow.png"
      alt="Data API Flow Visualization"
      className={className}
      glowColor="rgba(236,72,153,0.3)" // Pink/Magenta glow
      interactive={interactive}
    />
  );
}
