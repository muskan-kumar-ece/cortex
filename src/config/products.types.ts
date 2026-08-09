import { BaseKnowledgeData } from "@/cms/core/taxonomy";

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductPricingTier {
  name: string;
  price: string;
  billingPeriod?: string; // e.g. "/month", "/year"
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface ProductRelease {
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[]; // Feature bullets for release notes
  status: "Planned" | "Beta" | "Released";
}

export interface ProductDetailsData extends BaseKnowledgeData {
  // Overriding/extending standard fields with product specific nuances
  
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta?: string;
  };

  overviewFeatures: ProductFeature[];
  
  dashboardScreenshots?: { url: string; alt: string; caption?: string; }[];
  
  architecture?: { title: string; description: string; diagramFeatures: string[]; };
  
  integrations?: { name: string; description: string; logoPlaceholder?: string; }[];
  
  pricingTiers?: ProductPricingTier[];
  
  roadmap?: ProductRelease[];
  
  useCases?: { title: string; description: string; }[];
  
  techStack?: { category: string; technologies: string[]; }[];
  
  faqs?: { question: string; answer: string; }[];
}

export interface ProductsHubData {
  hero: {
    headline: string;
    description: string;
  };
  products: Pick<ProductDetailsData, "slug" | "title" | "shortDescription" | "category" | "status">[];
}

export interface ProductsProvider {
  getProductsHubData(): Promise<ProductsHubData>;
  getAllProductSlugs(): Promise<string[]>;
  getProductBySlug(slug: string): Promise<ProductDetailsData | null>;
}
