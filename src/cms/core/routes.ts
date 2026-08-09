import { CASE_STUDIES_DB } from "../../constants/case-studies";
import { TECHNOLOGIES_DB } from "../../constants/technologies";
import { PRODUCTS_DB } from "@/config/products";
import { RESOURCES_DB } from "../resources/mock-data";
import { SOLUTIONS_DB } from "@/config/solutions";

export type Domain =
  | "services"
  | "industries"
  | "solutions"
  | "products"
  | "resources"
  | "technologies"
  | "portfolio"
  | "case-studies";

export interface RouteDefinition {
  id: string;
  title: string;
  slug: string;
  href: string;
  domain: Domain;
}

const REGISTRY: RouteDefinition[] = [];

function registerDomain(
  domain: Domain,
  basePath: string,
  db: Record<string, { id?: string; slug?: string; title?: string }>
) {
  Object.keys(db).forEach((key) => {
    const item = db[key];
    const slug = item.slug || key;
    const title = item.title || slug;
    const id = item.id || slug;
    REGISTRY.push({
      id: `${domain}-${id}`,
      title,
      slug,
      href: `${basePath}/${slug}`,
      domain,
    });
  });
}

// Register domains that still use static DBs for routing
registerDomain("solutions", "/solutions", SOLUTIONS_DB);
registerDomain("products", "/products", PRODUCTS_DB);
registerDomain("resources", "/resources", RESOURCES_DB);
registerDomain("technologies", "/technologies", TECHNOLOGIES_DB);
registerDomain("case-studies", "/case-studies", CASE_STUDIES_DB);

export class RouteRegistry {
  getAllRoutes(): RouteDefinition[] {
    return REGISTRY;
  }

  getRouteBySlug(slug: string, domain?: Domain): RouteDefinition | null {
    if (domain) {
      return REGISTRY.find((r) => r.slug === slug && r.domain === domain) || null;
    }
    return REGISTRY.find((r) => r.slug === slug) || null;
  }

  getRouteByDomain(domain: Domain): RouteDefinition[] {
    return REGISTRY.filter((r) => r.domain === domain);
  }

  getRoute(id: string): RouteDefinition | null {
    return REGISTRY.find((r) => r.id === id) || null;
  }

  getTopLevelRoute(path: string): string {
    // Basic hardcoded top-level pages
    const VALID_PAGES = ["/", "/about", "/contact", "/design-system", "/motion-lab", "/portfolio", "/services", "/industries", "/products", "/solutions", "/technologies", "/case-studies", "/resources"];
    if (VALID_PAGES.includes(path) || VALID_PAGES.includes("/" + path)) return (path.startsWith("/") ? path : "/" + path);
    return "/coming-soon?feature=" + path.replace("/", "");
  }
}

export const routeRegistry = new RouteRegistry();

