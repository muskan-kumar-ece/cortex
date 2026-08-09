import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Building2, TrendingUp } from "lucide-react";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { CASE_STUDIES_DB } from "@/constants/case-studies";

export const metadata: Metadata = {
  title: "Enterprise Case Studies | Cortex IT Solution",
  description: "Explore how we have engineered transformative digital solutions for Fortune 500 companies and hyper-growth startups.",
};

const PAGE_DATA = {
  hero: {
    headline: "Engineering Outcomes",
    description: "We measure success not by lines of code, but by tangible business impact. Explore our portfolio of enterprise transformations."
  },
  featuredCaseStudySlug: "enterprise-ai-transformation"
};

export default async function CaseStudiesHubPage() {
  const caseStudies = Object.values(CASE_STUDIES_DB);
  const featured = caseStudies.find(cs => cs.slug === PAGE_DATA.featuredCaseStudySlug) || caseStudies[0];
  const regularGrid = caseStudies.filter(cs => cs.slug !== featured.slug);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-hover">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
        <BackgroundMesh />
        <SpotlightLayer />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-8 mx-auto">
            <Layers className="w-4 h-4" />
            Customer Success
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-8 max-w-5xl mx-auto">
            {PAGE_DATA.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface leading-relaxed mb-12 max-w-3xl mx-auto">
            {PAGE_DATA.hero.description}
          </p>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDY */}
      <section className="py-12 md:py-16 -mt-16 md:-mt-24 relative z-20">
        <div className="container mx-auto px-6">
          <Link 
            href={`/case-studies/${featured.slug}`}
            className="group block relative p-1 lg:p-2 rounded-[2.5rem] bg-gradient-to-b from-border-strong to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-3xl rounded-[2.5rem] z-0" />
            
            <div className="relative z-10 p-10 lg:p-16 rounded-[2.25rem] bg-background border border-border flex flex-col lg:flex-row gap-12 lg:gap-20 items-center overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-primary group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
                <TrendingUp className="w-96 h-96" />
              </div>

              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-bold uppercase tracking-wider text-foreground bg-surface border border-border-strong rounded-full mb-8">
                  Featured Case Study
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                
                <p className="text-xl text-on-surface-muted leading-relaxed mb-10 max-w-2xl">
                  {featured.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-border-strong">
                  <div>
                    <span className="block text-sm font-bold uppercase tracking-wider text-on-surface-muted mb-2">Primary Outcome</span>
                    <span className="block text-3xl font-bold text-success">{featured.executiveDashboard?.primaryKpi?.value}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold uppercase tracking-wider text-on-surface-muted mb-2">Industry</span>
                    <span className="block text-xl font-bold text-foreground">{featured.executiveDashboard?.industry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold text-lg text-primary">
                  Read the full report
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. CASE STUDIES GRID */}
      <section className="py-24 lg:py-32 relative bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Engineering Outcomes
            </h2>
            <p className="text-xl text-on-surface-muted">
              Filter by industry or technology to see how we&apos;ve solved challenges similar to yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularGrid.slice(0, 10).map((cs) => (
              <Link 
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col p-8 md:p-12 rounded-[2.5rem] border border-border-strong bg-surface/30 hover:bg-surface/80 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-on-surface-muted" />
                    <span className="text-sm font-bold text-on-surface-muted uppercase tracking-wider">
                      {cs.executiveDashboard?.industry || cs.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-success">{cs.executiveDashboard?.primaryKpi?.value}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors relative z-10">
                  {cs.title}
                </h3>
                
                <p className="text-on-surface-muted text-lg leading-relaxed mb-8 flex-grow relative z-10">
                  {cs.shortDescription}
                </p>

                <div className="flex items-center gap-2 font-bold text-sm text-foreground group-hover:text-primary transition-colors mt-auto relative z-10">
                  View Case Study
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <KnowledgeCta serviceTitle="Enterprise Case Studies" />
    </main>
  );
}
