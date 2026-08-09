import { ProductDetailsData } from "./products.types";

export const PRODUCTS_DB: Record<string, ProductDetailsData> = {
  "cortex-ai-assistant": {
    id: "prod-ai-assistant",
    slug: "cortex-ai-assistant",
    title: "Cortex AI Assistant",
    subtitle: "Enterprise Intelligence",
    shortDescription: "A secure, context-aware AI assistant deeply integrated with your enterprise data.",
    summary: "Stop relying on public AI models that put your IP at risk. Cortex AI Assistant deploys securely within your VPC, ingests your proprietary knowledge base, and acts as an autonomous expert for your engineering and sales teams.",
    status: "Published",
    visibility: "Public",
    category: "AI Product",
    tags: ["LLM", "Generative AI", "Enterprise"],
    
    seo: {
      title: "Cortex AI Assistant | Secure Enterprise AI",
      description: "Deploy a private, context-aware AI assistant that knows your enterprise data inside out.",
      keywords: ["Enterprise AI", "Private LLM", "AI Assistant", "Context Aware AI"]
    },
    
    relations: {
      relatedContent: [
        { type: "Technology", slug: "openai", title: "OpenAI" },
        { type: "Solution", slug: "ai-solutions", title: "AI Solutions" },
        { type: "Product", slug: "knowledge-engine", title: "Knowledge Engine" }
      ]
    },

    hero: {
      headline: "Meet Your Enterprise AI Assistant",
      subheadline: "Connect your databases, documentation, and APIs to a private LLM. Let your teams chat with your entire enterprise ecosystem securely.",
      primaryCta: "Schedule Demo",
      secondaryCta: "Read Technical Docs"
    },

    overviewFeatures: [
      { title: "VPC Deployment", description: "Runs entirely within your cloud environment. Zero data leakage.", icon: "ShieldCheck" },
      { title: "Real-time RAG", description: "Retrieval-Augmented Generation connects directly to your live databases.", icon: "Database" },
      { title: "Role-Based Access", description: "The AI respects your existing IAM policies. It only answers what the user is authorized to know.", icon: "Lock" }
    ],

    dashboardScreenshots: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", alt: "Cortex AI Chat Interface", caption: "Conversational interface with embedded charts and tables." }
    ],

    architecture: {
      title: "Secure AI Architecture",
      description: "How Cortex AI Assistant processes queries without compromising security.",
      diagramFeatures: [
        "User Query with JWT",
        "Semantic Search (Vector DB)",
        "Context Assembly & RBAC Filter",
        "LLM Inference Engine",
        "Encrypted Response"
      ]
    },

    integrations: [
      { name: "Slack", description: "Native Slackbot integration for instant team access." },
      { name: "Confluence", description: "Automatically indexes your engineering wiki." },
      { name: "Salesforce", description: "Queries live CRM data during sales calls." }
    ],

    pricingTiers: [
      {
        name: "Professional",
        price: "$499",
        billingPeriod: "/month",
        description: "Perfect for mid-sized engineering teams.",
        features: ["Up to 50 Users", "100GB Vector Storage", "Standard Models (GPT-3.5 Class)", "Slack Integration"],
        ctaText: "Start Free Trial"
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For organizations requiring strict compliance and massive scale.",
        features: ["Unlimited Users", "Unlimited Vector Storage", "Advanced Models (GPT-4 Class)", "On-Prem / VPC Deployment", "Dedicated Solutions Engineer"],
        ctaText: "Contact Sales",
        isPopular: true
      }
    ],

    roadmap: [
      {
        version: "v2.0",
        date: "Q3 2026",
        title: "Autonomous Agents Update",
        description: "Introducing multi-agent workflows capable of executing actions across connected APIs.",
        features: ["API Action Execution", "Multi-step Reasoning", "Scheduled Tasks"],
        status: "Beta"
      },
      {
        version: "v1.5",
        date: "Q1 2026",
        title: "Advanced RBAC",
        description: "Deep integration with Azure AD and Okta.",
        features: ["Okta SCIM", "Field-level data redaction"],
        status: "Released"
      }
    ],

    useCases: [
      { title: "Customer Support Escalation", description: "Automatically resolve Tier 1 support tickets by allowing the AI to query internal troubleshooting guides." },
      { title: "Engineering Onboarding", description: "New hires can ask the AI about complex legacy codebases and immediately receive architectural context." }
    ],

    faqs: [
      { question: "Can we use our own fine-tuned models?", answer: "Yes, the Enterprise tier allows you to hot-swap the inference engine with any HuggingFace compatible model." }
    ]
  },
  
  "venopai": {
    id: "prod-venop",
    slug: "venopai",
    title: "VenopAI",
    subtitle: "Predictive Analytics Suite",
    shortDescription: "Turn raw operational data into predictive business intelligence.",
    summary: "VenopAI continuously monitors your data streams to forecast trends, detect anomalies, and recommend strategic interventions before issues arise.",
    status: "Published",
    visibility: "Public",
    category: "Data Product",
    seo: { title: "VenopAI", description: "Predictive analytics.", keywords: ["Data"] },
    hero: { headline: "Predict the Future of Your Business", subheadline: "Deploy VenopAI to turn historical data into actionable forecasts.", primaryCta: "Book Demo" },
    overviewFeatures: [{ title: "Anomaly Detection", description: "Catch issues before they impact customers." }]
  }
};

const additionalProducts = [
  "Sandhi", "Document AI", "Knowledge Engine", "Workflow Automation", "IoT Platform", "CRM Suite", "Analytics Platform"
];

additionalProducts.forEach((title, index) => {
  const slug = title.toLowerCase().replace(/ /g, "-");
  PRODUCTS_DB[slug] = {
    id: `prod-${index + 3}`,
    slug,
    title,
    subtitle: "Enterprise Suite",
    shortDescription: `Powerful enterprise ${title.toLowerCase()} software.`,
    summary: `Scale your operations with our flagship ${title.toLowerCase()} solution built specifically for enterprise performance requirements.`,
    status: "Published",
    visibility: "Public",
    category: "Enterprise Software",
    seo: { title: `${title} | Cortex IT Solution`, description: `Enterprise ${title.toLowerCase()}`, keywords: [title] },
    hero: {
      headline: title,
      subheadline: `Accelerate your enterprise velocity with our proven ${title.toLowerCase()} platform.`,
      primaryCta: "Request Access"
    },
    overviewFeatures: [
      { title: "High Availability", description: "99.99% Uptime SLA.", icon: "Activity" }
    ],
    pricingTiers: [
      { name: "Enterprise License", price: "Custom", description: "Tailored to your scale.", features: ["24/7 Support", "VPC Deployment", "Custom Integrations"], ctaText: "Contact Sales" }
    ],
    relations: {
      relatedContent: [
        { type: "Solution", slug: "enterprise-software", title: "Enterprise Software" }
      ]
    }
  };
});

export async function getProductsHubData() {
  const products = Object.values(PRODUCTS_DB).map(prod => ({
    slug: prod.slug,
    title: prod.title,
    shortDescription: prod.shortDescription,
    category: prod.category,
    status: prod.status
  }));

  return {
    hero: {
      headline: "The Cortex Product Ecosystem",
      description: "Enterprise-grade software solutions designed to accelerate velocity, ensure compliance, and scale operations."
    },
    products
  };
}

export async function getAllProductSlugs(): Promise<string[]> {
  return Object.keys(PRODUCTS_DB);
}

export async function getProductBySlug(slug: string) {
  const prod = PRODUCTS_DB[slug as keyof typeof PRODUCTS_DB];
  if (!prod) return null;
  return prod;
}
