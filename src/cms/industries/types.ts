export interface IndustryDetailData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  
  // Executive Snapshot
  executiveSummary: string;
  marketChallenges: string[];
  
  // Detailed Sections
  overview: string;
  industryChallenges: { title: string; description: string; }[];
  businessObjectives: { label: string; value: string; trend: "up" | "down" | "neutral"; description?: string; }[]; // Maps to metrics
  
  solutions: { title: string; description: string; icon: string; }[]; // Maps to benefits
  architecture: { title: string; description: string; diagramFeatures: string[]; };
  technologyStack: { category: string; technologies: string[]; }[];
  workflow: { step: number; title: string; description: string; }[];
  
  // Industry specific
  regulations: { standard: string; description: string; }[]; // Maps to compliance
  digitalTransformationRoadmap: { phase: string; title: string; description: string; }[];
  aiOpportunities: { useCase: string; description: string; impact: string; }[];
  
  faqs: { question: string; answer: string; }[];
  relatedIndustries: { slug: string; title: string; shortDescription: string; }[];
  relatedServices: { slug: string; title: string; shortDescription: string; }[];
  
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
  };
  
  published: boolean;
  order: number;
  featured: boolean;
}

export interface IndustriesProvider {
  getAllIndustrySlugs(): Promise<string[]>;
  getIndustryBySlug(slug: string): Promise<IndustryDetailData | null>;
  getAllIndustriesList(): Promise<{ slug: string; title: string; category: string }[]>;
  getIndustries(): Promise<any[]>;
  getIndustriesPageData(): Promise<any>;
}
