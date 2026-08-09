import { getProductsHubData } from "@/config/products";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, Box, Hexagon, Database, Cpu, BrainCircuit, Activity, CheckCircle2, Shield, Sparkles, Terminal } from "lucide-react";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { PremiumButton } from "@/components/marketing/PremiumButton";

export const metadata: Metadata = {
  title: "Enterprise Software Products | Cortex IT Solution",
  description: "Scale your operations with our flagship software solutions designed for enterprise performance.",
};

export default async function ProductsHubPage() {
  const hubData = await getProductsHubData();
  const products = hubData.products;

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-hover">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
        <BackgroundMesh />
        <SpotlightLayer />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-8 mx-auto shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <Package className="w-4 h-4" />
            Software Products Suite
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-8 max-w-5xl mx-auto">
            {hubData.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-muted leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            {hubData.hero.description}
          </p>
          <div className="flex items-center justify-center gap-4">
            <PremiumButton btnStyle="primary" render={<Link href="/contact" />}>
              Request Enterprise Demo
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT ECOSYSTEM VISUALIZATION */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Cortex Platform Ecosystem</h2>
            <p className="text-xl text-on-surface-muted max-w-2xl mx-auto font-light">Unified intelligence. Shared context. Unlimited operational scale.</p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center relative py-12">
            {/* Top Node */}
            <div className="w-72 bg-surface border border-primary/50 rounded-2xl p-6 text-center z-10 shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)]">
              <Hexagon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg">Cortex Core Platform</h3>
              <p className="text-xs text-on-surface-muted font-mono">UNIFIED_KERNEL_v3.2</p>
            </div>

            {/* Connecting Line Down */}
            <div className="w-px h-16 bg-border-strong relative">
              <div className="absolute inset-0 bg-primary/50 w-full animate-pulse" />
            </div>

            {/* Horizontal Bus */}
            <div className="w-full max-w-3xl h-px bg-border-strong relative" />

            {/* Three Branches */}
            <div className="flex w-full max-w-3xl justify-between relative">
              {/* Branch 1 */}
              <div className="flex flex-col items-center relative -mt-px">
                <div className="w-px h-16 bg-border-strong" />
                <div className="w-52 bg-background border border-border-strong rounded-2xl p-6 text-center z-10 hover:border-primary transition-colors cursor-pointer group shadow-lg">
                  <BrainCircuit className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-base">Cortex AI Assistant</h3>
                  <p className="text-xs text-on-surface-muted mt-1">Autonomous Reasoning</p>
                </div>
                <div className="w-px h-16 bg-border-strong" />
              </div>

              {/* Branch 2 */}
              <div className="flex flex-col items-center relative -mt-px">
                <div className="w-px h-16 bg-border-strong" />
                <div className="w-52 bg-background border border-border-strong rounded-2xl p-6 text-center z-10 hover:border-emerald-500 transition-colors cursor-pointer group shadow-lg">
                  <Activity className="w-8 h-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-base">VenopAI</h3>
                  <p className="text-xs text-on-surface-muted mt-1">Commerce Intelligence</p>
                </div>
                <div className="w-px h-16 bg-border-strong" />
              </div>

              {/* Branch 3 */}
              <div className="flex flex-col items-center relative -mt-px">
                <div className="w-px h-16 bg-border-strong" />
                <div className="w-52 bg-background border border-border-strong rounded-2xl p-6 text-center z-10 hover:border-blue-500 transition-colors cursor-pointer group shadow-lg">
                  <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-base">Sandhi</h3>
                  <p className="text-xs text-on-surface-muted mt-1">Vector Memory OS</p>
                </div>
                <div className="w-px h-16 bg-border-strong" />
              </div>
            </div>

            {/* Bottom Foundation */}
            <div className="w-full max-w-3xl bg-surface/50 border border-border-strong rounded-2xl p-6 text-center flex items-center justify-center gap-4 shadow-md">
              <Database className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground text-xs tracking-widest uppercase font-mono">Enterprise Knowledge & Event Backbone</span>
              <Database className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PRODUCTS DEEP DIVE */}
      <section className="py-24 lg:py-32 relative bg-background border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Flagship Enterprise Systems
            </h2>
            <p className="text-xl text-on-surface-muted font-light leading-relaxed">
              Production-ready products engineered to deploy seamlessly within existing private clouds or on-premise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <Link 
                key={prod.slug}
                href={`/products/${prod.slug}`}
                className="group flex flex-col p-8 rounded-3xl border border-border-strong bg-surface/30 hover:bg-surface/80 hover:border-primary/50 transition-all duration-500 relative overflow-hidden h-full shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                    <Box className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider bg-surface border border-border px-3 py-1 rounded-full font-mono">
                    {prod.category}
                  </span>
                </div>
                
                <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {prod.title}
                </h4>
                
                <p className="text-on-surface-muted text-base leading-relaxed mb-8 flex-grow font-medium">
                  {prod.shortDescription}
                </p>

                {/* Mock Micro-Visual inside card */}
                <div className="w-full h-24 rounded-xl bg-black/40 border border-white/5 p-3 mb-6 flex flex-col justify-between font-mono text-[10px] text-white/50 group-hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-primary flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> STATUS</span>
                    <span className="text-emerald-400">ONLINE</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4 rounded-full" />
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>LATENCY: 12ms</span>
                    <span>P99 SLA</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold text-sm text-primary group-hover:text-primary-hover transition-colors mt-auto">
                  Explore Product Specs
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE CTA */}
      <KnowledgeCta serviceTitle="Enterprise Products Suite" />
    </main>
  );
}
