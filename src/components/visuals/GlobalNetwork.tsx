"use client";

import { VisualAsset } from "./VisualAsset";

export function GlobalNetwork({ className, interactive = true }: { className?: string, interactive?: boolean }) {
  return (
    <VisualAsset 
      src="/images/globe_data.png"
      alt="Global Data Network"
      className={className}
      glowColor="rgba(16,185,129,0.3)" // Emerald glow matching the image
      interactive={interactive}
    />
  );
}
