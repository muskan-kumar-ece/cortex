"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface KnowledgeFaqProps {
  faqs: FAQ[];
}

export function KnowledgeFaq({ faqs }: KnowledgeFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background border-t border-border py-16">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" />
                Knowledge Base
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Common Questions
              </h2>
              <p className="text-on-surface-muted leading-relaxed">
                Clear answers to common questions about our technical approach, methodology, and engagement models.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="divide-y divide-border-strong">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between text-left focus:outline-none group"
                    >
                      <h3 className={cn(
                        "text-lg md:text-xl font-medium transition-colors pr-8",
                        isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"
                      )}>
                        {faq.question}
                      </h3>
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border transition-colors shrink-0",
                        isOpen ? "border-primary bg-primary/10 text-primary" : "border-border text-on-surface-muted group-hover:border-primary/50"
                      )}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className=" text-on-surface-muted leading-relaxed max-w-3xl pr-12">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
