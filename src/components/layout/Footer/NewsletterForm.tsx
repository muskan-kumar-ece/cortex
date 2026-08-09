"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useMarketingAttribution } from "@/hooks/useMarketingAttribution";

export function NewsletterForm() {
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

  if (submitted) {
    return (
      <div className="mt-2 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-primary/90 leading-relaxed">
          Thanks for subscribing! You'll hear from us soon.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
          <p className="text-xs text-error/90">{error}</p>
        </div>
      )}
      <input 
        type="email" 
        name="email"
        placeholder="Enter your email" 
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        required
        suppressHydrationWarning
      />
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 rounded-lg text-sm transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
      </button>
    </form>
  );
}
