// The Contact Request payload — shaped for future backend API integration
export interface ContactRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  industry: string;
  service: string;
  budget?: string;
  timeline: string;
  message: string;
  source: string;
}

export interface ContactHeroData {
  headline: string;
  subheadline: string;
  description: string;
}

export interface ConsultationPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface ConsultationPathsData {
  title: string;
  description: string;
  paths: ConsultationPath[];
}

export interface ContactFormData {
  industries: string[];
  services: string[];
  budgetRanges: string[];
  timelines: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EngagementProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface AvailabilityData {
  responseTime: string;
  businessHours: string;
  timezone: string;
  supportEmail: string;
  location: string;
  calendlyNote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqPreviewData {
  title: string;
  faqs: FaqItem[];
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TrustSignalsData {
  title: string;
  signals: TrustSignal[];
}

export interface ContactCtaData {
  headline: string;
  subheadline: string;
  button: {
    title: string;
    href: string;
  };
}

export interface ContactPageData {
  hero: ContactHeroData;
  consultationPaths: ConsultationPathsData;
  form: ContactFormData;
  process: EngagementProcessData;
  availability: AvailabilityData;
  faq: FaqPreviewData;
  trust: TrustSignalsData;
  cta: ContactCtaData; // Added Final CTA
}

export interface ContactProvider {
  getContactPageData(): Promise<ContactPageData>;
}
