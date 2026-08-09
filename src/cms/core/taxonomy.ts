// SEO Metadata
export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  robots?: string;
  ogImage?: string;
  twitterImage?: string;
  structuredData?: any; // JSON-LD
}

// Media
export interface BaseMedia {
  heroImage?: string;
  gallery?: { url: string; alt: string; span?: "col-span-1" | "col-span-2" | "row-span-2"; }[];
  videos?: { title: string; url: string; }[];
  animations?: { name: string; path: string; }[];
  downloads?: { title: string; type: string; size: string; url: string; version?: string; description?: string; }[];
}

// Authors / Auditing
export interface BaseAuditing {
  author?: string;
  reviewedBy?: string;
  updatedBy?: string;
}

// Metrics
export interface BaseMetrics {
  readingTime?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  priority?: number;
  businessValue?: string;
}

// Generic Cross Domain Relations
export interface RelatedContentItem {
  type: "Service" | "Industry" | "Portfolio" | "Resource" | "Solution" | "Technology" | "Product" | "CaseStudy";
  slug: string;
  title: string;
  shortDescription?: string;
}

export interface CrossDomainRelations {
  relatedContent?: RelatedContentItem[];
}

// The Universal Base Knowledge Data
// Every future CMS node (Product, CaseStudy, Event) should inherit from this.
export interface BaseKnowledgeData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  summary?: string;
  
  status: "Draft" | "Published" | "Archived";
  visibility: "Public" | "Private" | "Protected";
  category: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
  
  publishedAt?: string;
  updatedAt?: string;

  // Composition
  seo: SeoMetadata;
  media?: BaseMedia;
  auditing?: BaseAuditing;
  metrics?: BaseMetrics;
  relations?: CrossDomainRelations;
}
