"use client";

import { VisualAsset } from "./VisualAsset";

export function ArchitectureDiagram({ className, interactive = true }: { className?: string, interactive?: boolean }) {
  return (
    <VisualAsset 
      src="/images/node_network.png"
      alt="Cloud Architecture Diagram"
      className={className}
      glowColor="rgba(124,58,237,0.3)" // Violet glow matching the image
      interactive={interactive}
    />
  );
}
