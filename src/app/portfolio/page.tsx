/**
 * app/portfolio/page.tsx — Portfolio Listing (Server Component)
 *
 * Portfolio items fetched live from CMS backend.
 * Page-level static sections (hero, outcomes, technology, cta) are inlined.
 */

import { getPortfolioCards }  from "@/services/cms/portfolio.service"; // live portfolio
import { PortfolioHero }        from "@/features/portfolio/components/PortfolioHero";
import { ProjectShowcase }      from "@/features/portfolio/components/ProjectShowcase";
import { EngineeringOutcomes }  from "@/features/portfolio/components/EngineeringOutcomes";
import { TechnologyExpertise }  from "@/features/portfolio/components/TechnologyExpertise";
import { PortfolioCta }         from "@/features/portfolio/components/PortfolioCta";

export const metadata = {
  title: "Engineering Portfolio | Cortex IT Solution",
  description: "Explore our featured engineering projects and digital transformation outcomes.",
};

import { PORTFOLIO_HUB_DATA as PAGE_DATA } from "@/config/portfolio-hub";

export default async function PortfolioPage() {
  const projects = await getPortfolioCards();

  const enrichedPageData = {
    ...PAGE_DATA,
    showcase: {
      ...PAGE_DATA.showcase,
      projects,
    },
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <PortfolioHero data={enrichedPageData.hero} />
      <ProjectShowcase data={enrichedPageData.showcase} />
      <EngineeringOutcomes data={enrichedPageData.outcomes} />
      <TechnologyExpertise data={enrichedPageData.technology} />
      <PortfolioCta data={enrichedPageData.cta} />
    </main>
  );
}
