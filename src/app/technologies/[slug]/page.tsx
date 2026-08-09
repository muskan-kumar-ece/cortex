import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TECHNOLOGIES_DB } from "@/constants/technologies";
import { KnowledgePageTemplate, KnowledgePageData } from "@/components/templates/KnowledgePageTemplate";

export async function generateStaticParams() {
  const slugs = Object.keys(TECHNOLOGIES_DB);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = TECHNOLOGIES_DB[slug];
  if (!tech) return {};

  return {
    title: tech.seo.title,
    description: tech.seo.description,
    keywords: tech.seo.keywords,
  };
}

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = TECHNOLOGIES_DB[slug];
  if (!tech) notFound();
  
  const allSlugs = Object.keys(TECHNOLOGIES_DB);
  const allTechnologies = allSlugs.map((s) => {
    const data = TECHNOLOGIES_DB[s];
    return {
      slug: data.slug,
      title: data.title,
      category: data.category
    };
  });

  const currentIndex = allTechnologies.findIndex(s => s.slug === slug);
  const prevPage = currentIndex > 0 ? { ...allTechnologies[currentIndex - 1], label: "Previous Technology" } : null;
  const nextPage = currentIndex < allTechnologies.length - 1 ? { ...allTechnologies[currentIndex + 1], label: "Next Technology" } : null;

  // Map CMS payload to the unified KnowledgePageData
  const pageData: KnowledgePageData = {
    slug: tech.slug,
    category: tech.category,
    heroVariant: "default", // Default knowledge hero with category badge
    
    hero: {
      title: tech.hero.headline,
      subtitle: tech.hero.subheadline,
    },
    
    overview: tech.overview,
    benefits: tech.businessBenefits.map(b => ({ ...b, icon: b.icon || "CheckCircle2" })),
    challenges: tech.technicalAdvantages.map(t => ({ title: t.title, description: t.description })), // Mapping technical advantages to challenges grid conceptually (or I can map it to a generic features grid later, but challenges works perfectly as a feature highlight)
    architecture: tech.architecture,
    workflow: tech.deploymentWorkflow,
    integrations: tech.integrations,
    performance: tech.performance,
    compliance: tech.security,
    bestPractices: tech.bestPractices,
    limitations: tech.limitations,
    faqs: tech.faqs,

    relatedGroups: [
      {
        domain: "Services" as const,
        items: tech.recommendedServices.map(slug => ({
          slug,
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shortDescription: "Core engineering capability."
        }))
      },
      {
        domain: "Case Studies" as const,
        items: tech.realWorldProjects.map(slug => ({
          slug,
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shortDescription: "Production deployment."
        }))
      },
      {
        domain: "Resources" as const,
        items: tech.recommendedResources.map(slug => ({
          slug,
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shortDescription: "Engineering insights."
        }))
      }
    ].filter(g => g.items.length > 0)
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tech.seo.title,
    "description": tech.seo.description,
    "applicationCategory": "DeveloperApplication",
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
        allPages={allTechnologies}
        prevPage={prevPage}
        nextPage={nextPage}
        basePath="/technologies"
      />
    </>
  );
}
