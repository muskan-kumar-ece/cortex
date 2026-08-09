import { FaqProvider, FaqItem } from "./types";

export class MockFaqProvider implements FaqProvider {
  async getHomepageFaqs(): Promise<FaqItem[]> {
    return [
      {
        id: "faq-1",
        question: "How does your engineering engagement model work?",
        answer: "We typically integrate directly with your teams through dedicated engineering pods or take full ownership of project-based deliverables. Every engagement starts with a technical discovery phase to align on architecture and constraints."
      },
      {
        id: "faq-2",
        question: "What technologies do you specialize in?",
        answer: "We specialize in modern, scalable stacks: Next.js, React, Node.js for web; AWS and Azure for cloud infrastructure; and custom LLM integrations for AI capabilities."
      },
      {
        id: "faq-3",
        question: "Do you provide ongoing support after deployment?",
        answer: "Yes. We offer continuous DevOps, SLA-backed support, and feature iterations. We believe in long-term partnerships, not just handing over code."
      }
    ];
  }
}

export const faqProvider = new MockFaqProvider();
