/**
 * app/industries/[slug]/page.tsx — Industry Detail (Server Component)
 *
 * Fetches industry data from the live CMS backend.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KnowledgePageTemplate } from "@/components/templates/KnowledgePageTemplate";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  getIndustryBySlug,
  getAllIndustrySlugs,
  getAllIndustries,
} from "@/services/cms/industries.service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getIndustryBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.title} | Cortex IT Solution`,
    description: data.summary || data.description,
    openGraph: {
      title: `${data.title} | Cortex IT Solution`,
      description: data.summary || data.description,
      type: "website",
    },
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [industry, allIndustries] = await Promise.all([
    getIndustryBySlug(slug),
    getAllIndustries(),
  ]);

  if (!industry || industry.status !== "Published") {
    notFound();
  }

  const content = industry.content || {};
  const allIndustriesList = allIndustries.map((i) => ({
    slug: i.slug,
    title: i.title,
    category: "Enterprise Industry",
  }));

  const currentIndex = allIndustriesList.findIndex((i) => i.slug === slug);
  const prevIndustry = currentIndex > 0 ? { ...allIndustriesList[currentIndex - 1], label: "Previous Industry" } : null;
  const nextIndustry = currentIndex < allIndustriesList.length - 1 ? { ...allIndustriesList[currentIndex + 1], label: "Next Industry" } : null;

  const challenges = industry.use_cases.map((uc) => ({
    title: uc.title,
    description: uc.description,
  }));

  const pageData = {
    id: industry.id,
    slug: industry.slug,
    title: industry.title,
    shortDescription: industry.summary,
    hero: { title: industry.title, subtitle: industry.summary },
    overview: industry.description || (content.overview as string) || industry.summary,
    challenges,
    solutions: {
      title: "Our Approach",
      description: `Our engineering practice for ${industry.title} clients.`,
      features: industry.related_services_slugs.map((r) => r.name),
    },
    architecture: {
      title: "Solution Architecture",
      description: "Scalable, domain-specific architecture patterns.",
      diagramFeatures: (content.challenges as string[]) ?? [],
    },
    techStack: [],
    workflow: [],
    benefits: challenges.map((c) => ({ ...c, icon: "CheckCircle2" })),
    metrics: (content.metrics as { value: string; label: string }[]) ?? [],
    faqs: [],
    relatedContent: industry.related_services_slugs.map((r) => ({ slug: r.slug, title: r.name })),
    seo: { title: `${industry.title} | Cortex IT Solution`, description: industry.summary, keywords: [] },
    published: industry.status === "Published",
    order: industry.display_order,
    featured: false,
    category: "Enterprise Industry",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.title,
    description: industry.summary,
    publisher: { "@type": "Organization", name: "Cortex IT Solution", url: "https://b10itsolution.com" },
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <div className="absolute top-24 left-0 w-full z-50 pt-4">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Industries", href: "/industries" }, { label: industry.title }]} />
        </div>
      </div>
      <KnowledgePageTemplate
        data={pageData as any}
        allPages={allIndustriesList}
        prevPage={prevIndustry}
        nextPage={nextIndustry}
        basePath="/industries"
      />
    </>
  );
}
