/**
 * app/services/[slug]/page.tsx — Service Detail (Server Component)
 *
 * Fetches service data from the live CMS backend.
 * The backend Service.content{} JSON field stores rich detail data.
 * We adapt it to the KnowledgePageTemplate shape.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KnowledgePageTemplate } from "@/components/templates/KnowledgePageTemplate";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  getServiceBySlug,
  getAllServiceSlugs,
  getAllServices,
} from "@/services/cms/services.service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
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

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
  ]);

  if (!service || service.status !== "Published") {
    notFound();
  }

  const content = service.content || {};
  const allServicesList = allServices.map((s) => ({
    slug: s.slug,
    title: s.title,
    category: s.tier || "Core",
  }));

  const currentIndex = allServicesList.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? { ...allServicesList[currentIndex - 1], label: "Previous Service" } : null;
  const nextService = currentIndex < allServicesList.length - 1 ? { ...allServicesList[currentIndex + 1], label: "Next Service" } : null;

  // Adapt backend fields → KnowledgePageTemplate shape
  const painPoints: string[] = (content.pain_points as string[]) ?? [];
  const technologies: string[] = (content.technologies as string[]) ?? [];
  const outcomes: string[] = (content.outcomes as string[]) ?? [];

  const pageData = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    shortDescription: service.summary,
    hero: {
      title: service.title,
      subtitle: service.summary,
    },
    overview: service.description || (content.solution_overview as string) || service.summary,
    challenges: painPoints.map((p, i) => ({ title: `Challenge ${i + 1}`, description: p })),
    solutions: {
      title: "Our Solution",
      description: (content.how_we_build_it as string) || (content.solution_overview as string) || "",
      features: outcomes,
    },
    architecture: {
      title: "Service Architecture",
      description: "Our approach to delivering this service at scale.",
      diagramFeatures: technologies,
    },
    techStack: [{ category: "Technologies", technologies }],
    workflow: (content.workflow as { step: number; title: string; description: string }[]) ?? [],
    benefits: outcomes.map((o, i) => ({ title: `Outcome ${i + 1}`, description: o, icon: "CheckCircle2" })),
    metrics: ((content.metrics as { value: string; label: string }[]) ?? []),
    faqs: ((content.faqs as { question: string; answer: string }[]) ?? []),
    relatedServices: service.related_services_slugs.map((r) => ({
      slug: r.slug,
      title: r.name,
      shortDescription: "",
    })),
    seo: {
      title: `${service.title} | Cortex IT Solution`,
      description: service.summary,
      keywords: [],
    },
    published: service.status === "Published",
    order: service.display_order,
    featured: false,
    category: allServicesList.find((s) => s.slug === slug)?.category || "Core",
    relatedContent: service.related_services_slugs.map((r) => ({
      slug: r.slug,
      title: r.name,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: "Cortex IT Solution",
      url: "https://b10itsolution.com",
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <div className="absolute top-24 left-0 w-full z-50 pt-4">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
        </div>
      </div>
      <KnowledgePageTemplate
        data={pageData as any}
        allPages={allServicesList}
        prevPage={prevService}
        nextPage={nextService}
        basePath="/services"
      />
    </>
  );
}
