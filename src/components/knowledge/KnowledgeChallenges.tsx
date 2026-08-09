"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { GlassCard } from "@/components/marketing/GlassCard";

interface Challenge {
  title: string;
  description: string;
}

interface KnowledgeChallengesProps {
  challenges: Challenge[];
}

export function KnowledgeChallenges({ challenges }: KnowledgeChallengesProps) {
  return (
    <section className=" bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] pointer-events-none rounded-full -translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full">
        <div className="">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-500 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Problem Space
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Business Challenges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="h-full p-8 border-border-strong bg-surface/50 hover:border-rose-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-mono font-bold group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground">{challenge.title}</h3>
                <p className="text-on-surface-muted leading-relaxed">{challenge.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
