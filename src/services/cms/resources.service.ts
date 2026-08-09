/**
 * resources.service.ts
 *
 * Maps backend Resource + ResourceCategory → frontend shapes used by:
 * - Homepage resources section
 * - /resources listing page
 * - /resources/[slug] detail page
 */

import { cmsList, cmsGet } from "@/api/cms";

// ─── Backend shapes ────────────────────────────────────────────────────────

export interface BackendResourceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string;
  badge: string;
  display_order: number;
  featured: boolean;
  status: string;
}

export interface BackendResource {
  id: string;
  slug: string;
  title: string;
  badge: string;
  summary: string;
  category_slug: string | null;
  resource_type: "engineering-intelligence" | "blog" | "guide" | "technology-guide";
  content_type: string | null;
  difficulty_level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ENTERPRISE";
  read_time: string;
  intelligence_score: number;
  hero_url: string | null;
  content: {
    schema_version?: number;
    sections?: { title: string; body: string }[];
    tags?: string[];
    author?: { name: string; role: string; bio?: string };
    published_date?: string;
    [key: string]: unknown;
  } | null;
  schema_version: number;
  status: string;
  featured_order: number;
  display_order: number;
}

/** Adapted shape used by the homepage and resources listing */
export interface ResourceCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  resourceType: string;
  difficulty: string;
  readTime: string;
  heroUrl: string | null;
  isFeatured: boolean;
  tags: string[];
  href: string;
}

// ─── Adapter ───────────────────────────────────────────────────────────────

function toCard(r: BackendResource): ResourceCard {
  const content = r.content || {};
  const tags = (content.tags as string[] | undefined) ?? [];

  return {
    id: r.slug,
    slug: r.slug,
    title: r.title,
    excerpt: r.summary || "",
    category: r.category_slug,
    resourceType: r.resource_type,
    difficulty: r.difficulty_level,
    readTime: r.read_time || "5 min read",
    heroUrl: r.hero_url,
    isFeatured: r.featured_order > 0,
    tags,
    href: `/resources/${r.slug}`,
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllResources(): Promise<BackendResource[]> {
  const items = await cmsList<BackendResource>("/public/content/resources/");
  return items.sort((a, b) => a.display_order - b.display_order);
}

export async function getResourceCards(): Promise<ResourceCard[]> {
  const all = await getAllResources();
  return all.map(toCard);
}

export async function getFeaturedResources(): Promise<ResourceCard[]> {
  const all = await getAllResources();
  const featured = all.filter((r) => r.featured_order > 0).sort((a, b) => a.featured_order - b.featured_order);
  const items = featured.length > 0 ? featured : all.slice(0, 3);
  return items.map(toCard);
}

export async function getResourceBySlug(slug: string): Promise<BackendResource | null> {
  return cmsGet<BackendResource>(`/public/content/resources/${slug}/`);
}

export async function getAllResourceSlugs(): Promise<string[]> {
  const all = await getAllResources();
  return all.map((r) => r.slug);
}

export async function getResourceCategories(): Promise<BackendResourceCategory[]> {
  const cats = await cmsList<BackendResourceCategory>("/public/content/resource-categories/");
  return cats.sort((a, b) => a.display_order - b.display_order);
}
