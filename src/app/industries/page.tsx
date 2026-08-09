/**
 * app/industries/page.tsx — Industries Listing (Server Component)
 *
 * Page-level static sections are inlined.
 * Industry cards are fetched live from CMS.
 */

import { getIndustryCards }   from "@/services/cms/industries.service"; // live industry list
import { IndustriesHero }      from "@/features/industries/components/IndustriesHero";
import { DomainExpertise }     from "@/features/industries/components/DomainExpertise";
import { IntelligenceHub }     from "@/features/industries/components/IntelligenceHub";
import { CaseStudies }         from "@/features/industries/components/CaseStudies";
import { IndustriesCta }       from "@/features/industries/components/IndustriesCta";

export const metadata = {
  title: "Enterprise Industries | Cortex IT Solution",
  description:
    "Targeted architectures and scalable software solutions for complex domains like Healthcare, Finance, and Retail.",
};

import { INDUSTRIES_HUB_DATA as PAGE_DATA } from "@/config/industries-hub";


export default async function IndustriesPage() {
  const industries = await getIndustryCards();

  // Merge live industry cards into page data's intelligenceHub
  // Ensure we provide the arrays IntelligenceHub expects (challenges, solutions, etc.)
  const enrichedPageData = {
    ...PAGE_DATA,
    intelligenceHub: {
      ...PAGE_DATA.intelligenceHub,
      industries: industries.map((ind: any) => ({
        ...ind,
        overview: ind.description,
        challenges: [],
        solutions: [],
        workflowSteps: [],
        technologies: [],
        businessOutcome: "Transformed operations",
      })),
    },
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <IndustriesHero data={enrichedPageData.hero} />
      <DomainExpertise data={enrichedPageData.expertise} />
      <IntelligenceHub data={enrichedPageData.intelligenceHub} />
      <CaseStudies data={enrichedPageData.caseStudies} />
      <IndustriesCta data={enrichedPageData.cta} />
    </main>
  );
}
