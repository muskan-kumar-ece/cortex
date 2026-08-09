export type ContentType = 
  | "Blog" 
  | "Guide" 
  | "Tutorial" 
  | "Research" 
  | "Documentation" 
  | "Whitepaper" 
  | "Playbook" 
  | "Checklist" 
  | "Architecture" 
  | "Release Notes" 
  | "Best Practices" 
  | "Case Study" 
  | "Video" 
  | "Download";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type ResourceCategory =
  | "All"
  | "Engineering"
  | "AI"
  | "Cloud"
  | "Product Development"
  | "UI/UX"
  | "DevOps"
  | "Case Studies"
  | "Company Updates";

export interface ResourceAuthor {
  name: string;
  role: string;
  avatarPlaceholder?: string;
  linkedin?: string;
  twitter?: string;
}

// ---------------------------------------------------------
// CONTENT BLOCK MODELS (The Engine)
// ---------------------------------------------------------

export type ContentBlockType = 
  | "heading" 
  | "paragraph" 
  | "image" 
  | "code" 
  | "architecture" 
  | "table" 
  | "quote" 
  | "alert" 
  | "checklist" 
  | "video" 
  | "download" 
  | "metrics" 
  | "timeline" 
  | "diagram";

export interface BaseBlock {
  id: string;
  type: ContentBlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: "h2" | "h3" | "h4";
  text: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  text: string; // supports limited markdown or HTML strings
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
}

export interface CodeBlock extends BaseBlock {
  type: "code";
  language: string;
  filename?: string;
  code: string;
  highlightLines?: number[];
}

export interface ArchitectureBlock extends BaseBlock {
  type: "architecture";
  visualType: "AiNetworkVisual" | "CloudArchitectureVisual" | "EnterpriseDashboardVisual" | "DataVisualizationVisual";
  caption?: string;
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  text: string;
  author?: string;
  role?: string;
}

export interface AlertBlock extends BaseBlock {
  type: "alert";
  variant: "info" | "warning" | "success" | "error";
  title?: string;
  text: string;
}

export interface ChecklistBlock extends BaseBlock {
  type: "checklist";
  items: { text: string; checked: boolean }[];
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  url: string;
  title: string;
  provider: "youtube" | "vimeo" | "custom";
}

export interface DownloadBlock extends BaseBlock {
  type: "download";
  title: string;
  description: string;
  fileType: "PDF" | "DOCX" | "ZIP" | "Presentation" | "Template" | "Whitepaper" | "Architecture";
  size: string;
  version: string;
  url: string;
}

export interface MetricsBlock extends BaseBlock {
  type: "metrics";
  title?: string;
  stats: { value: string; label: string; trend?: "up" | "down" }[];
}

export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  phases: { phase: string; title: string; description: string }[];
}

export interface DiagramBlock extends BaseBlock {
  type: "diagram";
  mermaidCode: string;
  caption?: string;
}

export type ContentBlock = 
  | HeadingBlock 
  | ParagraphBlock 
  | ImageBlock 
  | CodeBlock 
  | ArchitectureBlock 
  | TableBlock 
  | QuoteBlock 
  | AlertBlock 
  | ChecklistBlock 
  | VideoBlock 
  | DownloadBlock 
  | MetricsBlock 
  | TimelineBlock
  | DiagramBlock;


// ---------------------------------------------------------
// KNOWLEDGE CONTEXT (AI Chatbot Consumption)
// ---------------------------------------------------------

export interface KnowledgeContext {
  title: string;
  summary: string;
  keywords: string[];
  technologies: string[];
  services: string[];
  industries: string[];
  painPoints: string[];
  solutions: string[];
  faq: { question: string; answer: string }[];
  relatedKnowledge: string[]; // slugs
}


// ---------------------------------------------------------
// RESOURCE SCHEMAS
// ---------------------------------------------------------

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface ResourceDetailsData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ResourceCategory;
  contentType: ContentType;
  author: ResourceAuthor;
  
  publishedDate: string;
  updatedDate: string;
  featured: boolean;
  readingTime: string; // e.g. "5 min read"
  difficulty: DifficultyLevel;
  
  heroImagePlaceholder: string;
  
  // The actual long-form dynamic content
  contentBlocks: ContentBlock[];
  
  // Explicit downloads attached to the resource root (in addition to inline Download blocks)
  downloads?: Omit<DownloadBlock, "id" | "type">[];
  
  // AI Context
  aiContext: KnowledgeContext;
  
  // SEO Meta
  seo: SEOData;
  
  // Cross-linking
  relatedResources: string[]; // Slugs
  relatedServices: string[]; // Slugs
  relatedIndustries: string[]; // Slugs
  relatedPortfolio: string[]; // Slugs
}


// For lists and indexing (lightweight version of ResourceDetailsData)
export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentType: ContentType;
  category: ResourceCategory;
  tags: string[];
  author: ResourceAuthor;
  publishedAt: string;
  readingTime: string;
  difficulty?: DifficultyLevel;
  featured: boolean;
  heroImagePlaceholder: string; 
  href: string; // Usually /resources/slug
}

export interface ResourcesHeroData {
  headline: string;
  subheadline: string;
  description: string;
}

export interface KnowledgeCenterData {
  title: string;
  categories: ResourceCategory[];
  featuredArticles: ResourceItem[];
  recentArticles: ResourceItem[];
}

export interface NewsletterData {
  headline: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
}

export interface ResourcesPageData {
  hero: ResourcesHeroData;
  knowledgeCenter: KnowledgeCenterData;
  newsletter: NewsletterData;
}

export interface ResourcesProvider {
  getResourcesPageData(): Promise<ResourcesPageData>;
  getAllResourceSlugs(): Promise<string[]>;
  getResourceBySlug(slug: string): Promise<ResourceDetailsData | null>;
}
