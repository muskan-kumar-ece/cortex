import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Layout, Database, Cloud, BrainCircuit, Shield, Smartphone, Terminal, Settings, CheckCircle2, Cpu, Zap, GitBranch } from "lucide-react";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { CloudArchitectureVisual } from "@/components/visuals/CloudArchitectureVisual";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { TECHNOLOGIES_DB } from "@/constants/technologies";

export const metadata: Metadata = {
  title: "Enterprise Technology Stack | Cortex IT Solution",
  description: "Explore the technologies we master to build scalable, secure, and performant enterprise systems.",
};

const CategoryIcons: Record<string, any> = {
  "Frontend": Layout,
  "Backend": Server,
  "Database": Database,
  "Cloud": Cloud,
  "AI": BrainCircuit,
  "Security": Shield,
  "Mobile": Smartphone,
  "DevOps": Settings,
  "Infrastructure": Terminal
};

const PAGE_DATA = {
  hero: {
    headline: "The Architect's Toolkit",
    description: "We don't experiment with your infrastructure. We deploy hardened, enterprise-grade technologies proven to scale across Fortune 500 ecosystems."
  }
};

export default async function TechnologiesHubPage() {
  const technologies = Object.values(TECHNOLOGIES_DB);

  // Group technologies by category
  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categories = Object.keys(groupedTech).sort();

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-hover">
      
      {/* 1. HERO with Ecosystem Visualization */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
        <BackgroundMesh />
        <SpotlightLayer />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-8 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Technology Ecosystem
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-8">
                {PAGE_DATA.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-muted leading-relaxed mb-10 font-light">
                {PAGE_DATA.hero.description}
              </p>
              <PremiumButton btnStyle="primary" render={<Link href="/contact" />}>
                Consult Our Architects
              </PremiumButton>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl border border-border-strong bg-surface/50 overflow-hidden flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />
              <div className="scale-75 md:scale-90 lg:scale-100 transform origin-center">
                <CloudArchitectureVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ENGINEERING STANDARDS & COMPARISON */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-strong rounded-md text-[10px] font-mono text-primary uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              Engineering Rigor
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Why Technical Leaders Trust Cortex</h2>
            <p className="text-lg text-on-surface-muted leading-relaxed">
              We reject brittle abstractions and hype-driven development. Our architecture adheres strictly to high-throughput, fault-tolerant enterprise patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-background border border-border-strong relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Sub-Millisecond Edge Compute</h3>
              <p className="text-on-surface-muted leading-relaxed text-sm">
                Leveraging Next.js App Router, Cloudflare Workers, and edge caching for instant global delivery.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-background border border-border-strong relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Zero-Trust Security by Design</h3>
              <p className="text-on-surface-muted leading-relaxed text-sm">
                End-to-end encryption, strict role-based access control (RBAC), and automated vulnerability analysis in CI/CD.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-background border border-border-strong relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Decoupled Domain Architecture</h3>
              <p className="text-on-surface-muted leading-relaxed text-sm">
                Modular services interacting through async event buses, ensuring zero single points of failure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY ECOSYSTEM */}
      <section className="py-24 lg:py-32 relative bg-surface/10 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Full Spectrum Technology Matrix
            </h2>
            <p className="text-xl text-on-surface-muted leading-relaxed font-light">
              Our engineering stack is divided into highly specialized domains, ensuring we apply the right tool for every layer of your enterprise architecture.
            </p>
          </div>

          <div className="space-y-20">
            {categories.map((category) => {
              const Icon = CategoryIcons[category] || Server;
              const technologies = groupedTech[category];
              
              return (
                <div key={category} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-8 border-b border-border-strong pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{category}</h3>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface-muted bg-surface px-3 py-1 rounded-full border border-border font-mono">
                        {technologies.length} Technologies
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologies.map((tech) => (
                      <Link 
                        key={tech.slug}
                        href={`/technologies/${tech.slug}`}
                        className="group flex flex-col p-6 rounded-2xl border border-border-strong bg-background/50 hover:bg-surface/80 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {tech.title}
                          </h4>
                          <ArrowRight className="w-5 h-5 text-on-surface-muted group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        
                        <p className="text-on-surface-muted text-sm leading-relaxed mt-auto font-medium">
                          {tech.shortDescription}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE CTA */}
      <KnowledgeCta serviceTitle="Enterprise Technology Stack" />
    </main>
  );
}
