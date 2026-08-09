import { KnowledgeHero } from "@/components/knowledge/KnowledgeHero";
import { KnowledgeOverview } from "@/components/knowledge/KnowledgeOverview";
import { KnowledgeChallenges } from "@/components/knowledge/KnowledgeChallenges";
import { KnowledgeArchitecture } from "@/components/knowledge/KnowledgeArchitecture";
import { KnowledgeTechStack } from "@/components/knowledge/KnowledgeTechStack";
import { KnowledgeWorkflow } from "@/components/knowledge/KnowledgeWorkflow";
import { KnowledgeBenefits } from "@/components/knowledge/KnowledgeBenefits";
import { KnowledgeFaq } from "@/components/knowledge/KnowledgeFaq";
import { KnowledgeCta } from "@/components/knowledge/KnowledgeCta";
import { KnowledgeRelatedContent } from "@/components/knowledge/KnowledgeRelatedContent";
import { KnowledgeSnapshot } from "@/components/knowledge/KnowledgeSnapshot";
import { KnowledgeMetrics } from "@/components/knowledge/KnowledgeMetrics";
import { KnowledgeCompliance } from "@/components/knowledge/KnowledgeCompliance";
import { KnowledgeDigitalRoadmap } from "@/components/knowledge/KnowledgeDigitalRoadmap";
import { KnowledgeAiOpportunities } from "@/components/knowledge/KnowledgeAiOpportunities";
import { KnowledgeHeroXL } from "@/components/knowledge/KnowledgeHeroXL";
import { KnowledgeSummary } from "@/components/knowledge/KnowledgeSummary";
import { KnowledgeDashboard } from "@/components/knowledge/KnowledgeDashboard";
import { KnowledgeBeforeAfter } from "@/components/knowledge/KnowledgeBeforeAfter";
import { KnowledgeGallery } from "@/components/knowledge/KnowledgeGallery";
import { KnowledgeTestimonial } from "@/components/knowledge/KnowledgeTestimonial";
import { KnowledgeDownloads } from "@/components/knowledge/KnowledgeDownloads";
import { KnowledgeBusinessImpact } from "@/components/knowledge/KnowledgeBusinessImpact";
import { KnowledgeProblemGrid } from "@/components/knowledge/KnowledgeProblemGrid";
import { KnowledgeCapabilities } from "@/components/knowledge/KnowledgeCapabilities";
import { KnowledgeBestPractices } from "@/components/knowledge/KnowledgeBestPractices";
import { KnowledgeLimitations } from "@/components/knowledge/KnowledgeLimitations";
import { KnowledgePerformanceBenchmarks } from "@/components/knowledge/KnowledgePerformanceBenchmarks";
import { KnowledgeIntegrations } from "@/components/knowledge/KnowledgeIntegrations";
import { KnowledgePricing } from "@/components/knowledge/KnowledgePricing";
import { KnowledgeProductRoadmap } from "@/components/knowledge/KnowledgeProductRoadmap";
import { KnowledgeFeatureGrid } from "@/components/knowledge/KnowledgeFeatureGrid";
import { KnowledgeExecutiveDashboard } from "@/components/knowledge/KnowledgeExecutiveDashboard";
import { KnowledgeArchitectureDecision } from "@/components/knowledge/KnowledgeArchitectureDecision";
import { KnowledgeLessonsLearned } from "@/components/knowledge/KnowledgeLessonsLearned";
import { KnowledgeRoi } from "@/components/knowledge/KnowledgeRoi";
import { KnowledgeContent } from "@/components/knowledge/KnowledgeContent";
import { KnowledgeAuthorCard } from "@/components/knowledge/KnowledgeAuthorCard";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { PaginationNav } from "@/components/layout/PaginationNav";

export interface KnowledgePageData {
  slug: string;
  category?: string;
  
  // Hero Fields
  heroVariant?: "default" | "cinematic";
  client?: string;
  industry?: string;
  duration?: string;
  teamSize?: string;
  
  hero: {
    title: string;
    subtitle: string;
  };
  overview: string;
  snapshot?: { executiveSummary: string; marketChallenges: string[]; };
  challenges?: { title: string; description: string; }[];
  architecture?: { title: string; description: string; diagramFeatures: string[]; };
  workflow?: { step: number; title: string; description: string; }[];
  benefits?: { title: string; description: string; icon: string; }[];
  techStack?: { category: string; technologies: string[]; }[];
  faqs?: { question: string; answer: string; }[];
  relatedContent?: { slug: string; title: string; shortDescription: string; }[];
  metrics?: { label: string; value: string; trend: "up"|"down"|"neutral"; description?: string; }[];
  compliance?: { standard: string; description: string; }[];
  roadmap?: { phase: string; title: string; description: string; }[];
  aiOpportunities?: { useCase: string; description: string; impact: string; }[];
  
