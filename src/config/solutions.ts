import { SolutionDetailsData } from "./solutions.types";

const baseFaqs = [
  { question: "How long does a typical engagement last?", answer: "Our initial discovery and architecture phase typically takes 2-4 weeks, followed by development sprints which can range from 3-6 months depending on scope." },
  { question: "Do you provide post-deployment support?", answer: "Yes, we offer comprehensive SLAs for enterprise support, monitoring, and continuous optimization." },
  { question: "Can this integrate with our existing legacy systems?", answer: "Absolutely. We specialize in the Strangler Fig pattern to modernize and integrate without disrupting your current operations." }
];

const baseProcess = [
  { step: 1, title: "Discovery & Audit", description: "Deep dive into your business problems, existing infrastructure, and strategic goals." },
  { step: 2, title: "Architecture Blueprint", description: "Design a scalable, secure, and future-proof technical topology." },
  { step: 3, title: "Agile Execution", description: "Iterative development with CI/CD, constant feedback loops, and transparent milestones." },
  { step: 4, title: "Testing & Validation", description: "Rigorous QA, load testing, security audits, and user acceptance testing." },
  { step: 5, title: "Deployment & Scale", description: "Zero-downtime deployment strategies with robust rollback capabilities." },
  { step: 6, title: "Support & Evolution", description: "Proactive monitoring, incident response, and continuous feature enhancements." }
];

