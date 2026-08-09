"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FloatingNodes } from "./DataViz";

export interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative flex flex-col min-h-[65vh] bg-background overflow-hidden", className)}>
      {/* ── High-Density Architectural Background Layers ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* Dense grid overlay for cinematic structural feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Orb 1: Violet — top-left anchor */}
        <div
          className="animate-aurora-drift absolute top-[-15%] left-[-8%] w-[55%] h-[55%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.08) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* Orb 2: Indigo — bottom-right */}
        <div
          className="animate-aurora-drift-alt absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.28) 0%, rgba(79,70,229,0.06) 50%, transparent 75%)",
            filter: "blur(80px)",
            animationDelay: "-4s",
          }}
        />

        {/* Orb 3: Cyan — mid-center subtle */}
        <div
          className="animate-aurora-drift absolute top-[35%] left-[40%] w-[35%] h-[35%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
            filter: "blur(70px)",
            animationDelay: "-8s",
          }}
        />

        {/* Floating Particles for visual density */}
        <FloatingNodes count={30} color="rgba(124,58,237,0.4)" />
        <FloatingNodes count={20} color="rgba(6,182,212,0.4)" />

        {/* Noise veil — gives it texture */}
        <div className="absolute inset-0 bg-background/30 mix-blend-overlay" />

        {/* Bottom fade to background */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex-1">
        {children}
      </div>
    </div>
  );
}
