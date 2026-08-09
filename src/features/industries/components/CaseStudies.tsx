"use client";

import { motion } from "framer-motion";

import { staggerContainer, slide } from "@/motion/variants";
import { ArrowUpRight, BarChart, Clock, ShieldCheck } from "lucide-react";

export function CaseStudies({ data }: { data: any }) {
  // Map index to a specific abstract diagram or icon
  const getVisualType = (index: number) => {
    const map = ["chart", "clock", "shield"];
    return map[index % map.length];
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/[0.04]">
      {/* Dramatic lighting from left/right */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-violet-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-[0.18em] mb-3">Proven Results</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">{data.title}</h2>
          <p className="text-lg text-muted-foreground">{data.description}</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {data.studies && data.studies.map((study: any, index: number) => {
            const visualType = getVisualType(index);
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={study.id} 
                variants={slide}
                className="group relative"
              >
                {/* Back glow layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className={`relative bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 items-center backdrop-blur-xl ${!isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Glass Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Left (or Right): Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full">
                        {study.industry}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                      {study.client}
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Challenge</h4>
                        <p className="text-base text-foreground/80 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">Solution</h4>
                        <p className="text-base text-foreground/90 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="group/btn inline-flex items-center text-sm font-semibold text-foreground hover:text-violet-400 transition-colors cursor-pointer">
                        Read Case Study 
                        <div className="ml-2 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-violet-500/20 transition-colors">
                          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right (or Left): Outcome Mockup */}
                  <div className="w-full md:w-1/2 relative h-full min-h-[320px]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                      {/* Top Bar */}
                      <div className="flex justify-between items-center opacity-50">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                        <div className="text-[10px] font-mono uppercase">Results Matrix</div>
                      </div>

                      {/* Center Visual Component */}
                      <div className="flex-1 flex items-center justify-center py-8">
                        {visualType === "chart" && (
                          <div className="w-32 h-32 relative">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                              <circle cx="64" cy="64" r="50" fill="none" stroke="#34d399" strokeWidth="12" strokeDasharray="314" strokeDashoffset="60" className="group-hover:stroke-[16px] transition-all duration-500" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-emerald-400">
                              <BarChart className="w-8 h-8" />
                            </div>
                          </div>
                        )}
                        {visualType === "clock" && (
                          <div className="w-32 h-32 relative flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border-2 border-cyan-500/40 rounded-full" />
                            <Clock className="w-10 h-10 text-cyan-400" />
                          </div>
                        )}
                        {visualType === "shield" && (
                          <div className="w-32 h-32 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-pulse-glow" />
                            <ShieldCheck className="w-16 h-16 text-violet-400" />
                          </div>
                        )}
                      </div>

                      {/* Outcome Value */}
                      <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/[0.05] flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Key Outcome</p>
                          <p className="text-sm font-semibold text-white">{study.outcome}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

