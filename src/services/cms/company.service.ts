/**
 * company.service.ts
 *
 * Maps the backend CompanyProfile model → shapes expected by:
 * - Header (company name, logo)
 * - Footer (contact info, social links)
 * - About page (mission, vision, values)
 * - Contact page (email, phone, address)
 */

import { cmsList } from "@/api/cms";
import type { CompanyProfile } from "@/cms/navigation/types";

// ─── Backend shape ─────────────────────────────────────────────────────────

export interface BackendCompanyProfile {
  id: string;
  company_name: string;
  legal_name: string;
  tagline: string;
  short_description: string;
  full_description: string;
  mission: string;
  vision: string;
  core_values: { title: string; description: string; icon?: string }[];
  company_story: string;
  logo_url: string | null;
  email: string;
  support_email: string;
  phone: string;
  whatsapp: string;
  address: string;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  status: string;
}

// ─── Fallback ──────────────────────────────────────────────────────────────

const FALLBACK_PROFILE: BackendCompanyProfile = {
  id: "",
  company_name: "Cortex IT Solution",
  legal_name: "Cortex IT Solution Pvt Ltd",
  tagline: "Building Products That Businesses Depend On",
  short_description: "We are a premium engineering firm.",
  full_description: "",
  mission: "To elevate global software standards.",
  vision: "Become the go-to partner for scalable SaaS architectures.",
  core_values: [],
  company_story: "",
  logo_url: null,
  email: "",
  support_email: "",
  phone: "",
  whatsapp: "",
  address: "",
  linkedin: null,
  github: null,
  twitter: null,
  instagram: null,
  facebook: null,
  youtube: null,
  status: "Published",
};

// ─── Public functions ──────────────────────────────────────────────────────

/** Returns the raw backend company profile — use this when you need all fields. */
export async function getCompanyProfile(): Promise<BackendCompanyProfile> {
  const list = await cmsList<BackendCompanyProfile>("/public/content/company-profile/");
  return list[0] ?? FALLBACK_PROFILE;
}

/** Adapts backend profile → CompanyProfile shape used by Header / Footer. */
export async function getNavigationCompanyProfile(): Promise<CompanyProfile> {
  const cp = await getCompanyProfile();
  return {
    name: cp.company_name || FALLBACK_PROFILE.company_name,
    description: cp.tagline || cp.short_description || FALLBACK_PROFILE.tagline,
    email: cp.email || cp.support_email || "",
    phone: cp.phone || "",
    address: cp.address || "",
    socials: {
      twitter: cp.twitter || "",
      linkedin: cp.linkedin || "",
      github: cp.github || "",
    },
  };
}
