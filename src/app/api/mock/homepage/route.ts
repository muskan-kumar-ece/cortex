import { NextResponse } from "next/server";
import { homepageProvider } from "@/cms/homepage/mock-provider";

export async function GET() {
  const [
    hero,
    stats,
    whyB10,
    processSteps,
    engineeringExcellence,
    cta
  ] = await Promise.all([
    homepageProvider.getHeroData(),
    homepageProvider.getStats(),
    homepageProvider.getWhyB10(),
    homepageProvider.getProcessSteps(),
    homepageProvider.getEngineeringExcellence(),
    homepageProvider.getCtaData()
  ]);

  return NextResponse.json({
    hero,
    stats,
    whyB10,
    processSteps,
    engineeringExcellence,
    cta
  });
}
