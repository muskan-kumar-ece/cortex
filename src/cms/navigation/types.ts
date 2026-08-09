export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  featured?: boolean;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export interface NavigationGroup {
  title: string;
  description?: string;
  featured?: boolean;
  sections?: NavigationSection[];
  links?: NavigationLink[]; // Direct links if no sections
  cta?: NavigationLink;
}

export interface FooterGroup {
  title: string;
  links: NavigationLink[];
}

export interface CompanyProfile {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socials: Record<string, string>;
}

export interface NavigationProvider {
  getMainNavigation(): Promise<NavigationGroup[]>;
  getFooterNavigation(): Promise<FooterGroup[]>;
  getCompanyProfile(): Promise<CompanyProfile>;
}
