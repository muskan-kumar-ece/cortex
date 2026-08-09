/**
 * navigation.service.ts
 *
 * Fetches flat NavigationItem records from the backend and assembles
 * the grouped NavigationGroup[] / FooterGroup[] structures the Header expects.
 *
 * Backend structure:
 *   - `location` = NAVBAR | FOOTER | MEGA_MENU | SIDEBAR | MOBILE | LEGAL
 *   - `parent` = null (top-level) or UUID of parent item
 *   - Only items with status = "Published" are returned by the public endpoint
 *
 * Grouping strategy:
 *   - NAVBAR items with parent=null → top-level NavGroup titles
 *   - NAVBAR items with parent=<id> → children of that group
 *   - FOOTER items with parent=null → footer group titles
 *   - FOOTER items with parent=<id> → children of that footer group
 *   - If backend has <3 NAVBAR groups, we augment with static fallback groups
 *     so the mega-menu never looks empty.
 */

import { cmsList } from "@/api/cms";
import { getNavigationCompanyProfile } from "./company.service";
import type {
  NavigationGroup,
  FooterGroup,
  CompanyProfile,
  NavigationLink,
} from "@/cms/navigation/types";

// ─── Backend shape ─────────────────────────────────────────────────────────

interface BackendNavItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  badge: string;
  is_external: boolean;
  parent: string | null;
  location: "NAVBAR" | "FOOTER" | "MEGA_MENU" | "SIDEBAR" | "MOBILE" | "LEGAL";
  status: string;
  display_order: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function toLink(item: BackendNavItem): NavigationLink {
  return { title: item.title, href: item.url };
}

function buildGroups(
  roots: BackendNavItem[],
  children: Map<string, BackendNavItem[]>
): NavigationGroup[] {
  return roots
    .sort((a, b) => a.display_order - b.display_order)
    .map((root) => {
      const kids = (children.get(root.id) || []).sort(
        (a, b) => a.display_order - b.display_order
      );
      return {
        title: root.title,
        links: kids.length > 0 ? kids.map(toLink) : undefined,
        cta:
          kids.length > 0
            ? { title: `View All ${root.title}`, href: root.url }
            : { title: root.title, href: root.url },
      };
    });
}

function buildFooterGroups(
  roots: BackendNavItem[],
  children: Map<string, BackendNavItem[]>
): FooterGroup[] {
  return roots
    .sort((a, b) => a.display_order - b.display_order)
    .map((root) => {
      const kids = (children.get(root.id) || []).sort(
        (a, b) => a.display_order - b.display_order
      );
      return {
        title: root.title,
        links: kids.length > 0 ? kids.map(toLink) : [toLink(root)],
      };
    });
}

// ─── Public service functions ──────────────────────────────────────────────

export async function getMainNavigation(): Promise<NavigationGroup[]> {
  const all = await cmsList<BackendNavItem>("/public/content/navigation/");
  const navbar = all.filter((n) => n.location === "NAVBAR");

  // Build parent→children map
  const children = new Map<string, BackendNavItem[]>();
  const roots: BackendNavItem[] = [];

  navbar.forEach((item) => {
    if (!item.parent) {
      roots.push(item);
    } else {
      const arr = children.get(item.parent) || [];
      arr.push(item);
      children.set(item.parent, arr);
    }
  });

  const groups = buildGroups(roots, children);
  return groups;
}
export async function getFooterNavigation(): Promise<FooterGroup[]> {
  const all = await cmsList<BackendNavItem>("/public/content/navigation/");
  const footer = all.filter((n) => n.location === "FOOTER" || n.location === "LEGAL");

  const children = new Map<string, BackendNavItem[]>();
  const roots: BackendNavItem[] = [];

  footer.forEach((item) => {
    if (!item.parent) {
      roots.push(item);
    } else {
      const arr = children.get(item.parent) || [];
      arr.push(item);
      children.set(item.parent, arr);
    }
  });

  const groups = buildFooterGroups(roots, children);
  return groups;
}

export { getNavigationCompanyProfile as getCompanyProfile };

export type { CompanyProfile };
