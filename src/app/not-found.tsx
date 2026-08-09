import React from "react";
import Link from "next/link";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { PremiumButton } from "@/components/marketing/PremiumButton";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-32 bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundMesh className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-mono mb-8 uppercase tracking-widest">
          Error 404
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-foreground">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Not Found</span>
        </h1>
        
        <p className="text-xl text-on-surface-muted max-w-2xl mx-auto mb-12">
          The requested endpoint or resource does not exist in our current architecture. It may have been deprecated or moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <PremiumButton render={<Link href="/" />} className="w-full sm:w-auto justify-center">
            Return to Base
          </PremiumButton>
          <PremiumButton btnStyle="glass" render={<Link href="/contact" />} className="w-full sm:w-auto justify-center">
            Report Issue
          </PremiumButton>
        </div>
      </div>
    </main>
  );
}
