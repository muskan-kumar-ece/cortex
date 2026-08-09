import React from "react";
import Link from "next/link";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { PremiumButton } from "@/components/marketing/PremiumButton";

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ feature?: string }>;
}) {
  const resolvedParams = await searchParams;
  const featureParam = resolvedParams.feature;
  
  const featureName = featureParam 
    ? featureParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "This Feature";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-32">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <BackgroundMesh className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Status: In Development
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          {featureName} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
            Coming Soon
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-muted max-w-2xl mx-auto mb-12">
          We are building something exciting. {featureName} is currently being architected by our core engineering team and will be available in an upcoming release.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <PremiumButton render={<Link href="/" />} className="w-full sm:w-auto justify-center">
            Return to Homepage
          </PremiumButton>
          <PremiumButton btnStyle="glass" render={<Link href="/contact" />} className="w-full sm:w-auto justify-center">
            Contact Engineering
          </PremiumButton>
        </div>
      </div>
    </main>
  );
}
