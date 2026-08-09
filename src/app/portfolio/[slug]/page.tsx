/**
 * app/portfolio/[slug]/page.tsx — Portfolio Detail (Server Component)
 *
 * Fetches portfolio data from the live CMS backend.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KnowledgePageTemplate } from "@/components/templates/KnowledgePageTemplate";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  getPortfolioBySlug,
  getAllPortfolioSlugs,
  getAllPortfolio,
} from "@/services/cms/portfolio.service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.title} | Cortex IT Solution`,
    description: data.summary || data.business_problem,
    openGraph: {
      title: `${data.title} | Cortex IT Solution`,
      description: data.summary,
      type: "website",
      images: data.hero_url ? [{ url: data.hero_url, width: 1200, height: 630, alt: data.title }] : [],
    },
  };
}

function parseArchitectureLayers(stack: unknown): string[] {
  if (!stack) return [];
  if (Array.isArray(stack)) {
    return stack.map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const layer = (item as Record<string, unknown>).layer || (item as Record<string, unknown>).name || (item as Record<string, unknown>).title || "";
        const desc = (item as Record<string, unknown>).desc || (item as Record<string, unknown>).description || (item as Record<string, unknown>).details || "";
        return layer && desc ? `${layer}: ${desc}` : String(layer || desc || JSON.stringify(item));
      }
      return String(item);
    });
  }
  if (typeof stack === "object") {
    const obj = stack as Record<string, unknown>;
    if (Array.isArray(obj.layers)) {
      return parseArchitectureLayers(obj.layers);
    }
    if (Array.isArray(obj.stack)) {
      return parseArchitectureLayers(obj.stack);
    }
    return Object.entries(obj).map(([key, val]) => {
      if (typeof val === "string") return `${key}: ${val}`;
      if (typeof val === "object" && val !== null) {
        const desc = (val as Record<string, unknown>).desc || (val as Record<string, unknown>).description || JSON.stringify(val);
        return `${key}: ${desc}`;
      }
      return `${key}: ${String(val)}`;
    });
  }
  if (typeof stack === "string") {
    try {
      const parsed = JSON.parse(stack);
      return parseArchitectureLayers(parsed);
    } catch {
      return [stack];
    }
  }
  return [];
}

function parseMetrics(rawMetrics: unknown): Array<{ value: string; label: string; trend: "neutral" }> {
  if (!rawMetrics) return [];
  if (Array.isArray(rawMetrics)) {
    return rawMetrics.map((m) => {
      if (m && typeof m === "object") {
        const value = (m as Record<string, unknown>).value || "";
        const label = (m as Record<string, unknown>).metric || (m as Record<string, unknown>).label || (m as Record<string, unknown>).title || "";
        return { value: String(value), label: String(label), trend: "neutral" as const };
      }
      return { value: String(m), label: "", trend: "neutral" as const };
    });
  }
  if (typeof rawMetrics === "object") {
    return Object.entries(rawMetrics as Record<string, unknown>).map(([label, value]) => ({
      value: String(value),
      label,
      trend: "neutral" as const,
    }));
  }
  return [];
}

function parseStringList(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((i) => (typeof i === "string" ? i : String(i)));
  if (typeof input === "object") return Object.values(input).map((v) => String(v));
  if (typeof input === "string") return [input];
  return [];
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [portfolio, allPortfolio] = await Promise.all([
    getPortfolioBySlug(slug),
    getAllPortfolio(),
  ]);

  if (!portfolio || portfolio.status !== "Published") {
    notFound();
  }

  const content = portfolio.content || {};
  const allPortfolioList = (allPortfolio || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.capability_focus,
  }));

  const currentIndex = allPortfolioList.findIndex((p) => p.slug === slug);
  const prevPortfolio = currentIndex > 0 ? { ...allPortfolioList[currentIndex - 1], label: "Previous Project" } : null;
  const nextPortfolio = currentIndex < allPortfolioList.length - 1 ? { ...allPortfolioList[currentIndex + 1], label: "Next Project" } : null;

  const metrics = parseMetrics(portfolio.metrics);
  const archLayers = parseArchitectureLayers(portfolio.architecture_stack);
  const requirements = parseStringList(content.requirements);
  const technologies = parseStringList(content.technologies);
  const solutionHighlights = parseStringList(content.solution_highlights);
  const servicesSlugs = Array.isArray(portfolio.services_slugs) ? portfolio.services_slugs : [];

  const pageData = {
    id: portfolio.id,
    slug: portfolio.slug,
    title: portfolio.title,
    shortDescription: portfolio.summary,
    hero: { title: portfolio.title, subtitle: portfolio.summary },
    overview: portfolio.business_problem || solutionHighlights.join(" ") || portfolio.summary,
    challenges: requirements.map((r, i) => ({ title: `Requirement ${i + 1}`, description: r })),
    solutions: {
      title: "Engineering Approach",
      description: portfolio.engagement_type || "Technology Partnership",
      features: archLayers,
    },
    architecture: {
      title: "Architecture Stack",
      description: `${portfolio.client_type || ""} ${portfolio.industry_size || ""}`.trim() || "Architecture Details",
      diagramFeatures: archLayers,
    },
    techStack: [{ category: "Technologies", technologies }],
    workflow: [],
    benefits: metrics.map((m) => ({ title: m.value, description: m.label, icon: "TrendingUp" })),
    metrics,
    faqs: [],
    relatedContent: servicesSlugs.map((s) => ({
      slug: typeof s === "string" ? s : (s.slug || ""),
      title: typeof s === "string" ? s : (s.name || s.slug || ""),
    })),
    seo: { title: `${portfolio.title} | Cortex IT Solution`, description: portfolio.summary, keywords: [] },
    published: portfolio.status === "Published",
    order: portfolio.display_order,
    featured: portfolio.featured_order > 0,
    category: portfolio.capability_focus,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: portfolio.title,
    description: portfolio.summary,
    author: { "@type": "Organization", name: "Cortex IT Solution" },
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <div className="absolute top-24 left-0 w-full z-50 pt-4">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Portfolio", href: "/portfolio" }, { label: portfolio.title }]} />
        </div>
      </div>
      <KnowledgePageTemplate
        data={pageData as any}
        allPages={allPortfolioList}
        prevPage={prevPortfolio}
        nextPage={nextPortfolio}
        basePath="/portfolio"
      />
    </>
  );
}
