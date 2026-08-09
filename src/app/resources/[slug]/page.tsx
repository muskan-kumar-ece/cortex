/**
 * app/resources/[slug]/page.tsx — Resource Detail (Server Component)
 *
 * Fetches resource data from the live CMS backend.
 * Adapts BackendResource.content{} JSON to KnowledgePageTemplate shape.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KnowledgePageTemplate, KnowledgePageData } from "@/components/templates/KnowledgePageTemplate";
import {
  getResourceBySlug,
  getAllResourceSlugs,
  getAllResources,
} from "@/services/cms/resources.service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getResourceBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.title} | Cortex IT Solution`,
    description: data.summary,
    openGraph: {
      title: `${data.title} | Cortex IT Solution`,
      description: data.summary,
      type: "article",
    },
  };
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [resource, allResources] = await Promise.all([
    getResourceBySlug(slug),
    getAllResources(),
  ]);

  if (!resource || resource.status !== "Published") {
    notFound();
  }

  const content = resource.content || {};
  const allPages = allResources.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category_slug ?? "Resource",
  }));

  const currentIndex = allPages.findIndex((r) => r.slug === slug);
  const prevPage = currentIndex > 0 ? { ...allPages[currentIndex - 1], label: "Previous Resource" } : null;
  const nextPage = currentIndex < allPages.length - 1 ? { ...allPages[currentIndex + 1], label: "Next Resource" } : null;

  const sections: { title: string; body: string }[] = (content.sections as { title: string; body: string }[]) ?? [];
  const author: { name: string; role: string } = (content.author as { name: string; role: string }) ?? {
    name: "B10 Engineering Team",
    role: "Staff Engineers",
  };

  const contentBlocks = sections.map((s) => ({
    type: "text" as const,
    heading: s.title,
    body: s.body,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.summary,
    author: { "@type": "Person", name: author.name, jobTitle: author.role },
    publisher: { "@type": "Organization", name: "Cortex IT Solution" },
  };

  const templateData: KnowledgePageData = {
    slug,
    hero: { title: resource.title, subtitle: resource.summary },
    category: resource.category_slug ?? "Resource",
    author,
    contentBlocks: contentBlocks.length > 0 ? contentBlocks : undefined,
    overview: resource.summary,
    relatedGroups: [] as any,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KnowledgePageTemplate
        data={templateData}
        allPages={allPages}
        prevPage={prevPage}
        nextPage={nextPage}
        basePath="/resources"
      />
    </>
  );
}
