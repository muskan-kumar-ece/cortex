/**
 * portfolio.service.ts
 *
 * Maps backend Portfolio → shapes used by the homepage FeaturedProjectsSection,
 * the /portfolio listing, and /portfolio/[slug] detail pages.
 */

import { cmsList, cmsGet } from "@/api/cms";

// ─── Backend shapes ────────────────────────────────────────────────────────

export interface BackendPortfolioMetric {
  metric: string;
  value: string;
}

export interface BackendPortfolioArchitectureLayer {
  layer: string;
  desc: string;
}

export interface BackendPortfolio {
  id: string;
  slug: string;
  title: string;
  badge: string;
  summary: string;
  capability_focus: string;
  engagement_type: string;
  client_name: string;
  client_type: string;
  industry_size: string;
  engagement_duration: string;
  project_status: string;
  business_problem: string;
  architecture_stack: BackendPortfolioArchitectureLayer[] | null;
  metrics: BackendPortfolioMetric[] | null;
  hero_url: string | null;
  content: {
    schema_version?: number;
    requirements?: string[];
    solution_highlights?: string[];
    technologies?: string[];
    team_size?: string;
    [key: string]: unknown;
  } | null;
  schema_version: number;
  status: string;
  featured_order: number;
  display_order: number;
  services_slugs: { name: string; slug: string }[];
  industries_slugs: { name: string; slug: string }[];
}

/** Simplified shape for listing cards */
export interface PortfolioCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  badge: string;
  clientName: string;
  clientType: string;
  engagementType: string;
  metrics: { value: string; label: string }[];
  heroUrl: string | null;
  technologies: string[];
  href: string;
  isFeatured: boolean;
}

function toCard(p: BackendPortfolio): PortfolioCard {
  const content = p.content || {};
  const technologies = Array.isArray(content.technologies)
    ? content.technologies
    : typeof content.technologies === "object" && content.technologies !== null
    ? Object.values(content.technologies).map(String)
    : [];

  const rawMetrics: { value: string; label: string }[] = Array.isArray(p.metrics)
    ? p.metrics.map((m) => ({ value: String(m.value || ""), label: String(m.metric || (m as any).label || "") }))
    : typeof p.metrics === "object" && p.metrics !== null
    ? Object.entries(p.metrics).map(([label, value]) => ({ value: String(value), label }))
    : [];

  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.summary || p.business_problem || "",
    badge: p.badge || p.capability_focus,
    clientName: p.client_name || "",
    clientType: p.client_type || "",
    engagementType: p.engagement_type || "",
    metrics: rawMetrics,
    heroUrl: p.hero_url,
    technologies,
    href: `/portfolio/${p.slug}`,
    isFeatured: p.featured_order > 0,
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllPortfolio(): Promise<BackendPortfolio[]> {
  const items = await cmsList<BackendPortfolio>("/public/content/portfolio/");
  return items.sort((a, b) => a.display_order - b.display_order);
}

export async function getFeaturedPortfolio(): Promise<PortfolioCard[]> {
  const all = await getAllPortfolio();
  const featured = all.filter((p) => p.featured_order > 0).sort((a, b) => a.featured_order - b.featured_order);
  // If nothing is marked featured, return first 2
  const items = featured.length > 0 ? featured : all.slice(0, 2);
  return items.map(toCard);
}

export async function getPortfolioCards(): Promise<PortfolioCard[]> {
  const all = await getAllPortfolio();
  return all.map(toCard);
}

export async function getPortfolioBySlug(slug: string): Promise<BackendPortfolio | null> {
  return cmsGet<BackendPortfolio>(`/public/content/portfolio/${slug}/`);
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  const all = await getAllPortfolio();
  return all.map((p) => p.slug);
}
