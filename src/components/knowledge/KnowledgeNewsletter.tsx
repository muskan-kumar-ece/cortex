"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { NeonButton } from "@/components/marketing/NeonButton";

export function KnowledgeNewsletter({ 
  headline = "Stay ahead of the curve", 
  description = "Get our latest technical articles and architecture teardowns delivered to your inbox monthly.",
  placeholder = "engineering@company.com",
  buttonLabel = "Subscribe"
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="my-12 p-8 md:p-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface/30 to-info/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-foreground">{headline}</h4>
        </div>
        
        <p className="text-on-surface leading-relaxed max-w-xl mb-8">
          {description}
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20 text-success">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">You&apos;re subscribed! Check your inbox to confirm.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              suppressHydrationWarning
              disabled={status === "loading"}
              className="flex-1 h-12 px-5 rounded-xl border border-border bg-surface text-foreground placeholder:text-on-surface-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 transition-all"
            />
            <NeonButton type="submit" disabled={status === "loading"} className="h-12 px-8 min-w-[140px]">
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-background/20 border-t-background rounded-full animate-spin" />
              ) : (
                <>
                  {buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </NeonButton>
          </form>
        )}
      </div>
    </div>
  );
}
