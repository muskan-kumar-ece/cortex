import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllSolutionSlugs, getSolutionBySlug } from "@/config/solutions";
import { KnowledgePageTemplate, KnowledgePageData } from "@/components/templates/KnowledgePageTemplate";

export async function generateStaticParams() {
  const slugs = await getAllSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: solution.seo.title,
    description: solution.seo.description,
    keywords: solution.seo.keywords,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) notFound();
  
  const allSlugs = await getAllSolutionSlugs();
  const allSolutions = await Promise.all(
    allSlugs.map(async (s) => {
      const data = await getSolutionBySlug(s);
      return {
        slug: data!.slug,
        title: data!.title,
        category: "Enterprise Solutions" // Generic category for the sidebar
      };
    })
  );

  const currentIndex = allSolutions.findIndex(s => s.slug === slug);
  const prevPage = currentIndex > 0 ? { ...allSolutions[currentIndex - 1], label: "Previous Solution" } : null;
  const nextPage = currentIndex < allSolutions.length - 1 ? { ...allSolutions[currentIndex + 1], label: "Next Solution" } : null;

  // Map CMS payload to the unified KnowledgePageData
  const pageData: KnowledgePageData = {
    slug: solution.slug,
    category: "Solutions",
    heroVariant: "cinematic", // Solutions get the massive premium cinematic hero!
    
    hero: {
      title: solution.hero.headline,
      subtitle: solution.hero.subheadline,
    },
    
    overview: solution.overview,
    businessProblems: solution.businessProblems,
    capabilities: solution.capabilities,
    workflow: solution.process,
    techStack: solution.techStack,
    benefits: solution.benefits.map(b => ({ ...b, icon: b.icon || "CheckCircle2" })),
    faqs: solution.faqs,

    relatedGroups: [
      {
        domain: "Industries" as const,
        items: solution.relatedIndustries.map(slug => ({
          slug,
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shortDescription: "Industry domain expertise."
        }))
      },
      {
        domain: "Case Studies" as const,
        items: solution.relatedCaseStudies.map(slug => ({
          slug,
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shortDescription: "Enterprise transformation."
        }))
      }
    ].filter(g => g.items.length > 0)
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": solution.seo.title,
    "description": solution.seo.description,
    "provider": {
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
        allPages={allSolutions}
        prevPage={prevPage}
        nextPage={nextPage}
        basePath="/solutions"
      />
    </>
  );
}
