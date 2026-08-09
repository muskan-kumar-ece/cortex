export interface AboutHeroData {
  headline: string;
  subheadline: string;
  description: string;
}

export interface StorySectionData {
  title: string;
  description: string;
  points: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface AboutPageData {
  hero: AboutHeroData;
  mission: StorySectionData;
  philosophy: StorySectionData;
  teamWorkflow: StorySectionData;
  developmentProcess: StorySectionData;
  qualityStandards: StorySectionData;
  innovationApproach: StorySectionData;
  teamCulture: StorySectionData;
  futureVision: StorySectionData;
  cta: {
    headline: string;
    subheadline: string;
    button: {
      title: string;
      href: string;
    };
  };
}

export interface AboutProvider {
  getAboutPageData(): Promise<AboutPageData>;
}
