"use client";

import { motion } from "framer-motion";

interface KnowledgeOverviewProps {
  overview: string;
}

export function KnowledgeOverview({ overview }: KnowledgeOverviewProps) {
  return (
    <section className=" relative bg-background">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed border-l-4 border-primary pl-6">
            {overview}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
