export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  isPrimary?: boolean;
  // Buyer Journey Fields
  problem: string;
  howWeBuildIt: string;
  technologies: string[];
  businessOutcome: string;
}

export interface ServicesHeroData {
  headline: string;
  subheadline: string;
  description: string;
  primaryCta: {
    title: string;
    href: string;
  };
}

export interface WhyChooseCortexData {
  title: string;
  intro: string;
  reasons: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ServiceArchitectureData {
  title: string;
  description: string;
  features: string[];
}

export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
}

export interface TechStackData {
  title: string;
  description: string;
  technologies: TechStackItem[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface MetricsItem {
  value: string;
  label: string;
  trend: "up" | "down" | "neutral";
}

export interface MetricsData {
  title: string;
  description: string;
  items: MetricsItem[];
}

export interface ServicesCtaData {
  headline: string;
  subheadline: string;
  button: {
    title: string;
    href: string;
  };
}

export interface ServicesPageData {
  hero: ServicesHeroData;
  whyChooseUs: WhyChooseCortexData;
  architecture: ServiceArchitectureData;
  techStack: TechStackData;
  process: ProcessData;
  metrics: MetricsData;
  cta: ServicesCtaData;
}

// ----------------------------------------------------------------------
// NEW: Individual Service Detail Django Models
// ----------------------------------------------------------------------

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface ServiceDetailData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  
  overview: string;
  
  businessChallenges: {
    title: string;
    description: string;
  }[];
  
  solutions: {
    title: string;
    description: string;
    features: string[];
  };
  
  architecture: {
    title: string;
    description: string;
    diagramFeatures: string[];
  };
  
  techStack: {
    category: string;
    technologies: string[];
  }[];
  
  workflow: {
    step: number;
    title: string;
    description: string;
  }[];
  
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  
  metrics: {
    value: string;
    label: string;
  }[];
  
  faqs: {
    question: string;
    answer: string;
  }[];
  
  relatedServices: { slug: string; title: string; shortDescription: string }[];
  
  seo: SeoMetadata;
  
  published: boolean;
  order: number;
  featured: boolean;
}

export interface ServicesProvider {
  getCoreServices(): Promise<ServiceItem[]>;
  getServicesPageData(): Promise<ServicesPageData>;
  getAllServiceSlugs(): Promise<string[]>;
  getServiceBySlug(slug: string): Promise<ServiceDetailData | null>;
  getAllServicesList(): Promise<{ slug: string; title: string; category: string }[]>;
}
