/**
 * cms.ts — Server-side CMS fetch helper.
 *
 * Used ONLY in Server Components / Server Actions / generateStaticParams.
 * Uses native fetch so Next.js can apply ISR caching via `next.revalidate`.
 *
 * All public endpoints are unauthenticated (AllowAny on the backend).
 */

import { env } from "@/config/env";

/** Django paginated response envelope */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

type FetchOptions = {
  /** Seconds before ISR revalidation. Default = 60. Use 0 to opt-out of cache. */
  revalidate?: number;
  /** Additional query params appended to the URL */
  params?: Record<string, string | number | boolean>;
};

function buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
  const base = env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  const url = new URL(`${base}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
  }
  return url.toString();
}

/**
 * Fetch a single resource. Returns null on 404.
 * Throws on other errors so Next.js error.tsx catches them.
 */
export async function cmsGet<T>(
  path: string,
  { revalidate = 60, params }: FetchOptions = {}
): Promise<T | null> {
  const url = buildUrl(path, params);
  try {
    const res = await fetch(url, {
      next: { revalidate },
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(`[CMS] ${res.status} ${res.statusText} — ${url}`);
      throw new Error(`CMS API Error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    // Unwrap B10 success envelope if present
    if (json && typeof json === "object" && "success" in json && "data" in json) {
      return json.data as T;
    }
    return json as T;
  } catch (err) {
    console.error(`[CMS] Network error — ${url}`, err);
    throw err;
  }
}

/**
 * Fetch a paginated list. Automatically fetches page_size=100 to get all records.
 * Returns empty array on error.
 */
export async function cmsList<T>(
  path: string,
  { revalidate = 60, params }: FetchOptions = {}
): Promise<T[]> {
  const mergedParams = { page_size: 100, ...params };
  const data = await cmsGet<PaginatedResponse<T> | T[]>(path, {
    revalidate,
    params: mergedParams,
  });
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<T>).results ?? [];
}
