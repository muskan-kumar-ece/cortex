/**
 * testimonials.service.ts
 *
 * Maps backend Testimonial → frontend TestimonialItem shape.
 * Returns empty array when no testimonials exist (empty state is handled in the UI).
 */

import { cmsList } from "@/api/cms";
import type { TestimonialItem } from "@/cms/testimonials/types";

// ─── Backend shape ─────────────────────────────────────────────────────────

export interface BackendTestimonial {
  id: string;
  testimonial_type: string;
  client_name: string;
  company: string;
  role: string;
  review_text: string;
  video_url: string | null;
  logo_url: string | null;
  rating: number;
  is_featured: boolean;
  status: string;
  display_order: number;
}

// ─── Adapter ───────────────────────────────────────────────────────────────

function adapt(t: BackendTestimonial): TestimonialItem {
  return {
    id: t.id,
    quote: t.review_text,
    author: t.client_name,
    role: t.role || "",
    company: t.company || "",
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllTestimonials(): Promise<TestimonialItem[]> {
  const items = await cmsList<BackendTestimonial>("/public/content/testimonials/");
  return items
    .sort((a, b) => a.display_order - b.display_order)
    .map(adapt);
}

export async function getFeaturedTestimonials(): Promise<TestimonialItem[]> {
  const all = await cmsList<BackendTestimonial>("/public/content/testimonials/");
  const featured = all.filter((t) => t.is_featured);
  const items = featured.length > 0 ? featured : all;
  return items
    .sort((a, b) => a.display_order - b.display_order)
    .map(adapt);
}
