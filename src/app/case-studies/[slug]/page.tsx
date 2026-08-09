import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CASE_STUDIES_DB } from "@/constants/case-studies";
import { KnowledgePageTemplate, KnowledgePageData } from "@/components/templates/KnowledgePageTemplate";

export async function generateStaticParams() {
  const slugs = Object.keys(CASE_STUDIES_DB);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES_DB[slug];
  if (!cs) return {};

  return {
    title: cs.seo.title,
    description: cs.seo.description,
    keywords: cs.seo.keywords,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES_DB[slug];
  if (!cs) notFound();
  
  const allSlugs = Object.keys(CASE_STUDIES_DB);
  const allCs = allSlugs.map((s) => {
    const data = CASE_STUDIES_DB[s];
    return {
      slug: data.slug,
      title: data.title,
      category: data.category
    };
  });

  const currentIndex = allCs.findIndex(s => s.slug === slug);
  const prevPage = currentIndex > 0 ? { ...allCs[currentIndex - 1], label: "Previous Case Study" } : null;
  const nextPage = currentIndex < allCs.length - 1 ? { ...allCs[currentIndex + 1], label: "Next Case Study" } : null;

  // Map CMS payload to the unified KnowledgePageData
  const pageData: KnowledgePageData = {
    slug: cs.slug,
    category: cs.category,
    heroVariant: "cinematic", 
    
    hero: {
      title: cs.hero.headline,
      subtitle: cs.hero.subheadline
    },
    
    overview: cs.summary || cs.shortDescription || "",
    executiveDashboard: cs.executiveDashboard,
    businessProblems: cs.businessChallenge ? [{ problem: "The Challenge", impact: cs.businessChallenge, solution: "" }] : [],
    
    // Convert beforeAfter to template structure
    caseStudyBeforeAfter: cs.beforeAfter && cs.beforeAfter.before.length > 0 ? cs.beforeAfter.before.map((b, i) => {
      const a = cs.beforeAfter!.after[i];
      return {
        metricName: b.metric,
        beforeLabel: "Before",
        beforeValue: b.value,
        afterLabel: "After",
        afterValue: a ? a.value : "",
        improvement: "Improved"
      };
    }) : undefined,

    architectureDecisions: cs.architectureDecisions,
    workflow: cs.timeline?.map(t => ({ step: t.step, title: t.title, description: t.description })),
    gallery: cs.gallery,
    metrics: cs.businessImpact?.map(m => ({ label: m.metric, value: m.value, trend: "neutral" as any, description: m.context })),
    caseStudyRoi: cs.roi,
    lessonsLearned: cs.lessonsLearned,
    
    relatedGroups: cs.relations?.relatedContent ? [
      {
        domain: "Case Studies" as any, 
        items: cs.relations.relatedContent.map(r => ({
          slug: r.slug,
          title: r.title,
          shortDescription: r.type
        }))
      }
    ] : []
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": cs.seo.title,
    "description": cs.seo.description,
    "publisher": {
      "@type": "Organization",
      "name": "Cortex IT Solution"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KnowledgePageTemplate 
        data={pageData}
        allPages={allCs}
        prevPage={prevPage}
        nextPage={nextPage}
        basePath="/case-studies"
      />
    </>
  );
}
