import { BaseKnowledgeData } from "@/cms/core/taxonomy";

export interface ArchitectureDecision {
  technology: string;
  question: string; // e.g. "Why React?"
  reasoning: string;
}

export interface CaseStudyLesson {
  title: string;
  description: string;
  type: "success" | "challenge" | "future";
}

export interface CaseStudyDetailsData extends BaseKnowledgeData {
  hero: {
    headline: string;
    subheadline: string;
    clientLogo?: string;
  };
  
  executiveDashboard: {
    client: string;
    industry: string;
    duration: string;
    teamSize: string;
    region: string;
    primaryKpi: { label: string; value: string; trend?: string; };
    secondaryKpi: { label: string; value: string; trend?: string; };
    tertiaryKpi: { label: string; value: string; trend?: string; };
  };

  businessChallenge: string;
  discovery: string;
  
  beforeAfter: {
    before: { metric: string; value: string; }[];
    after: { metric: string; value: string; }[];
  };
  
  architectureDecisions: ArchitectureDecision[];
  
  solution: string;
  
  timeline: { step: number; title: string; description: string; date?: string; }[];
  
  gallery: { url: string; alt: string; caption?: string; }[];
  
  businessImpact: { metric: string; value: string; context: string; }[];
  
  roi: { description: string; percentage: string; timeframe: string; };
  
  lessonsLearned: CaseStudyLesson[];
  
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl?: string;
  };
}

export interface CaseStudiesHubData {
  hero: {
    headline: string;
    description: string;
  };
  featuredCaseStudySlug: string;
  caseStudies: Pick<CaseStudyDetailsData, "slug" | "title" | "shortDescription" | "category" | "executiveDashboard">[];
}

export interface CaseStudiesProvider {
  getCaseStudiesHubData(): Promise<CaseStudiesHubData>;
  getAllCaseStudySlugs(): Promise<string[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudyDetailsData | null>;
}
