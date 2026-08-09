export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsProvider {
  getFeaturedTestimonials(): Promise<TestimonialItem[]>;
}
