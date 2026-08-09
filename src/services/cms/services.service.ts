/**
 * services.service.ts
 *
 * Maps backend Service / ServiceCategory → frontend ServiceItem shape.
 *
 * Backend content{} JSON field stores rich buyer-journey data:
 *   { pain_points[], solution_overview, technologies[], outcomes[] }
 * We map these to the legacy frontend fields (problem, howWeBuildIt, etc.)
 */

import { cmsList, cmsGet } from "@/api/cms";
import type { ServiceItem } from "@/cms/services/types";

// ─── Backend shapes ────────────────────────────────────────────────────────

export interface BackendService {
  id: string;
  slug: string;
  title: string;
  icon_name: string;
  badge: string;
  summary: string;
  description: string;
  tier: string;
  content: {
    pain_points?: string[];
    solution_overview?: string;
    technologies?: string[];
    outcomes?: string[];
    how_we_build_it?: string;
    business_outcome?: string;
    [key: string]: unknown;
  } | null;
  content_version: number;
  status: string;
  icon_url: string | null;
  display_order: number;
  related_services_slugs: { name: string; slug: string }[];
  related_industries_slugs: { name: string; slug: string }[];
}

export interface BackendServiceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  display_order: number;
  services: BackendService[];
}

// ─── Adapter ───────────────────────────────────────────────────────────────

function adaptService(s: BackendService): ServiceItem {
  const content = s.content || {};
  const painPoints = content.pain_points || [];
  const technologies = content.technologies || [];

  return {
    id: s.slug,
    title: s.title,
    description: s.summary || s.description || "",
    icon: s.icon_name || "Cpu",
    href: `/services/${s.slug}`,
    isPrimary: s.tier === "Core" || s.display_order === 0,
    problem:
      content.how_we_build_it
        ? painPoints[0] || s.description
        : painPoints[0] || s.description,
    howWeBuildIt:
      (content.how_we_build_it as string) ||
      content.solution_overview ||
      s.description ||
      "",
    technologies,
    businessOutcome:
      (content.business_outcome as string) ||
      (Array.isArray(content.outcomes) ? content.outcomes[0] : content.outcomes) ||
      "",
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

/** All published services ordered by display_order */
export async function getAllServices(): Promise<BackendService[]> {
  const services = await cmsList<BackendService>("/public/content/services/");
  return services.sort((a, b) => a.display_order - b.display_order);
}

/** Adapted to the ServiceItem shape used by the homepage and other UI */
export async function getCoreServices(): Promise<ServiceItem[]> {
  const services = await getAllServices();
  return services.map(adaptService);
}

/** Single service by slug */
export async function getServiceBySlug(slug: string): Promise<BackendService | null> {
  return cmsGet<BackendService>(`/public/content/services/${slug}/`);
}

/** Service categories with nested services */
export async function getServiceCategories(): Promise<BackendServiceCategory[]> {
  return cmsList<BackendServiceCategory>("/public/content/service-categories/");
}

/** All slugs — for generateStaticParams */
export async function getAllServiceSlugs(): Promise<string[]> {
  const services = await getAllServices();
  return services.map((s) => s.slug);
}
