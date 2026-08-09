"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/motion/variants";
import { Building2, Clock, Users, Globe2, Briefcase, TrendingUp } from "lucide-react";

export interface DashboardKpi {
  label: string;
  value: string;
  trend?: string;
}

export interface KnowledgeExecutiveDashboardProps {
  dashboard: {
    client: string;
    industry: string;
    duration: string;
    teamSize: string;
    region: string;
    primaryKpi: DashboardKpi;
    secondaryKpi: DashboardKpi;
    tertiaryKpi: DashboardKpi;
  }
}

export function KnowledgeExecutiveDashboard({ dashboard }: KnowledgeExecutiveDashboardProps) {
  if (!dashboard) return null;

  const kpis = [dashboard.primaryKpi, dashboard.secondaryKpi, dashboard.tertiaryKpi].filter(Boolean);

  const metaItems = [
    { icon: Building2, label: "Client", value: dashboard.client },
    { icon: Briefcase, label: "Industry", value: dashboard.industry },
    { icon: Globe2, label: "Region", value: dashboard.region },
    { icon: Clock, label: "Duration", value: dashboard.duration },
    { icon: Users, label: "Team Size", value: dashboard.teamSize },
  ];

  return (
    <section className=" md:">
      <div className="w-full">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Metadata Sidebar */}
          <motion.div variants={slideUp} className="lg:col-span-4 space-y-6">
            <h3 className="text-xl font-bold border-b border-border-strong">
              Project Profile
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              {metaItems.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-on-surface-muted">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-foreground font-semibold text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* KPI Dashboard */}
          <motion.div variants={slideUp} className="lg:col-span-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kpis.map((kpi, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-8 rounded-3xl border flex flex-col justify-between overflow-hidden ${
                    idx === 0 
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_40px_-15px_rgba(var(--color-primary),0.3)] md:col-span-3 lg:col-span-1 min-h-[240px]" 
                      : "bg-surface/30 border-border-strong text-foreground min-h-[200px]"
                  }`}
                >
                  {/* Decorative background element for primary KPI */}
                  {idx === 0 && (
                    <div className="absolute -right-8 -top-8 text-primary-foreground/10">
                      <TrendingUp className="w-48 h-48" strokeWidth={1} />
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <h4 className={`text-sm font-bold uppercase tracking-wider ${idx === 0 ? "text-primary-foreground/80" : "text-on-surface-muted"}`}>
                      {kpi.label}
                    </h4>
                    
                    <div className="">
                      <span className="text-5xl md:text-6xl font-bold tracking-tight">
                        {kpi.value}
                      </span>
                    </div>
                    
                    {kpi.trend && (
                      <div className="flex items-center gap-2 mt-auto">
                        <TrendingUp className={`w-4 h-4 ${idx === 0 ? "text-primary-foreground" : "text-success"}`} />
                        <span className={`text-sm font-bold ${idx === 0 ? "text-primary-foreground" : "text-success"}`}>
                          {kpi.trend}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
