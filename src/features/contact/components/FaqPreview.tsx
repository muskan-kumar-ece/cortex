"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqPreviewData } from "@/config/contact.types";
import { Plus, Minus, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqPreview({ data }: { data: FaqPreviewData }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <TerminalSquare className="w-5 h-5 text-primary" />
            <p className="text-xs font-mono text-primary uppercase tracking-widest">Knowledge Base</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{data.title}</h2>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <div
              key={faq.id}
              className={cn(
                "rounded-2xl border transition-all duration-500 overflow-hidden group",
                open === faq.id 
                  ? "border-primary/30 bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.1)]" 
                  : "border-border bg-surface hover:border-primary/20 hover:bg-surface/80"
              )}
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-6 outline-none"
                aria-expanded={open === faq.id}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "font-mono text-xs hidden sm:block transition-colors",
                    open === faq.id ? "text-primary" : "text-on-surface-muted group-hover:text-foreground"
                  )}>
                    Q_
                  </span>
                  <span className={cn(
                    "text-lg font-semibold transition-colors leading-snug",
                    open === faq.id ? "text-primary-foreground" : "text-foreground group-hover:text-primary-hover"
                  )}>
                    {faq.question}
                  </span>
                </div>
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500",
                  open === faq.id ? "border-primary/50 bg-primary/20 text-primary" : "border-border-strong bg-surface text-on-surface-muted group-hover:text-foreground"
                )}>
                  {open === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-8 pt-2 flex gap-4">
                      <span className="font-mono text-xs text-on-surface-muted hidden sm:block mt-1">A_</span>
                      <p className="text-on-surface-muted leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
