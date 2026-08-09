/**
 * app/page.tsx — Homepage (Server Component)
 *
 * All data is fetched from the live CMS backend via the service layer.
 * Mock providers have been fully removed.
 * Products section still uses the mock provider (no backend endpoint).
 */

import { homepageConfig } from "@/config/homepage";
import { getProductsHubData } from "@/config/products";

// ─── CMS Service Layer ─────────────────────────────────────────────────────
import * as HomepageService   from "@/services/cms/homepage.service";
import { getCoreServices }    from "@/services/cms/services.service";
import { getIndustryCards }   from "@/services/cms/industries.service";
import { getFeaturedPortfolio } from "@/services/cms/portfolio.service";
import { getFeaturedTestimonials } from "@/services/cms/testimonials.service";
import { getFeaturedResources } from "@/services/cms/resources.service";

// ─── Section Components ────────────────────────────────────────────────────
import { HeroSection }               from "@/features/homepage/components/HeroSection";
import { TrustLayerSection }         from "@/features/homepage/components/TrustLayerSection";
import { ServicesSection }           from "@/features/homepage/components/ServicesSection";
import { IndustriesSection }         from "@/features/homepage/components/IndustriesSection";
import { ProcessSection }            from "@/features/homepage/components/ProcessSection";
import { ProductsSection }           from "@/features/homepage/components/ProductsSection";
import { FeaturedProjectsSection }   from "@/features/homepage/components/FeaturedProjectsSection";
import { TestimonialsSection }       from "@/features/homepage/components/TestimonialsSection";
import { ResourcesSection }          from "@/features/homepage/components/ResourcesSection";
import { CtaSection }                from "@/features/homepage/components/CtaSection";

export default async function Home() {
  // All CMS fetches run in parallel for minimum TTFB
  const [
    heroData,
    servicesData,
    industriesData,
    processData,
    productsHubData,
    portfolioData,
    testimonialsData,
    resourcesData,
  ] = await Promise.all([
    HomepageService.getHeroData(),
    getCoreServices(),
    getIndustryCards(),
    HomepageService.getProcessSteps(),
    getProductsHubData(),   // explicitly static content
    getFeaturedPortfolio(),
    getFeaturedTestimonials(),
    getFeaturedResources(),
  ]);

  const statsData = homepageConfig.staticContent.stats;
  const ctaData = homepageConfig.staticContent.cta;

  return (
    <>
      <HeroSection data={heroData} />
      <TrustLayerSection stats={statsData as any} />
      <ServicesSection services={servicesData} />
      <IndustriesSection industries={industriesData} />
      <ProcessSection steps={processData} />
      <ProductsSection products={productsHubData.products} />
      <FeaturedProjectsSection projects={portfolioData} />
      <TestimonialsSection testimonials={testimonialsData} />
      <ResourcesSection resources={resourcesData} />
      <CtaSection data={ctaData} />
    </>
  );
}
