export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqProvider {
  getHomepageFaqs(): Promise<FaqItem[]>;
}
