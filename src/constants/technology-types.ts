export interface TechnologyBestPractice {
  title: string;
  description: string;
  type: "do" | "dont";
}

export interface TechnologyLimitation {
  title: string;
  description: string;
}

export interface TechnologyIntegration {
  name: string;
  description: string;
  logoPlaceholder?: string;
}

export interface TechnologyPerformance {
  metric: string;
  value: string;
  context: string;
}

export interface TechnologySeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface TechnologyDetailsData {
  id: string;
  slug: string;
  title: string;
  category: "Frontend" | "Backend" | "Cloud" | "DevOps" | "AI" | "Data" | "Infrastructure" | "Mobile" | "Security" | "Database";
  shortDescription: string;
  iconPlaceholder?: string;

  // Page Sections
  hero: {
    headline: string;
    subheadline: string;
  };
  
  overview: string;
  
  businessBenefits: { title: string; description: string; icon?: string; }[];
  
  technicalAdvantages: { title: string; description: string; }[];
  
  architecture?: { title: string; description: string; diagramFeatures: string[]; };
  
  integrations?: TechnologyIntegration[];
  
  performance?: TechnologyPerformance[];
  
  security?: { standard: string; description: string; }[];
  
  deploymentWorkflow?: { step: number; title: string; description: string; }[];
  
  bestPractices?: TechnologyBestPractice[];
  
  limitations?: TechnologyLimitation[];
  
  faqs?: { question: string; answer: string; }[];

  // Cross-linking Relationships (Foreign Keys for Django)
  relatedTechnologies: string[];
  recommendedServices: string[];
  recommendedSolutions: string[];
  recommendedResources: string[];
  realWorldProjects: string[]; // Maps to Case Studies / Portfolio
  
  seo: TechnologySeo;
}

// Hub Index Types
export interface TechnologiesHubData {
  hero: {
    headline: string;
    description: string;
  };
  technologies: Pick<TechnologyDetailsData, "slug" | "title" | "category" | "shortDescription" | "iconPlaceholder">[];
}

export interface TechnologiesProvider {
  getTechnologiesHubData(): Promise<TechnologiesHubData>;
  getAllTechnologySlugs(): Promise<string[]>;
  getTechnologyBySlug(slug: string): Promise<TechnologyDetailsData | null>;
}
