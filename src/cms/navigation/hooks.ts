import { useQuery } from "@tanstack/react-query";
import { navigationProvider } from "./mock-provider";

export const NAVIGATION_KEYS = {
  all: ["navigation"] as const,
  main: () => [...NAVIGATION_KEYS.all, "main"] as const,
  footer: () => [...NAVIGATION_KEYS.all, "footer"] as const,
  profile: () => [...NAVIGATION_KEYS.all, "profile"] as const,
};

export function useMainNavigation() {
  return useQuery({
    queryKey: NAVIGATION_KEYS.main(),
    queryFn: () => navigationProvider.getMainNavigation(),
  });
}

export function useFooterNavigation() {
  return useQuery({
    queryKey: NAVIGATION_KEYS.footer(),
    queryFn: () => navigationProvider.getFooterNavigation(),
  });
}

export function useCompanyProfile() {
  return useQuery({
    queryKey: NAVIGATION_KEYS.profile(),
    queryFn: () => navigationProvider.getCompanyProfile(),
  });
}
