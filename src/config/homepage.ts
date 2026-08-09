export const homepageConfig = {
  sections: {
    hero: true,
    trustLayer: true,
    services: true,
    industries: true,
    whyB10: false,
    process: false,
    featuredWork: true,
    engineeringExcellence: false,
    testimonials: false,
    faq: false,
    cta: true,
  },
  staticContent: {
    stats: [
      { value: "99.99%", label: "Availability" },
      { value: "40+", label: "Technologies" },
      { value: "24×7", label: "Support" },
      { value: "SOC2", label: "Ready" },
    ],
    cta: {
      headline: "Ready to build your next platform?",
      subheadline: "Engage our principal engineers to architect a scalable roadmap for your next platform.",
      button: { title: "Book Strategy Call", href: "/contact" },
    },
    engineering: {
      title: "Engineered for Enterprise Scale",
      description: "Our technical foundations are designed to support massive concurrency, strict data residency, and 99.99% uptime.",
      pillars: [
        { title: "Edge & Server-Side Rendering", description: "Sub-50ms TTFB globally via optimized Next.js App Router and Edge Middleware.", icon: "Server" },
        { title: "Distributed Infrastructure", description: "Multi-AZ architectures utilizing Terraform and Kubernetes for guaranteed high availability.", icon: "Cloud" },
        { title: "Zero-Trust Security", description: "End-to-end encryption, strict RBAC, and SOC2 compliant development lifecycles.", icon: "Shield" },
        { title: "Deterministic AI", description: "Embedding structured, predictable LLM pipelines directly into enterprise operational workflows.", icon: "Brain" },
      ],
    }
  }
} as const;
