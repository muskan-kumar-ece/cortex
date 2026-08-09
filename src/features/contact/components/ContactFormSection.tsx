"use client";

import { useState } from "react";
import { ContactFormData } from "@/config/contact.types";
import { GlassCard } from "@/components/marketing/GlassCard";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useMarketingAttribution } from "@/hooks/useMarketingAttribution";

export function ContactFormSection({ data }: { data: ContactFormData }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attribution = useMarketingAttribution();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
      company_name: formData.get("company"),
      service_required: formData.get("service_required"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
      ...attribution
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const res = await fetch(`${baseUrl}/public/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request.");
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // Fallback for dev if backend is disconnected
      if (process.env.NODE_ENV === "development") {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again later or contact us directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-8 md:p-12 border-border-strong bg-surface shadow-2xl relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Project Details</h2>
        
        {submitted ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Inquiry Received</h3>
            <p className="text-on-surface-muted max-w-md text-sm leading-relaxed font-light">
              Thank you for reaching out. A Senior Solutions Architect will review your requirements and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <p className="text-sm text-error/90 leading-relaxed">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  suppressHydrationWarning
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Company Name</label>
                <input 
                  type="text" 
                  name="company"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Service Required</label>
                <select name="service_required" defaultValue="" className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select a Service</option>
                  {data.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Estimated Timeline</label>
                <select name="timeline" defaultValue="" className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select Timeline</option>
                  {data.timelines.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Project Scope / Message</label>
              <textarea 
                name="message"
                required
                className="w-full h-32 p-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all resize-none"
                placeholder="Tell us about your architectural challenges and business goals..."
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-on-surface-muted">
                By submitting, you agree to our confidential NDA & Privacy Policy.
              </p>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </GlassCard>
  );
}

