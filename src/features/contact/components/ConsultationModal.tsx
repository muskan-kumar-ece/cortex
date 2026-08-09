"use client";

import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Calendar, Clock, Video } from "lucide-react";
import { useMarketingAttribution } from "@/hooks/useMarketingAttribution";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attribution = useMarketingAttribution();

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
      preferred_date: formData.get("date"),
      preferred_time: formData.get("time"),
      meeting_mode: formData.get("mode"),
      notes: formData.get("notes"),
      ...attribution
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const res = await fetch(`${baseUrl}/public/consultation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to book consultation");
      
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
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
        >
          <X className="w-5 h-5 text-on-surface-muted hover:text-foreground" />
        </button>

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">Book a Consultation</h2>
          <p className="text-on-surface-muted text-sm mb-8">Schedule a session with our Senior Architects to discuss your requirements.</p>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Consultation Requested</h3>
              <p className="text-on-surface-muted text-sm max-w-sm">
                We've received your request. A team member will confirm your slot shortly.
              </p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <p className="text-sm text-error/90 leading-relaxed">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Full Name *</label>
                  <input type="text" name="name" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Work Email *</label>
                  <input type="email" name="email" required suppressHydrationWarning className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Company Name</label>
                  <input type="text" name="company" className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider flex items-center gap-2"><Calendar className="w-3 h-3"/> Date *</label>
                  <input type="date" name="date" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider flex items-center gap-2"><Clock className="w-3 h-3"/> Time *</label>
                  <input type="time" name="time" required className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider flex items-center gap-2"><Video className="w-3 h-3"/> Mode *</label>
                  <select name="mode" required defaultValue="" className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all appearance-none">
                    <option value="" disabled>Select Mode</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Phone">Phone</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">Additional Notes</label>
                <textarea name="notes" className="w-full h-24 p-4 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 outline-none text-sm transition-all resize-none" placeholder="What would you like to discuss?"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
