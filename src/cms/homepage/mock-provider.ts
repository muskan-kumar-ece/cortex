import { HomepageProvider, HeroData, StatItem, WhyB10Item, ProcessStep, EngineeringExcellenceData, CtaData } from "./types";
import { routeRegistry } from "../core/routes";

export class MockHomepageProvider implements HomepageProvider {
  async getHeroData(): Promise<HeroData> {
    return {
      headline: "Architecting Mission-Critical Enterprise Platforms.",
      subheadline: "Cortex engineers AI platforms, enterprise software, and cloud infrastructure that reduce operational cost, automate business workflows, and support long-term scalability.",
      primaryCta: { title: "Book Consultation", href: "#consultation" },
      secondaryCta: { title: "Explore Solutions", href: routeRegistry.getTopLevelRoute("/solutions") },
      trustIndicator: "Processing 10M+ daily transactions for 50+ enterprise teams worldwide."
    };
  }

  async getStats(): Promise<StatItem[]> {
    return [
      { value: "99.99%", label: "Availability" },
      { value: "40+", label: "Technologies" },
      { value: "24×7", label: "Support" },
      { value: "SOC2", label: "Ready" },
    ];
  }

  async getWhyB10(): Promise<WhyB10Item[]> {
    return [
      {
        title: "Domain-Driven Design",
        description: "We don't just write code; we map software to your business reality. Our architectures isolate complexity, ensuring that rapid feature development never compromises system stability.",
        icon: "Cpu"
      },
      {
        title: "Observable & Resilient",
        description: "Every platform we build includes robust telemetry, structured logging, and automated recovery protocols. We build systems that degrade gracefully under load.",
        icon: "Eye"
      },
      {
        title: "Cloud-Native Scalability",
        description: "From multi-region active-active deployments to serverless microservices, we leverage AWS and Azure primitives to guarantee zero-downtime scalability.",
        icon: "Layers"
      }
    ];
  }

  async getProcessSteps(): Promise<ProcessStep[]> {
    return [
      { step: "01", title: "System Discovery", description: "Analyzing technical constraints, compliance requirements, and data flow topologies." },
      { step: "02", title: "Architecture Blueprint", description: "Designing fault-tolerant infrastructure, database schemas, and API contracts." },
      { step: "03", title: "Agile Execution", description: "Iterative engineering sprints with mandatory code reviews and static analysis." },
      { step: "04", title: "Automated QA", description: "End-to-end integration testing, load simulation, and security audits." },
      { step: "05", title: "Zero-Downtime Deployment", description: "Blue-green deployments managed via declarative CI/CD pipelines." },
      { step: "06", title: "SRE & Monitoring", description: "Proactive incident management and continuous performance optimization." },
    ];
  }

  async getEngineeringExcellence(): Promise<EngineeringExcellenceData> {
    return {
      title: "Engineered for Enterprise Scale",
      description: "Our technical foundations are designed to support massive concurrency, strict data residency, and 99.99% uptime.",
      pillars: [
        { title: "Edge & Server-Side Rendering", description: "Sub-50ms TTFB globally via optimized Next.js App Router and Edge Middleware.", icon: "Server" },
        { title: "Distributed Infrastructure", description: "Multi-AZ architectures utilizing Terraform and Kubernetes for guaranteed high availability.", icon: "Cloud" },
        { title: "Zero-Trust Security", description: "End-to-end encryption, strict RBAC, and SOC2 compliant development lifecycles.", icon: "Shield" },
        { title: "Deterministic AI", description: "Embedding structured, predictable LLM pipelines directly into enterprise operational workflows.", icon: "Brain" },
      ]
    };
  }

  async getCtaData(): Promise<CtaData> {
    return {
      headline: "Ready to build your next platform?",
      subheadline: "Engage our principal engineers to architect a scalable roadmap for your next platform.",
      button: { title: "Book Strategy Call", href: "#consultation" }
    };
  }
}

export const homepageProvider = new MockHomepageProvider();
