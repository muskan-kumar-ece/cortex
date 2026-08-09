import { getCompanyProfile } from "@/services/cms/company.service"; // live company data for hero/cta
import { AboutHero } from "@/features/about/components/AboutHero";
import { StorySection } from "@/features/about/components/StorySection";
import { AboutCta } from "@/features/about/components/AboutCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Cortex IT Solution | The Engineering Partner",
  description:
    "Beyond code. Beyond consulting. Discover the engineering philosophy, principles, and culture that make Cortex IT Solution the trusted technology partner.",
};

import { ABOUT_PAGE_DATA as PAGE_DATA } from "@/config/about";


export default async function AboutPage() {
  const company = await getCompanyProfile();

  // Override hero with live CMS company name / tagline
  const enrichedHero = {
    ...PAGE_DATA.hero,
    headline: company.company_name
      ? `Built by ${company.company_name}`
      : PAGE_DATA.hero.headline,
    description: company.tagline || PAGE_DATA.hero.description,
  };

  // Build CMS-driven StorySections
  const storySections = [];

  if (company.company_story) {
    storySections.push({
      title: PAGE_DATA.layout.storyTitle,
      description: company.company_story,
      points: []
    });
  }

  if (company.mission) {
    storySections.push({
      title: PAGE_DATA.layout.missionTitle,
      description: company.mission,
      points: []
    });
  }

  if (company.vision) {
    storySections.push({
      title: PAGE_DATA.layout.visionTitle,
      description: company.vision,
      points: []
    });
  }

  if (company.core_values && company.core_values.length > 0) {
    storySections.push({
      title: PAGE_DATA.layout.coreValuesTitle,
      description: PAGE_DATA.layout.coreValuesDescription,
      points: company.core_values.map(v => ({
        title: v.title,
        description: v.description,
        icon: v.icon || "CheckCircle"
      }))
    });
  }

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <AboutHero data={enrichedHero} />

      {/* CMS-driven Engineering Story Flow */}
      {storySections.map((section, idx) => (
        <StorySection key={idx} data={section} index={idx} />
      ))}
      
      <AboutCta data={PAGE_DATA.cta} />
    </main>
  );
}
