import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none mix-blend-screen" />
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4 relative z-10" />
      <p className="text-on-surface-muted font-mono text-sm uppercase tracking-widest relative z-10 animate-pulse">
        Initializing...
      </p>
    </div>
  );
}
