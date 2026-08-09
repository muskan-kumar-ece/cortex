"use client";

import { useEffect, useState } from "react";
import { ConsultationModal } from "@/features/contact/components/ConsultationModal";
import { QuoteRequestModal } from "@/features/contact/components/QuoteRequestModal";

export function LeadModals() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    const handleConsultation = () => setConsultationOpen(true);
    const handleQuote = () => setQuoteOpen(true);

    window.addEventListener("open-consultation", handleConsultation);
    window.addEventListener("open-quote", handleQuote);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href === "#consultation" || href === "/#consultation") {
          e.preventDefault();
          handleConsultation();
        } else if (href === "#quote" || href === "/#quote") {
          e.preventDefault();
          handleQuote();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    setServices([
      "AI Solutions",
      "Cloud Infrastructure",
      "Custom Software Development",
      "Web Application",
      "Mobile Application",
      "UI/UX Design",
      "DevOps & Security"
    ]);

    return () => {
      window.removeEventListener("open-consultation", handleConsultation);
      window.removeEventListener("open-quote", handleQuote);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <>
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <QuoteRequestModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} services={services} />
    </>
  );
}
