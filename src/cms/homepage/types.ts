export interface HeroData {
  headline: string;
  subheadline: string;
  primaryCta: { title: string; href: string };
  secondaryCta: { title: string; href: string };
  trustIndicator: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface WhyB10Item {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface EngineeringExcellenceData {
  title: string;
  description: string;
  pillars: { title: string; description: string; icon: string }[];
}

export interface CtaData {
  headline: string;
  subheadline: string;
  button: { title: string; href: string };
}

export interface HomepageProvider {
  getHeroData(): Promise<HeroData>;
  getStats(): Promise<StatItem[]>;
  getWhyB10(): Promise<WhyB10Item[]>;
  getProcessSteps(): Promise<ProcessStep[]>;
  getEngineeringExcellence(): Promise<EngineeringExcellenceData>;
  getCtaData(): Promise<CtaData>;
}
