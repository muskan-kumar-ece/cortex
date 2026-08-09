import { ResourceDetailsData, ContentBlock, KnowledgeContext } from "./types";

const generateContentBlocks = (topic: string): ContentBlock[] => {
  return [
    {
      id: "b1",
      type: "heading",
      level: "h2",
      text: `Understanding ${topic}`
    },
    {
      id: "b2",
      type: "paragraph",
      text: `In today's fast-paced engineering ecosystem, ${topic.toLowerCase()} is more than just a buzzword. It is a critical component of modern software architecture. Our engineering teams have spent the last two years integrating these paradigms at an enterprise scale, and the outcomes have been transformative.`
    },
    {
      id: "b3",
      type: "architecture",
      visualType: "CloudArchitectureVisual",
      caption: "High-level overview of the distributed architecture topology."
    },
    {
      id: "b4",
      type: "heading",
      level: "h3",
      text: "Implementation Details"
    },
    {
      id: "b5",
      type: "paragraph",
      text: "When implementing this system, we encountered several bottlenecks. We solved them by adopting an event-driven model."
    },
    {
      id: "b6",
      type: "code",
      language: "typescript",
      filename: "event-bus.ts",
      code: `import { EventBus } from '@core/events';\n\nconst bus = new EventBus({\n  retry: true,\n  maxRetries: 3\n});\n\nbus.subscribe('UserCreated', async (event) => {\n  await analytics.track(event);\n});`,
      highlightLines: [2, 3, 4]
    },
    {
      id: "b7",
      type: "alert",
      variant: "warning",
      title: "Performance Consideration",
      text: "Always ensure your event bus is configured with a dead-letter queue (DLQ) in production environments to prevent message loss during sustained outages."
    },
    {
      id: "b8",
      type: "heading",
      level: "h3",
      text: "Business Outcomes"
    },
    {
      id: "b9",
      type: "metrics",
      title: "Performance Gains Post-Migration",
      stats: [
        { label: "Latency Reduction", value: "40%", trend: "down" },
        { label: "Throughput", value: "50k/s", trend: "up" },
        { label: "Infrastructure Cost", value: "-22%", trend: "down" }
      ]
    },
    {
      id: "b10",
      type: "checklist",
      items: [
        { text: "Evaluate current monolithic bottlenecks", checked: true },
        { text: "Define bounded contexts and domain models", checked: true },
        { text: "Implement strangler fig pattern for migration", checked: false },
        { text: "Rollout blue/green deployments", checked: false }
      ]
    }
  ];
};

const generateAIContext = (topic: string): KnowledgeContext => ({
  title: topic,
  summary: `Comprehensive guide on ${topic.toLowerCase()} and its impact on enterprise architecture.`,
  keywords: [topic, "Engineering", "Architecture", "Best Practices"],
  technologies: ["Next.js", "TypeScript", "AWS", "Kafka", "Docker"],
  services: ["cloud", "backend-development"],
  industries: ["fintech", "healthcare", "ecommerce"],
  painPoints: ["High latency", "Monolithic coupling", "Scaling limits"],
  solutions: ["Event-driven architecture", "Microservices", "Edge computing"],
  faq: [
    { question: `What is the primary benefit of ${topic}?`, answer: `It provides massive scalability and reduces tight coupling between domains.` },
    { question: `How long does migration typically take?`, answer: `Enterprise migrations generally span 6 to 12 months depending on legacy technical debt.` }
  ],
  relatedKnowledge: []
});


// Core Templates
const coreTemplates: Partial<ResourceDetailsData>[] = [
  {
    title: "Architecting Distributed LLM Inference Systems",
    category: "AI",
    contentType: "Architecture",
    difficulty: "Advanced",
    readingTime: "12 min read",
    heroImagePlaceholder: "Abstract Neural Network Grid",
    downloads: [
      {
        title: "LLM Infrastructure Blueprint",
        description: "High-level topology diagrams for deploying open-source models.",
        fileType: "Architecture",
        size: "4.2 MB",
        version: "1.0",
        url: "#"
      }
    ]
  },
  {
    title: "The Reality of Migrating from Monolith to Microservices",
    category: "Engineering",
    contentType: "Whitepaper",
    difficulty: "Intermediate",
    readingTime: "18 min read",
    heroImagePlaceholder: "System Diagram Visualization",
    downloads: [
      {
        title: "Migration Playbook",
        description: "Step-by-step checklist for the Strangler Fig pattern.",
        fileType: "PDF",
        size: "2.1 MB",
        version: "2.3",
        url: "#"
      }
    ]
  },
  {
    title: "Building a Zero-Downtime Deployment Pipeline",
    category: "DevOps",
    contentType: "Guide",
    difficulty: "Intermediate",
    readingTime: "8 min read",
    heroImagePlaceholder: "Pipeline Flow Graphic",
  },
  {
    title: "Design Systems at Scale: Beyond the UI Kit",
    category: "UI/UX",
    contentType: "Case Study",
    difficulty: "Beginner",
    readingTime: "5 min read",
    heroImagePlaceholder: "Component Hierarchy Chart",
  },
  {
    title: "Securing Multi-Tenant Cloud Environments",
    category: "Cloud",
    contentType: "Best Practices",
    difficulty: "Advanced",
    readingTime: "10 min read",
    heroImagePlaceholder: "Security Shield Architecture",
  }
];

// Generate 65 resources dynamically to test SSG
export const RESOURCES_DB: Record<string, ResourceDetailsData> = {};

for (let i = 0; i < 65; i++) {
  const template = coreTemplates[i % coreTemplates.length];
  const iterationSuffix = i > 4 ? ` (Vol. ${Math.floor(i / 5) + 1})` : "";
  const title = `${template.title}${iterationSuffix}`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  RESOURCES_DB[slug] = {
    id: `res-${i}`,
    slug: slug,
    title: title,
    excerpt: `Deep technical dive into ${title.toLowerCase()} and how enterprise teams can leverage these patterns today.`,
    category: template.category!,
    contentType: template.contentType!,
    author: { name: "Sarah Chen", role: "Principal AI Architect", avatarPlaceholder: "SC" },
    publishedDate: "2024-05-12",
    updatedDate: "2024-05-15",
    featured: i < 3,
    readingTime: template.readingTime!,
    difficulty: template.difficulty!,
    heroImagePlaceholder: template.heroImagePlaceholder!,
    
    contentBlocks: generateContentBlocks(template.title!),
    downloads: template.downloads || [],
    
    aiContext: generateAIContext(template.title!),
    
    seo: {
      title: `${title} | Cortex Knowledge Center`,
      description: `Comprehensive technical guide on ${title.toLowerCase()}.`,
      keywords: ["Engineering", "Architecture", template.category!]
    },
    
    relatedResources: [], // We'll populate this dynamically in the provider
    relatedServices: ["cloud"],
    relatedIndustries: ["fintech"],
    relatedPortfolio: ["enterprise-ai-transformation"]
  };
}
