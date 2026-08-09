import { NavigationProvider, NavigationGroup, FooterGroup, CompanyProfile, NavigationLink } from "./types";
import { routeRegistry } from "../core/routes";

function createDynamicLink(slug: string, domain: any, defaultTitle: string, fallbackPath?: string): NavigationLink {
  const route = routeRegistry.getRouteBySlug(slug, domain);
  if (route) {
    return { title: route.title, href: route.href };
  }
  return { title: defaultTitle, href: fallbackPath || routeRegistry.getTopLevelRoute(slug) };
}

export class MockNavigationProvider implements NavigationProvider {
  async getMainNavigation(): Promise<NavigationGroup[]> {
    return [
      {
        title: "Solutions",
        description: "Outcome-driven enterprise solutions.",
        featured: true,
        links: [
          createDynamicLink("ai-solutions", "solutions", "AI Solutions"),
          createDynamicLink("cloud-solutions", "solutions", "Cloud Architecture"),
          createDynamicLink("iot-solutions", "solutions", "IoT Integration"),
          createDynamicLink("business-automation", "solutions", "Business Automation"),
        ],
        cta: { title: "View All Solutions", href: "/solutions" }
      },
      {
        title: "Services",
        description: "Expert engineering and consulting.",
        links: [
          createDynamicLink("web-development", "services", "Development"),
          createDynamicLink("consulting", "services", "Consulting"),
          createDynamicLink("enterprise-software", "services", "Architecture"),
        ],
        cta: { title: "View All Services", href: "/services" }
      },
      {
        title: "Industries",
        description: "Domain-specific expertise.",
        links: [
          createDynamicLink("healthcare", "industries", "Healthcare"),
          createDynamicLink("fintech", "industries", "Finance"),
          createDynamicLink("manufacturing", "industries", "Manufacturing"),
        ],
        cta: { title: "View All Industries", href: "/industries" }
      },
      {
        title: "Products",
        description: "Our proprietary platforms.",
        links: [
          createDynamicLink("cortex-ai-assistant", "products", "Cortex AI"),
          createDynamicLink("venopai", "products", "VenopAI"),
          createDynamicLink("sandhi", "products", "Sandhi"),
        ],
        cta: { title: "View All Products", href: "/products" }
      },
      {
        title: "Knowledge",
        description: "Insights and engineering resources.",
        links: [
          { title: "Resources", href: "/resources" },
          { title: "Technologies", href: "/technologies" },
          { title: "Case Studies", href: "/case-studies" },
        ]
      }
    ];
  }

  async getFooterNavigation(): Promise<FooterGroup[]> {
    return [
      {
        title: "Offerings",
        links: [
          { title: "Solutions", href: "/solutions" },
          { title: "Services", href: "/services" },
          { title: "Products", href: "/products" },
          { title: "Industries", href: "/industries" },
        ]
      },
      {
        title: "Company",
        links: [
          { title: "About Cortex", href: "/about" },
          { title: "Careers", href: routeRegistry.getTopLevelRoute("careers") },
          { title: "Blog", href: routeRegistry.getTopLevelRoute("blog") },
          { title: "Contact", href: "/contact" },
        ]
      },
      {
        title: "Legal",
        links: [
          { title: "Privacy Policy", href: routeRegistry.getTopLevelRoute("privacy") },
          { title: "Terms of Service", href: routeRegistry.getTopLevelRoute("terms") },
          { title: "Cookie Policy", href: routeRegistry.getTopLevelRoute("cookies") },
        ]
      }
    ];
  }

  async getCompanyProfile(): Promise<CompanyProfile> {
    return {
      name: "Cortex IT Solution",
      description: "Empowering enterprises with next-generation AI and engineering solutions.",
      email: "hello@cortexitsolution.com",
      phone: "+1 (800) 123-4567",
      address: "123 Tech Avenue, Innovation District, CA 94105",
      socials: {
        twitter: "https://twitter.com/cortexitsolution",
        linkedin: "https://linkedin.com/company/cortexitsolution",
        github: "https://github.com/cortexitsolution"
      }
    };
  }
}

export const navigationProvider = new MockNavigationProvider();
