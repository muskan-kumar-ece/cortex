import { ProductPricingTier } from "@/config/products.types";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function KnowledgePricing({ tiers }: { tiers: ProductPricingTier[] }) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <section className=" md:">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Transparent Enterprise Pricing
        </h3>
        <p className="text-xl text-on-surface-muted">
          Predictable models designed to scale alongside your organization&apos;s growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier, idx) => (
          <div 
            key={idx} 
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
              tier.isPopular 
                ? "bg-primary/5 border-primary shadow-[0_0_40px_-15px_rgba(var(--color-primary),0.3)] scale-100 lg:scale-105 z-10" 
                : "bg-surface/30 border-border-strong hover:bg-surface/60"
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 rounded-full">
                Most Popular
              </div>
            )}
            
            <h4 className="text-2xl font-bold text-foreground">
              {tier.name}
            </h4>
            <p className="text-on-surface-muted min-h-[48px]">
              {tier.description}
            </p>
            
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-foreground">{tier.price}</span>
              {tier.billingPeriod && <span className="text-lg text-on-surface-muted">{tier.billingPeriod}</span>}
            </div>
            
            <Link
              href="#consultation"
              className={`w-full px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                tier.isPopular 
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
                  : "bg-surface text-foreground border border-border-strong hover:border-primary/50"
              }`}
            >
              {tier.ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div className="space-y-4 flex-grow">
              <p className="text-sm font-bold uppercase tracking-wider text-on-surface">
                What&apos;s included
              </p>
              {tier.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${tier.isPopular ? "text-primary" : "text-on-surface-muted"}`} />
                  <span className="text-on-surface leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
