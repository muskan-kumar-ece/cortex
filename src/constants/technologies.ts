import { TechnologyDetailsData } from "./technology-types";

const baseFaqs = [
  { question: "How do you ensure security with this technology?", answer: "We implement industry-standard security practices, including data encryption at rest and in transit, strict RBAC, and continuous vulnerability scanning." },
  { question: "Can this scale to enterprise workloads?", answer: "Yes. Our architecture blueprints are designed for horizontal scalability, high availability, and multi-region deployments." }
];

export const TECHNOLOGIES_DB: Record<string, TechnologyDetailsData> = {
  "next-js": {
    id: "tech-nextjs",
    slug: "next-js",
    title: "Next.js",
    category: "Frontend",
    shortDescription: "The React framework for production-grade web applications.",
    iconPlaceholder: "LayoutGrid",
    hero: {
      headline: "Enterprise React with Next.js",
      subheadline: "Ship highly performant, SEO-optimized web applications with Server Components, Edge routing, and advanced static generation."
    },
    overview: "Next.js represents the bleeding edge of React development. At Cortex IT Solution, we leverage the App Router and Server Components to build blazing-fast enterprise platforms that combine the interactivity of client-side React with the unparalleled performance and SEO benefits of server-side rendering.",
    businessBenefits: [
      { title: "Unrivaled SEO", description: "Dynamic server-side rendering and static generation ensure crawlers index your content instantly.", icon: "Search" },
      { title: "Lightning Fast UX", description: "Streaming and partial prerendering eliminate loading states and reduce Time to First Byte (TTFB).", icon: "Zap" },
      { title: "Reduced Cloud Costs", description: "Static caching and edge deployment drastically lower infrastructure overhead.", icon: "TrendingDown" }
    ],
    technicalAdvantages: [
      { title: "React Server Components", description: "Execute heavy operations on the server and ship zero JavaScript to the client." },
      { title: "Turbopack", description: "Incredibly fast local development server for rapid engineering iteration." },
      { title: "Advanced Routing", description: "File-system based routing with parallel routes, intercepting routes, and layout persistence." }
    ],
    architecture: {
      title: "Next.js Enterprise Architecture",
      description: "How we structure scalable Next.js applications.",
      diagramFeatures: [
        "Edge CDN Layer",
        "React Server Components (RSC)",
        "Client Boundaries (use client)",
        "Server Actions for Mutations",
        "Data Fetching & Caching Layer"
      ]
    },
    integrations: [
      { name: "Vercel", description: "Native deployment platform for edge routing." },
      { name: "Tailwind CSS", description: "Utility-first styling perfectly integrated into the build pipeline." },
      { name: "Supabase", description: "Real-time Postgres backend and authentication." }
    ],
    performance: [
      { metric: "Lighthouse Score", value: "99+", context: "Typical performance score for our SSG implementations." },
      { metric: "TTFB", value: "<50ms", context: "Time to First Byte using Edge caching." }
    ],
    security: [
      { standard: "CSRF Protection", description: "Native protection on Server Actions." },
      { standard: "Content Security Policy", description: "Strict CSP nonces applied automatically to scripts." }
    ],
    deploymentWorkflow: [
      { step: 1, title: "Feature Branch", description: "Engineer commits to a feature branch triggering a preview deployment." },
      { step: 2, title: "E2E Testing", description: "Playwright tests execute against the isolated preview URL." },
      { step: 3, title: "Production Build", description: "Turbopack optimizes the payload and generates static HTML." },
      { step: 4, title: "Edge Deployment", description: "Global propagation to Edge nodes in under 2 minutes." }
    ],
    bestPractices: [
      { title: "Default to Server Components", description: "Keep components on the server unless interactivity is strictly required.", type: "do" },
      { title: "Colocate Data Fetching", description: "Fetch data in the exact component that needs it—Next.js dedupes requests.", type: "do" },
      { title: "Avoid Waterfall Requests", description: "Do not await multiple independent fetch calls sequentially.", type: "dont" }
    ],
    limitations: [
      { title: "Learning Curve", description: "The App Router introduces paradigm shifts (RSC, Server Actions) that require senior-level understanding." },
      { title: "Ecosystem Compatibility", description: "Some older React libraries do not yet support Server Components." }
    ],
    faqs: [
      { question: "Why Next.js instead of regular React?", answer: "Standard React (SPA) ships a massive JavaScript bundle to the client, hurting SEO and initial load times. Next.js solves this by rendering HTML on the server." },
      ...baseFaqs
    ],
    relatedTechnologies: ["react", "tailwind-css", "typescript"],
    recommendedServices: ["web-development", "frontend-development"],
    recommendedSolutions: ["enterprise-software", "saas-product-development"],
    recommendedResources: ["building-a-zero-downtime-deployment-pipeline"],
    realWorldProjects: ["global-fintech-platform"],
    seo: {
      title: "Next.js Enterprise Development | Cortex IT Solution",
      description: "Build incredibly fast, SEO-optimized enterprise platforms using Next.js, React Server Components, and Edge deployment.",
      keywords: ["Next.js", "React", "Server Components", "Frontend Development"]
    }
  }
};

