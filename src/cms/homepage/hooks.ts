import { useQuery } from "@tanstack/react-query";
import { homepageProvider } from "./mock-provider";

export const HOMEPAGE_KEYS = {
  all: ["homepage"] as const,
  hero: () => [...HOMEPAGE_KEYS.all, "hero"] as const,
  stats: () => [...HOMEPAGE_KEYS.all, "stats"] as const,
  whyB10: () => [...HOMEPAGE_KEYS.all, "whyB10"] as const,
  process: () => [...HOMEPAGE_KEYS.all, "process"] as const,
  engineering: () => [...HOMEPAGE_KEYS.all, "engineering"] as const,
  cta: () => [...HOMEPAGE_KEYS.all, "cta"] as const,
};

export function useHeroData() {
  return useQuery({
    queryKey: HOMEPAGE_KEYS.hero(),
    queryFn: () => homepageProvider.getHeroData(),
  });
}

// other hooks can be added here if client-side fetching is needed,
// however for the homepage we will mostly fetch on the server.
