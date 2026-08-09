import { TestimonialsProvider, TestimonialItem } from "./types";

export class MockTestimonialsProvider implements TestimonialsProvider {
  async getFeaturedTestimonials(): Promise<TestimonialItem[]> {
    return [
      {
        id: "t1",
        quote: "Cortex isn't just an agency; they operate as a core part of our engineering team. Their architectural decisions saved us months of technical debt.",
        author: "Sarah Chen",
        role: "CTO",
        company: "FinTrust"
      },
      {
        id: "t2",
        quote: "They delivered our ML diagnostic pipeline ahead of schedule with remarkable precision. The code quality is exceptional.",
        author: "Dr. Marcus Thorne",
        role: "VP of Engineering",
        company: "HealthCorp"
      }
    ];
  }
}

export const testimonialsProvider = new MockTestimonialsProvider();
