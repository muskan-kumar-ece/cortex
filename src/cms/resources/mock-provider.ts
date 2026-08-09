import { ResourcesProvider, ResourcesPageData, ResourceItem, ResourceCategory, ResourceDetailsData } from "./types";
import { RESOURCES_DB } from "./mock-data";

const CATEGORIES: ResourceCategory[] = [
  "All",
  "Engineering",
  "AI",
  "Cloud",
  "Product Development",
  "UI/UX",
  "DevOps",
  "Case Studies",
  "Company Updates"
];

export class MockResourcesProvider implements ResourcesProvider {
  private mapToResourceItem(data: ResourceDetailsData): ResourceItem {
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      contentType: data.contentType,
      category: data.category,
      tags: data.aiContext.keywords.slice(0, 3), // Grab top 3 keywords as tags
      author: data.author,
      publishedAt: data.publishedDate,
      readingTime: data.readingTime,
      difficulty: data.difficulty,
      featured: data.featured,
      heroImagePlaceholder: data.heroImagePlaceholder,
      href: `/resources/${data.slug}`
    };
  }

  async getResourcesPageData(): Promise<ResourcesPageData> {
    const allResources = Object.values(RESOURCES_DB).map(this.mapToResourceItem);
    
    return {
      hero: {
        headline: "Engineering Knowledge Center",
        subheadline: "Insights & Architecture",
        description: "Deep technical dives, architectural patterns, and industry insights written by our senior engineers and product designers."
      },
      knowledgeCenter: {
        title: "Latest Engineering Insights",
        categories: CATEGORIES,
        featuredArticles: allResources.filter(a => a.featured),
        recentArticles: allResources.filter(a => !a.featured)
      },
      newsletter: {
        headline: "Stay ahead of the curve",
        description: "Get our latest technical articles and architecture teardowns delivered to your inbox monthly. No spam, just engineering.",
        placeholder: "engineering@company.com",
        buttonLabel: "Subscribe to Updates"
      }
    };
  }

  async getAllResourceSlugs(): Promise<string[]> {
    return Object.keys(RESOURCES_DB);
  }

  async getResourceBySlug(slug: string): Promise<ResourceDetailsData | null> {
    const resource = RESOURCES_DB[slug];
    if (!resource) return null;

    // Dynamically assign related resources
    const allSlugs = Object.keys(RESOURCES_DB).filter(s => s !== slug);
    const relatedResources = allSlugs.slice(0, 3); // Pick 3 random/related

    return {
      ...resource,
      relatedResources
    };
  }
}

export const resourcesProvider = new MockResourcesProvider();
