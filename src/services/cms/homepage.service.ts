/**
 * homepage.service.ts
 *
 * Maps the backend Homepage model → frontend HomepageProvider shape.
 * Falls back to hardcoded defaults when the CMS singleton has 0 records,
 * so the site never breaks even if the CMS hasn't been populated yet.
 */

import { cmsList } from "@/api/cms";
import type { HeroData, StatItem, WhyB10Item, ProcessStep, EngineeringExcellenceData, CtaData } from "@/cms/homepage/types";

// ─── Backend shape ────────────────────────────────────────────────────────────

interface BackendHomepage {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: string;
  process_title: string;
  process_content: ProcessStep[] | null; // JSON field — array of { step, title, description }
  why_b10_title: string;
  why_b10_content: WhyB10Item[] | null;  // JSON field — array of { title, description, icon }
  status: string;
}

// ─── Fallback data (shown when CMS has 0 records) ────────────────────────────

const FALLBACK_HERO: HeroData = {
  headline: "Architecting Mission-Critical Enterprise Platforms.",
  subheadline:
    "Cortex engineers AI platforms, enterprise software, and cloud infrastructure that reduce operational cost, automate business workflows, and support long-term scalability.",
  primaryCta: { title: "Book Consultation", href: "/contact" },
  secondaryCta: { title: "Explore Solutions", href: "/solutions" },
  trustIndicator: "Processing 10M+ daily transactions for 50+ enterprise teams worldwide.",
};

const FALLBACK_WHY_B10: WhyB10Item[] = [
  { title: "Domain-Driven Design", description: "We don't just write code; we map software to your business reality.", icon: "Cpu" },
  { title: "Observable & Resilient", description: "Every platform we build includes robust telemetry and automated recovery protocols.", icon: "Eye" },
  { title: "Cloud-Native Scalability", description: "Multi-region active-active deployments and serverless microservices on AWS and Azure.", icon: "Layers" },
];

const FALLBACK_PROCESS: ProcessStep[] = [
  { step: "01", title: "System Discovery", description: "Analyzing technical constraints, compliance requirements, and data flow topologies." },
  { step: "02", title: "Architecture Blueprint", description: "Designing fault-tolerant infrastructure, database schemas, and API contracts." },
  { step: "03", title: "Agile Execution", description: "Iterative engineering sprints with mandatory code reviews and static analysis." },
  { step: "04", title: "Automated QA", description: "End-to-end integration testing, load simulation, and security audits." },
  { step: "05", title: "Zero-Downtime Deployment", description: "Blue-green deployments managed via declarative CI/CD pipelines." },
  { step: "06", title: "SRE & Monitoring", description: "Proactive incident management and continuous performance optimization." },
];

// ─── Cached singleton ─────────────────────────────────────────────────────────

async function getHomepageSingleton(): Promise<BackendHomepage | null> {
  const list = await cmsList<BackendHomepage>("/public/content/homepage/");
  return list[0] ?? null;
}

// ─── Public service functions ─────────────────────────────────────────────────

export async function getHeroData(): Promise<HeroData> {
  const hp = await getHomepageSingleton();
  if (!hp || !hp.hero_title) return FALLBACK_HERO;
  return {
    headline: hp.hero_title,
    subheadline: hp.hero_subtitle || FALLBACK_HERO.subheadline,
    primaryCta: hp.hero_cta_text
      ? { title: hp.hero_cta_text, href: hp.hero_cta_link || "/contact" }
      : FALLBACK_HERO.primaryCta,
    secondaryCta: FALLBACK_HERO.secondaryCta,
    trustIndicator: FALLBACK_HERO.trustIndicator,
  };
}

export async function getWhyB10(): Promise<WhyB10Item[]> {
  const hp = await getHomepageSingleton();
  if (hp?.why_b10_content && Array.isArray(hp.why_b10_content) && hp.why_b10_content.length > 0) {
    return hp.why_b10_content;
  }
  return FALLBACK_WHY_B10;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const hp = await getHomepageSingleton();
  if (hp?.process_content && Array.isArray(hp.process_content) && hp.process_content.length > 0) {
    return hp.process_content;
  }
  return FALLBACK_PROCESS;
}
