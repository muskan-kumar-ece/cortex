/**
 * faqs.service.ts
 *
 * Maps backend FAQ → frontend FaqItem shape.
 */

import { cmsList } from "@/api/cms";
import type { FaqItem } from "@/cms/faq/types";

// ─── Backend shape ─────────────────────────────────────────────────────────

export interface BackendFaq {
  id: string;
  question: string;
  answer: string;
  category_slug: string | null;
  featured: boolean;
  display_order: number;
  status: string;
}

// ─── Adapter ───────────────────────────────────────────────────────────────

function adapt(f: BackendFaq): FaqItem {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
  };
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllFaqs(): Promise<FaqItem[]> {
  const items = await cmsList<BackendFaq>("/public/content/faqs/");
  return items
    .sort((a, b) => a.display_order - b.display_order)
    .map(adapt);
}

export async function getHomepageFaqs(): Promise<FaqItem[]> {
  const all = await cmsList<BackendFaq>("/public/content/faqs/");
  const featured = all.filter((f) => f.featured);
  const items = featured.length > 0 ? featured : all.slice(0, 5);
  return items
    .sort((a, b) => a.display_order - b.display_order)
    .map(adapt);
}
