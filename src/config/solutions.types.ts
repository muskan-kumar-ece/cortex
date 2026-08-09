export interface SolutionProblem {
  problem: string;
  impact: string;
  solution: string;
}

export interface SolutionCapability {
  title: string;
  description: string;
  icon?: string;
}

export interface SolutionProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface SolutionTechStack {
  category: string;
  technologies: string[];
}

export interface SolutionBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface SolutionDetailsData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  iconPlaceholder?: string;

  // Page Sections
  hero: {
    headline: string;
    subheadline: string;
  };
  
  overview: string;
  
  businessProblems: SolutionProblem[];
  
  capabilities: SolutionCapability[]; // Maps to "Features"
  
  process: SolutionProcessStep[];
  
  techStack: SolutionTechStack[];
  
  benefits: SolutionBenefit[];
  
  faqs: SolutionFaq[];

  // Relationships (Foreign Keys for Django)
  relatedIndustries: string[]; // slugs
  relatedCaseStudies: string[]; // slugs
  
  seo: SolutionSeo;
}

// Hub Index Types
export interface SolutionsHubData {
  hero: {
    headline: string;
    description: string;
  };
  solutions: Pick<SolutionDetailsData, "slug" | "title" | "shortDescription" | "iconPlaceholder">[];
}

export interface SolutionsProvider {
  getSolutionsHubData(): Promise<SolutionsHubData>;
  getAllSolutionSlugs(): Promise<string[]>;
  getSolutionBySlug(slug: string): Promise<SolutionDetailsData | null>;
}