  // New Portfolio Fields
  summary?: string;
  timeline?: { phase: string; title: string; description: string; }[];
  visualType?: "dashboard" | "architecture" | "network" | "data";
  dashboard?: { imageUrl: string; alt: string; hotspots?: { x: number; y: number; label: string; }[]; };
  beforeAfter?: { metricName: string; beforeLabel: string; beforeValue: string; afterLabel: string; afterValue: string; improvement: string; }[];
  roi?: { label: string; value: string; }[];
  businessImpact?: { title: string; description: string; points: string[]; };
  gallery?: { url: string; alt: string; span?: "col-span-1" | "col-span-2" | "row-span-2"; }[];
  testimonial?: { quote: string; author: string; role: string; company: string; logo?: string; };
  downloads?: { title: string; type: string; size: string; url: string; }[];
  
  // Solutions specific fields
  businessProblems?: { problem: string; impact: string; solution: string; }[];
  capabilities?: { title: string; description: string; icon?: string; }[];
  
  // Technologies specific fields
  integrations?: { name: string; description: string; logoPlaceholder?: string; }[];
  performance?: { metric: string; value: string; context: string; }[];
  bestPractices?: { title: string; description: string; type: "do" | "dont"; }[];
  limitations?: { title: string; description: string; }[];
  
  // Products specific fields
  pricingTiers?: any[];
  productRoadmap?: any[];
  productFeatures?: any[];
  
  // Case Studies specific fields
  executiveDashboard?: any;
  architectureDecisions?: any[];
  caseStudyBeforeAfter?: any;
  caseStudyRoi?: any;
  lessonsLearned?: any[];
  
  // Multi-domain related groups
  relatedGroups?: { domain: "Services" | "Industries" | "Case Studies" | "Resources" | "Products" | "Technologies" | "Solutions"; items: { slug: string; title: string; shortDescription?: string; }[]; }[];
  
  // Resources specific fields
  contentBlocks?: any[];
  author?: { name: string; role: string; avatarPlaceholder?: string; linkedin?: string; twitter?: string; };
  publishedDate?: string;
  readingTime?: string;
}

export interface KnowledgePageProps {
  data: KnowledgePageData;
  allPages: { slug: string; title: string; category: string; }[];
  prevPage: { slug: string; title: string; label: string; } | null;
  nextPage: { slug: string; title: string; label: string; } | null;
  basePath: string; // e.g., "/services", "/industries"
}

