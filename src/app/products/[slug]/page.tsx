import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProductSlugs, getProductBySlug } from "@/config/products";
import { KnowledgePageTemplate, KnowledgePageData } from "@/components/templates/KnowledgePageTemplate";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  
  const allSlugs = await getAllProductSlugs();
  const allProducts = await Promise.all(
    allSlugs.map(async (s) => {
      const data = await getProductBySlug(s);
      return {
        slug: data!.slug,
        title: data!.title,
        category: data!.category
      };
    })
  );

  const currentIndex = allProducts.findIndex(s => s.slug === slug);
  const prevPage = currentIndex > 0 ? { ...allProducts[currentIndex - 1], label: "Previous Product" } : null;
  const nextPage = currentIndex < allProducts.length - 1 ? { ...allProducts[currentIndex + 1], label: "Next Product" } : null;

  // Map CMS payload to the unified KnowledgePageData
  const pageData: KnowledgePageData = {
    slug: product.slug,
    category: product.category,
    heroVariant: "cinematic", 
    
    hero: {
      title: product.hero.headline,
      subtitle: product.hero.subheadline
    },
    
    overview: product.summary || product.shortDescription,
    productFeatures: product.overviewFeatures,
    
    gallery: product.dashboardScreenshots?.map(img => ({
      url: img.url,
      alt: img.alt
    })),
    
    architecture: product.architecture,
    integrations: product.integrations,
    pricingTiers: product.pricingTiers,
    productRoadmap: product.roadmap,
    faqs: product.faqs,

    relatedGroups: product.relations?.relatedContent ? [
      {
        domain: "Products" as any, 
        items: product.relations.relatedContent.map(r => ({
          slug: r.slug,
          title: r.title,
          shortDescription: r.type
        }))
      }
    ] : []
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.seo.title,
    "description": product.seo.description,
    "applicationCategory": "BusinessApplication",
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
        allPages={allProducts}
        prevPage={prevPage}
        nextPage={nextPage}
        basePath="/products"
      />
    </>
  );
}
