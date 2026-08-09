/**
 * industries.service.ts
 *
 * Maps backend Industry + IndustryUseCase → frontend industry shapes.
 */

import { cmsList, cmsGet } from "@/api/cms";

// ─── Backend shapes ────────────────────────────────────────────────────────

export interface BackendIndustryUseCase {
  id: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
}

export interface BackendIndustry {
  id: string;
  slug: string;
  title: string;
  icon_name: string;
  badge: string;
  summary: string;
  description: string;
  content: {
    overview?: string;
    challenges?: string[];
    solutions?: { title: string; description: string }[];
    metrics?: { value: string; label: string }[];
    [key: string]: unknown;
  } | null;
  content_version: number;
  status: string;
  display_order: number;
  use_cases: BackendIndustryUseCase[];
  related_services_slugs: { name: string; slug: string }[];
}

/** Minimal shape for the homepage IndustriesSection */
export interface IndustryCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  useCaseCount?: number;
}

// ─── Adapter ───────────────────────────────────────────────────────────────

function toCard(ind: BackendIndustry): IndustryCard {
  return {
    id: ind.slug,
    slug: ind.slug,
    title: ind.title,
    description: ind.summary || ind.description || "",
    icon: ind.icon_name || "Activity",
    href: `/industries/${ind.slug}`,
    useCaseCount: ind.use_cases?.length ?? 0,
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllIndustries(): Promise<BackendIndustry[]> {
  const items = await cmsList<BackendIndustry>("/public/content/industries/");
  return items.sort((a, b) => a.display_order - b.display_order);
}

export async function getIndustryCards(): Promise<IndustryCard[]> {
  const industries = await getAllIndustries();
  return industries.map(toCard);
}

export async function getIndustryBySlug(slug: string): Promise<BackendIndustry | null> {
  return cmsGet<BackendIndustry>(`/public/content/industries/${slug}/`);
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  const industries = await getAllIndustries();
  return industries.map((i) => i.slug);
}
