import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlueprintGrid } from "@/components/marketing/DataViz";

interface KnowledgeCtaProps {
  serviceTitle: string;
}

export function KnowledgeCta({ serviceTitle }: KnowledgeCtaProps) {
  return (
    <section className="relative py-32 overflow-hidden bg-background border-t border-border">
      {/* Background System */}
      <BlueprintGrid className="opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none mix-blend-screen" />
      
      <div className="container relative mx-auto px-4 md:px-6 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{serviceTitle}</span> capabilities?
          </h2>
          <p className="text-xl text-on-surface-muted leading-relaxed font-light mb-10">
            Partner with our elite team of architects and developers to build your next breakthrough product. We operate as an extension of your engineering organization.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#consultation"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-9 text-base font-bold text-primary-foreground shadow-[0_4px_25px_rgba(124,58,237,0.5),0_1px_0_rgba(255,255,255,0.2)_inset] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(124,58,237,0.7),0_1px_0_rgba(255,255,255,0.3)_inset]"
            >
              <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
              <span className="absolute inset-0 translate-x-[-150%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              <span className="relative z-10 drop-shadow-md">Book a Technical Consultation</span>
            </Link>
            <Link 
              href="/portfolio"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border-strong bg-surface text-foreground font-semibold hover:bg-surface-hover transition-colors"
            >
              View Enterprise Case Studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
