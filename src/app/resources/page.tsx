/**
 * app/resources/page.tsx — Resources Listing (Server Component)
 *
 * All resource data fetched from the live CMS backend.
 * Mock provider is fully removed.
 */

import { getResourceCards, getResourceCategories } from "@/services/cms/resources.service";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Download, FileText, Sparkles, Newspaper } from "lucide-react";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { KnowledgeNewsletter } from "@/components/knowledge/KnowledgeNewsletter";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { PremiumButton } from "@/components/marketing/PremiumButton";

export const metadata: Metadata = {
  title: "Engineering Knowledge Center | Cortex IT Solution",
  description:
    "Technical guides, architecture playbooks, whitepapers, and engineering insights from our product teams.",
};

export default async function ResourcesPage() {
  const [allResources, categories] = await Promise.all([
    getResourceCards(),
    getResourceCategories(),
  ]);

  const categoryNames = ["All", ...categories.map((c) => c.title)];
  const featuredArticle = allResources.find((r) => r.isFeatured) ?? allResources[0];
  const highlightArticles = allResources.filter((r) => r !== featuredArticle).slice(0, 3);
  const feedArticles = allResources.filter((r) => r !== featuredArticle).slice(0, 8);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-hover">

      {/* 1. HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
        <BackgroundMesh />
        <SpotlightLayer />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-8 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <Newspaper className="w-4 h-4" />
              Engineering Publication
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-8">
              Engineering Knowledge Center
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-muted leading-relaxed max-w-3xl mb-12 font-light">
              Deep technical dives, architectural patterns, and industry insights written by our senior engineers.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE */}
      {featuredArticle && (
        <section className="border-b border-border bg-surface/10">
          <div className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Link href={featuredArticle.href} className="group relative aspect-video rounded-3xl overflow-hidden border border-border-strong bg-surface block shadow-2xl">
                {featuredArticle.heroUrl ? (
                  <Image src={featuredArticle.heroUrl} alt={featuredArticle.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-background transition-transform duration-700 group-hover:scale-105">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <FileText className="w-16 h-16 text-primary mb-4 opacity-70 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-2xl text-foreground font-mono">TECHNICAL_DEEP_DIVE</span>
                    </div>
                  </div>
                )}
              </Link>
              <div>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary rounded-full mb-6 inline-block font-mono">
                  Featured {featuredArticle.resourceType}
                </span>
                <Link href={featuredArticle.href} className="block group">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-lg text-on-surface-muted leading-relaxed mb-6 font-light">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-on-surface-muted font-mono mb-8">
                  <span>{featuredArticle.readTime}</span>
                  <span>•</span>
                  <span>{featuredArticle.difficulty}</span>
                </div>
                <PremiumButton btnStyle="glass" render={<Link href={featuredArticle.href} />}>
                  Read Technical Breakdown
                </PremiumButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. EDITORIAL GRID & SIDEBAR */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Main Feed */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h3 className="text-2xl font-bold text-foreground">Latest Engineering Insights</h3>
                <div className="hidden md:flex items-center gap-2">
                  {categoryNames.slice(0, 4).map((c, i) => (
                    <span key={c} className={`px-4 py-1.5 rounded-full text-xs font-medium border font-mono ${i === 0 ? "bg-primary border-primary text-primary-foreground" : "bg-surface border-border text-on-surface-muted"}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {feedArticles.length === 0 && (
                <p className="text-on-surface-muted font-mono text-sm">
                  No resources published yet. Check back soon.
                </p>
              )}

              <div className="space-y-12">
                {feedArticles.map((article) => (
                  <article key={article.id} className="group">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                      <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border flex-shrink-0 relative shadow-sm">
                        {article.heroUrl ? (
                          <Image src={article.heroUrl} alt={article.title} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs font-bold text-on-surface-muted group-hover:scale-105 group-hover:text-primary transition-all duration-500 bg-gradient-to-br from-surface via-background to-surface/50 font-mono">
                            ARTICLE_PREVIEW
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center flex-grow">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block font-mono">
                          {article.category} • {article.resourceType}
                        </span>
                        <Link href={article.href}>
                          <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                            {article.title}
                          </h4>
                        </Link>
                        <p className="text-on-surface-muted line-clamp-2 mb-4 font-light text-sm">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-on-surface-muted font-mono mt-auto">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>{article.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar Curation */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">

                <div className="p-8 rounded-3xl border border-border-strong bg-surface/30 backdrop-blur-sm shadow-md">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Curated Reading List
                  </h4>
                  <ul className="space-y-4">
                    {highlightArticles.map((ha) => (
                      <li key={ha.id} className="group border-b border-border-strong pb-4 last:pb-0 last:border-0">
                        <span className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1 block font-mono">
                          {ha.category}
                        </span>
                        <Link href={ha.href} className="text-sm font-medium text-on-surface-muted group-hover:text-foreground transition-colors leading-snug block">
                          {ha.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 rounded-3xl border border-border-strong bg-surface/30 backdrop-blur-sm shadow-md">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                    <Download className="w-4 h-4 text-primary" />
                    Whitepapers & Playbooks
                  </h4>
                  <div className="space-y-3">
                    {["Migration Playbook (v2.3)", "LLM Infrastructure Blueprint", "Zero-Trust Architecture Guide"].map((dl) => (
                      <a key={dl} href="#" className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group">
                        <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">{dl}</span>
                        <Download className="w-3.5 h-3.5 text-on-surface-muted group-hover:text-primary" />
                      </a>
                    ))}
                  </div>
                </div>

                <KnowledgeNewsletter
                  headline="Engineering Dispatch"
                  description="Architectural teardowns delivered monthly to 12,000+ senior engineers."
                  buttonLabel="Subscribe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE CTA */}
      <KnowledgeCta serviceTitle="Engineering Publication" />
    </main>
  );
}