export function KnowledgePageTemplate({ data, allPages, prevPage, nextPage, basePath }: KnowledgePageProps) {
  return (
    <article className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      
      {data.heroVariant === "cinematic" ? (
        <KnowledgeHeroXL
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          client={data.client || "Client"}
          industry={data.industry || "Enterprise"}
          duration={data.duration || "N/A"}
          teamSize={data.teamSize || "N/A"}
          metrics={data.roi}
          visualType={data.visualType}
        />
      ) : (
        <KnowledgeHero 
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          category={data.category || allPages.find(p => p.slug === data.slug)?.category || "Enterprise"}
        />
      )}

      {data.summary && (
        <KnowledgeSummary summary={data.summary} />
      )}

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Left Sidebar (Sticky Navigation) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <SidebarNav items={allPages} basePath={basePath} />
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 min-w-0 flex flex-col gap-16 md:gap-24 pb-24">
            {data.executiveDashboard && (
              <KnowledgeExecutiveDashboard dashboard={data.executiveDashboard} />
            )}
            
            {data.overview && (
              <KnowledgeOverview overview={data.overview} />
            )}
            
            {data.contentBlocks && data.contentBlocks.length > 0 && (
              <KnowledgeContent blocks={data.contentBlocks} />
            )}

            {data.snapshot && (
              <KnowledgeSnapshot executiveSummary={data.snapshot.executiveSummary} marketChallenges={data.snapshot.marketChallenges} />
            )}

            {data.businessProblems && data.businessProblems.length > 0 && (
              <KnowledgeProblemGrid problems={data.businessProblems} />
            )}
            
            {data.capabilities && data.capabilities.length > 0 && (
              <KnowledgeCapabilities capabilities={data.capabilities} />
            )}
            
            {data.productFeatures && data.productFeatures.length > 0 && (
              <KnowledgeFeatureGrid features={data.productFeatures} />
            )}
            
            {data.challenges && data.challenges.length > 0 && (
              <KnowledgeChallenges challenges={data.challenges} />
            )}
            
            {data.workflow && data.workflow.length > 0 && (
              <KnowledgeWorkflow workflow={data.workflow} />
            )}
            
            {data.caseStudyBeforeAfter && data.caseStudyBeforeAfter.length > 0 && (
              <KnowledgeBeforeAfter metrics={data.caseStudyBeforeAfter} />
            )}
            
            {data.architectureDecisions && data.architectureDecisions.length > 0 && (
              <KnowledgeArchitectureDecision decisions={data.architectureDecisions} />
            )}

            {data.metrics && data.metrics.length > 0 && (
              <KnowledgeMetrics metrics={data.metrics} />
            )}
            
            {data.caseStudyRoi && (
              <KnowledgeRoi roi={data.caseStudyRoi} />
            )}
            
            {data.architecture && (
              <KnowledgeArchitecture data={data.architecture} slug={data.slug} />
            )}
            
            {data.roadmap && data.roadmap.length > 0 && (
              <KnowledgeDigitalRoadmap phases={data.roadmap} />
            )}
            
            {data.aiOpportunities && data.aiOpportunities.length > 0 && (
              <KnowledgeAiOpportunities opportunities={data.aiOpportunities} />
            )}
            

            {data.integrations && data.integrations.length > 0 && (
              <KnowledgeIntegrations integrations={data.integrations} />
            )}
            
            {data.performance && data.performance.length > 0 && (
              <KnowledgePerformanceBenchmarks performance={data.performance} />
            )}
            
            {data.compliance && data.compliance.length > 0 && (
              <KnowledgeCompliance items={data.compliance} />
            )}
            
            {data.benefits && data.benefits.length > 0 && (
              <KnowledgeBenefits benefits={data.benefits} />
            )}
            
            {data.techStack && data.techStack.length > 0 && (
              <KnowledgeTechStack techStack={data.techStack} />
            )}
            
            {data.dashboard && (
              <KnowledgeDashboard dashboard={data.dashboard} />
            )}
            
            {data.beforeAfter && data.beforeAfter.length > 0 && (
              <KnowledgeBeforeAfter metrics={data.beforeAfter} />
            )}
            
            {data.businessImpact && (
              <KnowledgeBusinessImpact impact={data.businessImpact} roi={data.roi} />
            )}
            
            {data.timeline && data.timeline.length > 0 && (
              <KnowledgeDigitalRoadmap phases={data.timeline} /> // Timeline works identical to Roadmap
            )}
            
            {data.gallery && data.gallery.length > 0 && (
              <KnowledgeGallery gallery={data.gallery} />
            )}
            
            {data.testimonial && (
              <KnowledgeTestimonial testimonial={data.testimonial} />
            )}
            
            {data.downloads && data.downloads.length > 0 && (
              <KnowledgeDownloads downloads={data.downloads.map(dl => ({
                title: dl.title,
                description: "Download associated asset",
                fileType: dl.type as any,
                size: dl.size,
                version: "1.0",
                url: dl.url
              }))} />
            )}
            
            {data.bestPractices && data.bestPractices.length > 0 && (
              <KnowledgeBestPractices practices={data.bestPractices} />
            )}
            
            {data.limitations && data.limitations.length > 0 && (
              <KnowledgeLimitations limitations={data.limitations} />
            )}
            
            {data.pricingTiers && data.pricingTiers.length > 0 && (
              <KnowledgePricing tiers={data.pricingTiers} />
            )}
            
            {data.productRoadmap && data.productRoadmap.length > 0 && (
              <KnowledgeProductRoadmap roadmap={data.productRoadmap} />
            )}
            
            {data.lessonsLearned && data.lessonsLearned.length > 0 && (
              <KnowledgeLessonsLearned lessons={data.lessonsLearned} />
            )}
            
            {data.faqs && data.faqs.length > 0 && (
              <KnowledgeFaq faqs={data.faqs} />
            )}
            
            {data.author && (
              <KnowledgeAuthorCard author={data.author as any} />
            )}

            {/* Pagination at the end of the content body */}
            <PaginationNav prev={prevPage} next={nextPage} basePath={basePath} />
          </main>
          
        </div>
      </div>

      {/* Full width bottom sections */}
      {data.relatedGroups && data.relatedGroups.length > 0 ? (
        <KnowledgeRelatedContent relatedGroups={data.relatedGroups} />
      ) : data.relatedContent && data.relatedContent.length > 0 ? (
        <KnowledgeRelatedContent relatedGroups={[{ domain: "Services", items: data.relatedContent }]} />
      ) : null}
      
      <KnowledgeCta serviceTitle={data.hero.title} />
    </article>
  );
}