// Map the rest of the ecosystem
const ecosystem = [
  // Frontend
  { title: "React", category: "Frontend" },
  { title: "TypeScript", category: "Frontend" },
  { title: "Tailwind CSS", category: "Frontend" },
  { title: "Framer Motion", category: "Frontend" },
  // Backend
  { title: "Python", category: "Backend" },
  { title: "Django", category: "Backend" },
  { title: "FastAPI", category: "Backend" },
  { title: "Node.js", category: "Backend" },
  { title: "Express", category: "Backend" },
  // AI
  { title: "OpenAI", category: "AI" },
  { title: "Gemini", category: "AI" },
  { title: "Claude", category: "AI" },
  { title: "LangChain", category: "AI" },
  { title: "LangGraph", category: "AI" },
  { title: "Vector Databases", category: "AI" },
  { title: "RAG", category: "AI" },
  { title: "MCP", category: "AI" },
  // Cloud
  { title: "AWS", category: "Cloud" },
  { title: "Azure", category: "Cloud" },
  { title: "Cloudflare", category: "Cloud" },
  { title: "Vercel", category: "Cloud" },
  { title: "Render", category: "Cloud" },
  // DevOps
  { title: "Docker", category: "DevOps" },
  { title: "Kubernetes", category: "DevOps" },
  { title: "GitHub Actions", category: "DevOps" },
  { title: "CI/CD", category: "DevOps" },
  // Database
  { title: "PostgreSQL", category: "Database" },
  { title: "Redis", category: "Database" },
  { title: "Supabase", category: "Database" },
  // Mobile
  { title: "Flutter", category: "Mobile" },
  { title: "React Native", category: "Mobile" },
  // Security
  { title: "JWT", category: "Security" },
  { title: "OAuth", category: "Security" },
  { title: "RBAC", category: "Security" },
  { title: "HTTPS", category: "Security" }
];

ecosystem.forEach((tech, index) => {
  const slug = tech.title.toLowerCase().replace(/[\.\/]/g, '').replace(/ /g, "-");
  if (slug === "next-js") return; // Already defined above

  TECHNOLOGIES_DB[slug] = {
    id: `tech-${index + 1}`,
    slug,
    title: tech.title,
    category: tech.category as any,
    shortDescription: `Enterprise-grade consulting and implementation for ${tech.title}.`,
    iconPlaceholder: "Cpu",
    hero: {
      headline: `${tech.title} Engineering`,
      subheadline: `Scale your infrastructure and build highly secure systems with expert ${tech.title} consulting.`
    },
    overview: `Cortex IT Solution relies on ${tech.title} to power critical systems. From robust architecture to aggressive performance optimizations, our senior engineers deploy ${tech.title} following industry best practices to ensure your platform remains resilient and scalable.`,
    businessBenefits: [
      { title: "Cost Efficiency", description: "Optimize resource allocation.", icon: "TrendingDown" },
      { title: "Reliability", description: "Built for enterprise uptime SLAs.", icon: "ShieldCheck" }
    ],
    technicalAdvantages: [
      { title: "High Throughput", description: "Handle millions of concurrent operations." }
    ],
    bestPractices: [
      { title: "Continuous Monitoring", description: "Always track metrics.", type: "do" }
    ],
    limitations: [
      { title: "Complexity", description: "Requires expert engineering to implement securely." }
    ],
    faqs: baseFaqs,
    relatedTechnologies: ["aws", "docker"],
    recommendedServices: ["web-development", "cloud-computing"],
    recommendedSolutions: ["enterprise-software"],
    recommendedResources: ["the-reality-of-migrating-from-monolith-to-microservices"],
    realWorldProjects: ["enterprise-case-study-3"],
    seo: {
      title: `${tech.title} Consulting & Development | Cortex IT Solution`,
      description: `Expert ${tech.title} engineering services for global enterprises.`,
      keywords: [tech.title, tech.category, "Consulting"]
    }
  };
});
