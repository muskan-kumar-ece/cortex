"use client";

import { NewsletterData } from "@/cms/resources/types";
import { GlassCard } from "@/components/marketing/GlassCard";
import { NeonButton } from "@/components/marketing/NeonButton";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMarketingAttribution } from "@/hooks/useMarketingAttribution";

export function NewsletterSignup({ data }: { data: NewsletterData }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attribution = useMarketingAttribution();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const res = await fetch(`${baseUrl}/public/newsletter/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email,
            ...attribution
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-24 relative z-10 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard className="p-8 md:p-16 border-border-strong bg-surface relative overflow-hidden text-center">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center text-primary mx-auto mb-8 shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                {data.headline}
              </h2>
              <p className="text-lg text-on-surface-muted mb-10 leading-relaxed">
                {data.description}
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center p-8 border border-primary/20 bg-primary/5 rounded-2xl max-w-md mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">You're Subscribed!</h3>
                  <p className="text-on-surface-muted text-center">Thank you for joining our newsletter. You'll receive our next update soon.</p>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 items-center justify-center max-w-md mx-auto w-full"
                >
                  {error && (
                    <div className="w-full p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 text-left">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="w-full relative">
                      <input
                        type="email"
                        name="email"
                        required
                        suppressHydrationWarning
                        placeholder={data.placeholder}
                        className="w-full h-14 pl-5 pr-12 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-foreground transition-all placeholder:text-on-surface-faint"
                        disabled={loading}
                      />
                      {!loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <NeonButton className="h-14 w-full sm:w-auto px-8 shrink-0" disabled={loading}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : data.buttonLabel}
                    </NeonButton>
                  </div>
                </form>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
