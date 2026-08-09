"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { slideUp, staggerContainer } from "@/motion/variants";

interface TechCategory {
  category: string;
  technologies: string[];
}

interface KnowledgeTechStackProps {
  techStack: TechCategory[];
}

export function KnowledgeTechStack({ techStack }: KnowledgeTechStackProps) {
  return (
    <section className=" bg-background relative border-t border-border/50">
      <div className="w-full">
        <div className="">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-muted flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            Ecosystem & Tooling
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Related Technologies
          </h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {techStack.map((stack, idx) => (
            <motion.div key={idx} variants={slideUp} className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary border-b border-border/50">
                {stack.category}
              </h3>
              <ul className="space-y-3">
                {stack.technologies.map((tech, techIdx) => (
                  <li key={techIdx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span className="text-foreground font-medium">{tech}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
