import { getSolutionsHubData } from "@/config/solutions";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Activity, ShieldCheck, Cloud, Database, Network, Smartphone, Cpu, Workflow, BrainCircuit, Target, CheckCircle2 } from "lucide-react";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { PremiumButton } from "@/components/marketing/PremiumButton";

export const metadata: Metadata = {
  title: "Enterprise Solutions | Cortex IT Solution",
  description: "Bridging the gap between complex business problems and cutting-edge technical execution. Discover our enterprise solutions.",
};

const IconMap: Record<string, any> = {
  "BrainCircuit": BrainCircuit,
  "Workflow": Workflow,
  "LayoutGrid": Layers,
  "Activity": Activity,
  "ShieldCheck": ShieldCheck,
  "Cloud": Cloud,
  "Database": Database,
  "Network": Network,
  "Smartphone": Smartphone,
  "Cpu": Cpu
};

export default async function SolutionsHubPage() {
  const hubData = await getSolutionsHubData();
  
  // Extract Featured Solutions
  const aiSolution = hubData.solutions.find(s => s.slug === "artificial-intelligence-machine-learning") || hubData.solutions[0];
  const autoSolution = hubData.solutions.find(s => s.slug === "robotic-process-automation") || hubData.solutions[1];
  const cloudSolution = hubData.solutions.find(s => s.slug === "cloud-native-infrastructure") || hubData.solutions[2];
  
  // Remaining Solutions
  const featuredSlugs = [aiSolution?.slug, autoSolution?.slug, cloudSolution?.slug];
  const remainingSolutions = hubData.solutions.filter(s => !featuredSlugs.includes(s.slug));

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-hover">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
        <BackgroundMesh />
        <SpotlightLayer />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-8 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Technology Solutions
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-8 drop-shadow-sm">
              {hubData.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-muted leading-relaxed max-w-3xl mb-12 font-light">
              {hubData.hero.description}
            </p>
            <PremiumButton btnStyle="primary" render={<Link href="/contact" />}>
              Schedule Architecture Review
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* 2. BUSINESS PROBLEMS */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Overcoming Technical Debt & Scale Boundaries</h2>
              <p className="text-lg text-on-surface-muted leading-relaxed mb-8">
                Modern enterprises cannot rely on legacy monoliths and manual workflows. Our solutions are explicitly designed to address the friction points preventing you from scaling efficiently.
              </p>
              <ul className="space-y-4">
                {["Siloed Data & Inaccessible Insights", "Brittle Legacy Infrastructure", "Manual Operational Bottlenecks"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[400px] rounded-3xl bg-black/50 border border-border-strong relative overflow-hidden flex items-center justify-center p-10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15),transparent_70%)]" />
              <div className="w-full h-full border border-primary/20 rounded-xl bg-surface/50 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6 relative z-10">
                <Target className="w-12 h-12 text-primary mb-2 opacity-80" />
                <h3 className="text-xl font-bold text-foreground">Precision Engineering</h3>
                <p className="text-sm text-on-surface-muted">Aligning technical execution directly with measurable business outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SOLUTION SPOTLIGHT (AI) */}
      {aiSolution && (
        <section className="py-32 relative overflow-hidden bg-background border-b border-border">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1 relative">
                <div className="aspect-square max-h-[500px] rounded-[2rem] border border-border-strong bg-surface/30 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl group">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <BrainCircuit className="w-32 h-32 text-primary opacity-50 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-strong rounded-md text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
                  Intelligence Core
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{aiSolution.title}</h2>
                <p className="text-xl text-on-surface-muted leading-relaxed mb-8">{aiSolution.shortDescription}</p>
                <PremiumButton btnStyle="glass" render={<Link href={`/solutions/${aiSolution.slug}`} />}>
                  Explore AI Capabilities
                </PremiumButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED SOLUTION SPOTLIGHT (AUTOMATION) */}
      {autoSolution && (
        <section className="py-32 relative overflow-hidden bg-surface border-b border-border-strong">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border-strong rounded-md text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-6">
                  Operational Velocity
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{autoSolution.title}</h2>
                <p className="text-xl text-on-surface-muted leading-relaxed mb-8">{autoSolution.shortDescription}</p>
                <PremiumButton btnStyle="glass" render={<Link href={`/solutions/${autoSolution.slug}`} />}>
                  Explore Automation
                </PremiumButton>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-square max-h-[500px] rounded-[2rem] border border-border-strong bg-background/50 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl group">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <Workflow className="w-32 h-32 text-emerald-500 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. FEATURED SOLUTION SPOTLIGHT (CLOUD) */}
      {cloudSolution && (
        <section className="py-32 relative overflow-hidden bg-background border-b border-border">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1 relative">
                <div className="aspect-square max-h-[500px] rounded-[2rem] border border-border-strong bg-surface/30 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl group">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <Cloud className="w-32 h-32 text-blue-500 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-strong rounded-md text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">
                  Scalable Infrastructure
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{cloudSolution.title}</h2>
                <p className="text-xl text-on-surface-muted leading-relaxed mb-8">{cloudSolution.shortDescription}</p>
                <PremiumButton btnStyle="glass" render={<Link href={`/solutions/${cloudSolution.slug}`} />}>
                  Explore Cloud Solutions
                </PremiumButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. REMAINING SOLUTIONS GRID */}
      {remainingSolutions.length > 0 && (
        <section className="py-24 lg:py-32 relative bg-surface/10 border-b border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Comprehensive Solutions Portfolio</h2>
              <p className="text-lg text-on-surface-muted">Specialized expertise across the entire enterprise technology stack.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {remainingSolutions.map((solution, idx) => {
                const Icon = solution.iconPlaceholder && IconMap[solution.iconPlaceholder] ? IconMap[solution.iconPlaceholder] : Layers;
                
                return (
                  <Link 
                    key={solution.slug}
                    href={`/solutions/${solution.slug}`}
                    className="group flex flex-col p-8 md:p-10 rounded-2xl border border-border-strong bg-background/50 hover:bg-surface/80 hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-inner">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="w-10 h-10 rounded-full border border-border-strong bg-background flex items-center justify-center text-on-surface-muted group-hover:text-foreground group-hover:border-foreground transition-all duration-300">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {solution.title}
                    </h3>
                    
                    <p className="text-on-surface-muted leading-relaxed font-medium mt-auto group-hover:text-on-surface transition-colors">
                      {solution.shortDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. TECHNOLOGY RELATIONSHIPS */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">
          <Network className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">Seamless Integration Across Systems</h2>
          <p className="text-xl text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            Our solutions are not implemented in silos. They form a cohesive, interoperable ecosystem designed for data fluidity and high security.
          </p>
        </div>
      </section>

      {/* 8. ENTERPRISE CTA */}
      <KnowledgeCta serviceTitle="Enterprise Solutions" />
    </main>
  );
}
