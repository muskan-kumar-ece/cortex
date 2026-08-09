export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface KnowledgeContext {
  title: string;
  summary: string;
  keywords: string[];
  industry: string;
  services: string[];
  technologies: string[];
  painPoints: string[];
  solutions: string[];
  faq: { question: string; answer: string; }[];
  relatedKnowledge: string[];
}

export interface PortfolioDetailsData {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  technologies: string[];
  
  heroVariant: "default" | "cinematic";
  duration: string;
  teamSize: string;
  location: string;
  
  summary: string;
  overview: string;
  
  problem: { title: string; description: string; }[];
  solution: { title: string; description: string; icon: string; }[];
  
  architecture?: { title: string; description: string; diagramFeatures: string[]; };
  workflow?: { step: number; title: string; description: string; }[];
  timeline?: { phase: string; title: string; description: string; }[];
  
  gallery?: { url: string; alt: string; span?: "col-span-1" | "col-span-2" | "row-span-2"; }[];
  dashboard?: { imageUrl: string; alt: string; hotspots?: { x: number; y: number; label: string; }[]; };
  screenshots?: string[];
  
  results: { label: string; value: string; trend: "up" | "down" | "neutral"; description?: string; }[];
  roi?: { label: string; value: string; }[];
  
  beforeAfter?: {
    metricName: string;
    beforeLabel: string;
    beforeValue: string;
    afterLabel: string;
    afterValue: string;
    improvement: string;
  }[];
  
  businessImpact?: {
    title: string;
    description: string;
    points: string[];
  };
  
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    logo?: string;
  };
  
  faq?: { question: string; answer: string; }[];
  downloads?: { title: string; type: string; size: string; url: string; }[];
  
  seo: SeoMetadata;
  aiContext: KnowledgeContext; // Structured data for the AI chatbot
  
  status: "completed" | "ongoing";
  publishedAt: string;
  featured: boolean;
  readingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Enterprise";
  
  relatedServices?: { slug: string; title: string; shortDescription: string; }[];
  relatedIndustries?: { slug: string; title: string; shortDescription: string; }[];
  relatedResources?: { slug: string; title: string; shortDescription: string; }[];
  relatedPortfolio?: { slug: string; title: string; shortDescription: string; }[];
  
  author?: { name: string; role: string; avatar: string; };
}

export interface PortfolioProvider {
  getAllPortfolioSlugs(): Promise<string[]>;
  getPortfolioBySlug(slug: string): Promise<PortfolioDetailsData | null>;
  getAllPortfolioList(): Promise<{ slug: string; title: string; category: string }[]>;
  getPortfolioPageData(): Promise<any>;
  getFeaturedProjects(): Promise<any[]>;
}
