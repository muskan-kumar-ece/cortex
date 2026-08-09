"use client";

import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";
import { useMarketingAttribution } from "@/hooks/useMarketingAttribution";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: string[];
}

export function QuoteRequestModal({ isOpen, onClose, services }: QuoteRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attribution = useMarketingAttribution();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSelectedServices([]);
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleService = (s: string) => {
    if (selectedServices.includes(s)) {
      setSelectedServices(selectedServices.filter(x => x !== s));
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // We send FormData for multipart/form-data because of file attachments
    const payload = new FormData();
    payload.append("full_name", formData.get("name") as string);
    payload.append("email", formData.get("email") as string);
    payload.append("phone_number", formData.get("phone") as string);
    payload.append("company_name", (formData.get("company") as string) || "");
    payload.append("budget_range", (formData.get("budget") as string) || "");
    payload.append("timeline", (formData.get("timeline") as string) || "");
    payload.append("requirements", formData.get("requirements") as string);
    
    // Append array of services
    selectedServices.forEach(s => payload.append("services", s));

    const file = formData.get("attachment") as File;
    if (file && file.size > 0) {
      payload.append("attachment", file);
    }

    // Marketing Attribution
    Object.entries(attribution).forEach(([k, v]) => {
      payload.append(k, v);
    });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const res = await fetch(`${baseUrl}/public/quote/`, {
        method: "POST",
        body: payload,
        // Don't set Content-Type header with FormData, browser does it automatically with boundary
      });

      if (!res.ok) throw new Error("Failed to submit quote request");
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 md:p-8 border-b border-border flex justify-between items-center bg-background shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Request a Quote</h2>
            <p className="text-on-surface-muted text-sm mt-1">Provide project details for an accurate estimate.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-on-surface-muted hover:text-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Quote Request Received</h3>
              <p className="text-on-surface-muted text-sm max-w-sm">
                Our team is reviewing your requirements and will reach out with a comprehensive proposal shortly.
              </p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" id="quote-form">
              {error && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <p className="text-sm text-error/90 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Services Selection */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">1. What services do you need?</label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedServices.includes(s) 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background text-on-surface-muted border-border hover:border-primary/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">2. Contact Details</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Full Name *" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                  <input type="email" name="email" placeholder="Work Email *" required suppressHydrationWarning className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                  <input type="tel" name="phone" placeholder="Phone Number *" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                  <input type="text" name="company" placeholder="Company Name" className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">3. Project Scope</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select name="budget" className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all appearance-none">
                    <option value="">Select Budget Range</option>
                    <option value="<$10k">Less than $10k</option>
                    <option value="$10k-$50k">$10k - $50k</option>
                    <option value="$50k-$100k">$50k - $100k</option>
                    <option value=">$100k">More than $100k</option>
                  </select>
                  <select name="timeline" className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all appearance-none">
                    <option value="">Select Timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <textarea 
                  name="requirements" 
                  required 
                  className="w-full h-32 p-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all resize-none" 
                  placeholder="Describe your project goals, challenges, and specific requirements..."
                ></textarea>
              </div>

              {/* File Upload */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-on-surface-muted cursor-pointer hover:text-foreground transition-colors w-max">
                  <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                    <Paperclip className="w-4 h-4" />
                  </div>
                  <span>Attach RFP or Brief (Optional)</span>
                  <input type="file" name="attachment" className="hidden" accept=".pdf,.doc,.docx,.txt" />
                </label>
              </div>
            </form>
          )}
        </div>

        {!submitted && (
          <div className="p-6 md:p-8 border-t border-border bg-background shrink-0 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-full text-sm font-medium text-on-surface-muted hover:text-foreground transition-colors">
              Cancel
            </button>
            <button type="submit" form="quote-form" disabled={loading} className="px-8 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
