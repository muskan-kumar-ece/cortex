export const ABOUT_PAGE_DATA = {
  hero: {
    // Fallback if CMS company_name/tagline are missing
    headline: "Built by Engineers, for Engineers",
    subheadline: "The Cortex Philosophy",
    description: "We are an elite collective of software architects, systems engineers, and designers dedicated to building digital products that refuse to compromise on scale or quality."
  },
  
  // Section layout titles if CMS doesn't provide explicit titles, though we can hardcode them in page.tsx
  layout: {
    storyTitle: "Company Story",
    missionTitle: "Our Mission",
    visionTitle: "Future Vision",
    coreValuesTitle: "Core Values",
    coreValuesDescription: "The principles that guide our engineering and culture.",
  },

  cta: {
    headline: "Join us in building the future.",
    subheadline: "Whether you're looking to partner on a project or join our engineering team.",
    button: {
      title: "Get in Touch",
      href: "/contact"
    }
  }
};
