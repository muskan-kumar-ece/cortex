import { ContactPageData } from "./contact.types";

export const CONTACT_PAGE_DATA: ContactPageData = {
  hero: {
    headline: "Let's Build Something Remarkable Together",
    subheadline: "Start Your Engineering Journey",
    description: "Whether you're modernizing legacy infrastructure, launching an AI-powered platform, or architecting your next enterprise system — we're ready to engineer the solution."
  },

  consultationPaths: {
    title: "How Can We Help?",
    description: "Choose the engagement that best describes what you're looking to achieve.",
    paths: [
      {
        id: "ai",
        title: "AI Consulting",
        description: "Integrate machine learning, NLP, or predictive analytics into your existing product or build AI-native systems from scratch.",
        icon: "Brain"
      },
      {
        id: "enterprise",
        title: "Enterprise Software",
        description: "Full-cycle development of scalable enterprise platforms — from architecture to deployment to ongoing support.",
        icon: "Building"
      },
      {
        id: "cloud",
        title: "Cloud Migration",
        description: "Migrate legacy systems to AWS, GCP, or Azure with zero-downtime strategies and modern cloud-native architectures.",
        icon: "Cloud"
      },
      {
        id: "product",
        title: "Product Development",
        description: "End-to-end product engineering from ideation and design to a launched, production-ready application.",
        icon: "Layout"
      },
      {
        id: "architecture",
        title: "Architecture Review",
        description: "A thorough technical audit of your current systems with an actionable improvement roadmap.",
        icon: "Shield"
      },
      {
        id: "devops",
        title: "DevOps & Automation",
        description: "CI/CD pipelines, infrastructure-as-code, and deployment automation to accelerate your engineering velocity.",
        icon: "Server"
      }
    ]
  },

  form: {
    industries: [
      "Healthcare", "Finance & FinTech", "Retail & E-Commerce",
      "Manufacturing", "Education", "Government", "Real Estate",
      "Logistics", "SaaS / Technology", "Other"
    ],
    services: [
      "AI & Machine Learning", "Enterprise Software", "Cloud Migration",
      "Web Application", "Mobile Application", "DevOps & Automation",
      "Architecture Review", "Product Strategy", "Other"
    ],
    budgetRanges: [
      "Under $25k", "$25k – $75k", "$75k – $150k",
      "$150k – $500k", "$500k+", "Prefer not to say"
    ],
    timelines: [
      "ASAP (< 1 month)", "1–3 months", "3–6 months",
      "6–12 months", "Ongoing / Retainer"
    ]
  },

  process: {
    title: "What Happens Next",
    description: "We've designed a simple, transparent engagement process to reduce uncertainty and get you moving fast.",
    steps: [
      {
        id: "p1",
        title: "Submit Your Request",
        description: "Fill out the form below with your project details. No commitment required.",
        icon: "Send"
      },
      {
        id: "p2",
        title: "Discovery Call",
        description: "A 30-minute call with our engineering leads to understand your technical requirements and business goals.",
        icon: "Phone"
      },
      {
        id: "p3",
        title: "Architecture Review",
        description: "Our architects evaluate your stack and requirements to design the optimal technical approach.",
        icon: "Cpu"
      },
      {
        id: "p4",
        title: "Proposal & SOW",
        description: "A detailed proposal with timeline, team composition, technology decisions, and phased milestones.",
        icon: "FileText"
      },
      {
        id: "p5",
        title: "Project Kickoff",
        description: "Onboarding, environment setup, and sprint planning. Your engineering journey begins.",
        icon: "Rocket"
      }
    ]
  },

  availability: {
    responseTime: "Within 4 business hours",
    businessHours: "Monday – Friday, 9:00 AM – 6:00 PM",
    timezone: "PKT (UTC+5) · Globally available",
    supportEmail: "hello@cortexitsolution.com",
    location: "Islamabad, Pakistan · Remote-first globally",
    calendlyNote: "Prefer to schedule directly? Book a 30-min technical call at your convenience."
  },

  faq: {
    title: "Common Questions",
    faqs: [
      {
        id: "f1",
        question: "How long does a typical project take?",
        answer: "Project timelines range from 4 weeks for focused MVP builds to 6–12 months for enterprise platforms. After the discovery call, we'll provide a detailed milestone timeline."
      },
      {
        id: "f2",
        question: "What industries do you work with?",
        answer: "We've built mission-critical systems for Healthcare, FinTech, Manufacturing, Retail, Education, and Government clients. Our architecture principles are industry-agnostic."
      },
      {
        id: "f3",
        question: "Do you sign NDAs?",
        answer: "Yes. All client engagements begin with a mutual NDA. Your ideas, data, and architectural details are completely confidential."
      },
      {
        id: "f4",
        question: "Do you work with international clients?",
        answer: "Absolutely. We operate as a remote-first engineering team and work with clients across North America, Europe, the Middle East, and South Asia."
      },
      {
        id: "f5",
        question: "Can you modernize our existing system?",
        answer: "Yes. Legacy modernization is a core competency. We conduct a thorough architecture audit, design a migration roadmap, and execute without disrupting your existing operations."
      }
    ]
  },

  trust: {
    title: "Why Engineering Leaders Trust Cortex",
    signals: [
      {
        id: "t1",
        title: "Enterprise-Ready Architecture",
        description: "Every system we build is designed for 99.99% uptime, horizontal scalability, and seamless future growth.",
        icon: "Building"
      },
      {
        id: "t2",
        title: "Secure by Default",
        description: "Security is embedded in our CI/CD pipelines, code reviews, and infrastructure — not bolted on afterward.",
        icon: "Shield"
      },
      {
        id: "t3",
        title: "AI & Cloud Native",
        description: "We build with modern, cloud-native stacks and AI integration capabilities from day one.",
        icon: "Brain"
      },
      {
        id: "t4",
        title: "Transparent Process",
        description: "Real-time project visibility, weekly engineering reports, and open communication throughout every sprint.",
        icon: "Eye"
      },
      { id: "uptime", title: "99.99% Uptime SLA", description: "Guaranteed platform availability.", icon: "Activity" }
    ]
  },
  cta: {
    headline: "Ready to scale your engineering?",
    subheadline: "Let's architect the future of your product together.",
    button: {
      title: "Book a Strategy Call",
      href: "#consultation"
    }
  }
};
