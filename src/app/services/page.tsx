/**
 * app/services/page.tsx — Services Listing (Server Component)
 *
 * Core services list is fetched from the live CMS backend.
 * Page-level static sections (hero, whyUs, architecture, metrics, cta)
 * are inlined.
 */

import { getCoreServices }   from "@/services/cms/services.service"; // live services list
import { SERVICES_HUB_DATA as PAGE_DATA } from "@/config/services-hub";
import { ServicesHero }        from "@/features/services/components/ServicesHero";
import { ServicesWhyUs }       from "@/features/services/components/ServicesWhyUs";
import { ServicesJourney }     from "@/features/services/components/ServicesJourney";
import { ServicesArchitecture } from "@/features/services/components/ServicesArchitecture";
import { ServicesProcess }      from "@/features/services/components/ServicesProcess";
import { TechStackMarquee }     from "@/features/services/components/TechStackMarquee";
import { ServicesMetrics }      from "@/features/services/components/ServicesMetrics";
import { ServicesCta }          from "@/features/services/components/ServicesCta";

export const metadata = {
  title: "Engineering Services | Cortex IT Solution",
  description:
    "Explore Cortex IT Solution's engineering services — AI consulting, enterprise software, cloud-native architecture, and product development for modern businesses.",
};



export default async function ServicesPage() {
  const coreServices = await getCoreServices(); // ← live CMS data

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <ServicesHero data={PAGE_DATA.hero} />
      <ServicesWhyUs data={PAGE_DATA.whyChooseUs} />
      <ServicesJourney services={coreServices} />
      <ServicesArchitecture data={PAGE_DATA.architecture} />
      <ServicesProcess data={PAGE_DATA.process} />
      <TechStackMarquee data={PAGE_DATA.techStack} />
      <ServicesMetrics data={PAGE_DATA.metrics} />
      <ServicesCta data={PAGE_DATA.cta} />
    </main>
  );
}