export const SOLUTIONS_DB: Record<string, SolutionDetailsData> = {
  "ai-solutions": {
    id: "sol-ai",
    slug: "ai-solutions",
    title: "AI Solutions",
    shortDescription: "Transform operations with generative AI, predictive analytics, and autonomous agents.",
    iconPlaceholder: "BrainCircuit",
    hero: {
      headline: "Enterprise AI Transformation",
      subheadline: "Move beyond the hype. Deploy secure, production-grade artificial intelligence that solves tangible business problems and drives measurable ROI."
    },
    overview: "Our AI Solutions practice helps enterprises navigate the complex landscape of artificial intelligence. From fine-tuning massive language models on proprietary data to deploying predictive maintenance algorithms on the edge, we build AI architectures that are secure, compliant, and deeply integrated into your existing workflows.",
    businessProblems: [
      {
        problem: "Unstructured Data Silos",
        impact: "80% of enterprise data remains untapped, leading to missed insights and slow decision-making.",
        solution: "We implement RAG (Retrieval-Augmented Generation) architectures to unlock semantic search and intelligent querying across your entire knowledge base."
      },
      {
        problem: "Manual Operations Overhead",
        impact: "High OPEX driven by repetitive, low-value administrative tasks.",
        solution: "Deployment of autonomous AI agents and intelligent workflows that reduce manual processing time by up to 60%."
      },
      {
        problem: "Reactive Decision Making",
        impact: "Losing market share due to delayed responses to market shifts or supply chain disruptions.",
        solution: "Predictive machine learning models that forecast demand, detect anomalies, and recommend proactive actions in real-time."
      }
    ],
    capabilities: [
      { title: "Custom LLMs", description: "Fine-tuning and deploying open-source models (Llama, Mistral) on private VPCs to ensure zero data leakage." },
      { title: "RAG Systems", description: "Enterprise-grade Retrieval-Augmented Generation connecting LLMs to your secure document stores." },
      { title: "Vision AI", description: "Computer vision pipelines for quality control, facial recognition, and automated visual inspections." },
      { title: "Autonomous Agents", description: "Multi-agent systems capable of reasoning, planning, and executing complex workflows without human intervention." },
      { title: "Predictive Analytics", description: "Time-series forecasting and anomaly detection for supply chain and financial modeling." },
      { title: "Document AI", description: "Automated extraction, classification, and processing of complex PDFs and handwritten forms." }
    ],
    process: baseProcess,
    techStack: [
      { category: "Frameworks", technologies: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex"] },
      { category: "Infrastructure", technologies: ["AWS SageMaker", "NVIDIA Triton", "Azure OpenAI", "Pinecone"] },
      { category: "Ops", technologies: ["MLflow", "Weights & Biases", "Docker", "Kubernetes"] }
    ],
    benefits: [
      { title: "Cost Reduction", description: "Automate repetitive tasks and reduce operational overhead by up to 40%." },
      { title: "Data Security", description: "Private deployments ensure your IP never trains public models." },
      { title: "Scalability", description: "Inference architectures designed to scale from 10 to 10,000 requests per second." }
    ],
    faqs: [
      { question: "Is our data safe when using LLMs?", answer: "Yes. We deploy models entirely within your private cloud environment. Your data is never sent to third-party APIs unless explicitly required, ensuring complete compliance with SOC2 and GDPR." },
      ...baseFaqs
    ],
    relatedIndustries: ["healthcare", "finance", "manufacturing"],
    relatedCaseStudies: ["enterprise-ai-transformation"],
    seo: {
      title: "Enterprise AI Solutions | Cortex IT Solution",
      description: "Production-grade artificial intelligence solutions including custom LLMs, RAG, and predictive analytics for the enterprise.",
      keywords: ["AI", "Generative AI", "LLM", "Machine Learning", "RAG"]
    }
  },
  
  "business-automation": {
    id: "sol-auto",
    slug: "business-automation",
    title: "Business Automation",
    shortDescription: "Streamline workflows and eliminate manual processes with intelligent automation.",
    iconPlaceholder: "Workflow",
    hero: { headline: "Intelligent Business Automation", subheadline: "Connect your fragmented systems. Digitize manual processes. Accelerate your enterprise execution speed." },
    overview: "Stop wasting engineering hours on manual data entry and disconnected systems. We design intelligent automation pipelines that bridge legacy software, modern SaaS APIs, and human-in-the-loop approvals into seamless digital workflows.",
    businessProblems: [
      { problem: "Fragmented Tooling", impact: "Data trapped in silos requiring manual export/import routines.", solution: "API-first integration layers and enterprise service buses." },
      { problem: "High Error Rates", impact: "Manual data entry leading to compliance risks and financial loss.", solution: "Automated ETL pipelines with strict validation schemas." }
    ],
    capabilities: [
      { title: "RPA Integration", description: "Robotic Process Automation for legacy systems lacking APIs." },
      { title: "Workflow Engines", description: "BPMN-compliant workflow orchestration for complex business rules." },
      { title: "API Gateways", description: "Unified API management to securely expose and connect internal services." }
    ],
    process: baseProcess,
    techStack: [
      { category: "Integration", technologies: ["MuleSoft", "Apache Kafka", "RabbitMQ", "GraphQL"] },
      { category: "Execution", technologies: ["Temporal", "Camunda", "AWS Step Functions"] }
    ],
    benefits: [
      { title: "Efficiency", description: "Reduce manual processing time by hundreds of hours per month." },
      { title: "Accuracy", description: "Eliminate human error in critical data transfer processes." }
    ],
    faqs: baseFaqs,
    relatedIndustries: ["retail", "logistics"],
    relatedCaseStudies: ["global-fintech-platform"],
    seo: { title: "Business Automation Solutions", description: "Enterprise workflow and API automation.", keywords: ["Automation", "RPA", "Integration"] }
  }
};

// Generate the remaining 8 dynamically as placeholders for SSG validation
const additionalSolutions = [
  "Enterprise Software", "Cloud Solutions", "IoT Solutions", "Data Engineering",
  "Digital Transformation", "Cyber Security", "Mobile Applications", "SaaS Product Development"
];

additionalSolutions.forEach((title, index) => {
  const slug = title.toLowerCase().replace(/ /g, "-");
  SOLUTIONS_DB[slug] = {
    id: `sol-${index + 3}`,
    slug,
    title,
    shortDescription: `Premium ${title.toLowerCase()} consulting and implementation services.`,
    iconPlaceholder: "LayoutGrid",
    hero: {
      headline: title,
      subheadline: `Next-generation ${title.toLowerCase()} tailored for enterprise scale, security, and performance.`
    },
    overview: `We deliver world-class ${title.toLowerCase()} leveraging the latest architectural paradigms. Our engineering teams integrate deeply with your business to solve your most complex operational hurdles.`,
    businessProblems: [
      { problem: "Legacy Constraints", impact: "Slow time to market and high maintenance costs.", solution: `Modernizing architecture via ${title.toLowerCase()}.` }
    ],
    capabilities: [
      { title: "Strategic Consulting", description: "Roadmapping and architecture design." },
      { title: "Engineering Execution", description: "Full-stack implementation." }
    ],
    process: baseProcess,
    techStack: [
      { category: "Core", technologies: ["React", "Node.js", "Python", "Go"] },
      { category: "Cloud", technologies: ["AWS", "Azure", "GCP", "Kubernetes"] }
    ],
    benefits: [
      { title: "Agility", description: "Ship features 3x faster." },
      { title: "Scale", description: "Handle millions of concurrent requests." }
    ],
    faqs: baseFaqs,
    relatedIndustries: ["finance", "healthcare"],
    relatedCaseStudies: ["enterprise-ai-transformation"],
    seo: {
      title: `${title} | Cortex IT Solution`,
      description: `Expert ${title.toLowerCase()} services for global enterprises.`,
      keywords: [title, "Enterprise", "Consulting"]
    }
  };
});

export async function getSolutionsHubData() {
  const solutions = Object.values(SOLUTIONS_DB).map(s => ({
    slug: s.slug,
    title: s.title,
    shortDescription: s.shortDescription,
    iconPlaceholder: s.iconPlaceholder
  }));

  return {
    hero: {
      headline: "Enterprise Technology Solutions",
      description: "We bridge the gap between complex business problems and cutting-edge technical execution. Discover how our specialized engineering practices can accelerate your digital roadmap."
    },
    solutions
  };
}

export async function getAllSolutionSlugs(): Promise<string[]> {
  return Object.keys(SOLUTIONS_DB);
}

export async function getSolutionBySlug(slug: string) {
  const solution = SOLUTIONS_DB[slug as keyof typeof SOLUTIONS_DB];
  if (!solution) return null;
  return solution;
}
