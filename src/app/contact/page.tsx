import { CONTACT_PAGE_DATA as pageData } from "@/config/contact";
import { getCompanyProfile } from "@/services/cms/company.service";
import { getAllFaqs } from "@/services/cms/faqs.service";
import { ContactHero } from "@/features/contact/components/ContactHero";
import { ContactFormSection } from "@/features/contact/components/ContactFormSection";
import { ConsultationProcess } from "@/features/contact/components/ConsultationProcess";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { FaqPreview } from "@/features/contact/components/FaqPreview";
import { ContactCta } from "@/features/contact/components/ContactCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Cortex IT Solution | Start Your Engineering Journey",
  description: "Ready to build something remarkable? Contact Cortex IT Solution to discuss AI consulting, enterprise software, cloud migration, or architecture reviews.",
};

export default async function ContactPage() {
  const [company, allFaqs] = await Promise.all([
    getCompanyProfile(),
    getAllFaqs()
  ]);

  const enrichedAvailability = {
    ...pageData.availability,
    supportEmail: company.support_email || company.email || pageData.availability.supportEmail,
    location: company.address || pageData.availability.location,
  };

  const enrichedFaq = {
    ...pageData.faq,
    faqs: allFaqs.length > 0 ? allFaqs : pageData.faq.faqs
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <ContactHero data={pageData.hero} />
      
      {/* Conversion Core: Form + Info split */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ContactFormSection data={pageData.form} />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo 
                availability={enrichedAvailability} 
                trust={pageData.trust} 
              />

            </div>
          </div>
        </div>
      </section>

      <ConsultationProcess data={pageData.process} />
      <FaqPreview data={enrichedFaq} />
      <ContactCta data={pageData.cta} />
    </main>
  );
}
