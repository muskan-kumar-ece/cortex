"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaqItem } from "@/cms/faq/types";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
      <div className="container relative mx-auto px-6 max-w-3xl">
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Answers
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            Frequently Asked <span className="text-on-surface-muted">Questions.</span>
          </h3>
        </div>

        <div className="flex flex-col border-t border-border-strong">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="border-b border-border-strong"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                >
                  <span className={cn(
                    "text-lg md:text-xl font-medium tracking-tight pr-8 transition-colors duration-300",
                    isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500",
                      isOpen ? "border-primary bg-primary/10 rotate-45" : "border-border-strong group-hover:border-primary group-hover:bg-primary/5"
                    )}
                  >
                    <Plus className={cn("w-4 h-4 transition-colors", isOpen ? "text-primary" : "text-on-surface-muted group-hover:text-primary")} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-lg text-on-surface-muted leading-relaxed max-w-2xl pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
