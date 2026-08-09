import { AuroraBackground } from "@/components/marketing/AuroraBackground";
import { HeroLayout } from "@/components/marketing/HeroLayout";
import { HeroBadge } from "@/components/marketing/HeroBadge";
import { GradientHeading, GradientText } from "@/components/marketing/GradientHeading";
import { GlassCard } from "@/components/marketing/GlassCard";
import { GlassGrid } from "@/components/marketing/GlassGrid";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { PremiumCTA } from "@/components/marketing/PremiumCTA";
import { FloatingDecoration } from "@/components/marketing/FloatingDecoration";
import { StatsGrid } from "@/components/marketing/StatsGrid";
import { TechBadge } from "@/components/marketing/TechBadge";
import { Timeline } from "@/components/marketing/Timeline";
import { Activity, Cloud, Database, Layout, Smartphone, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Design System Showcase | Cortex IT Solution",
  description: "Internal reference for Cortex IT Solution's premium marketing component library.",
};

export default function DesignSystemPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 space-y-32 max-w-7xl">
        
        {/* Intro */}
        <div className="border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Design System</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Internal reference for the Marketing Component System. Use these building blocks to construct premium pages ensuring visual consistency across W1-W10 phases.
          </p>
        </div>

        {/* 1. Hero Layouts & Backgrounds */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">1. Hero Components & Aurora Background</h2>
          <div className="relative border border-white/10 rounded-3xl overflow-hidden min-h-[600px]">
            <AuroraBackground className="py-24">
              <FloatingDecoration 
                className="top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/30 to-accent/30"
                yOffset={-20}
              />
              <FloatingDecoration 
                className="bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-tr from-accent/20 to-primary/20 border-white/5"
                yOffset={30}
                delay={1}
              />
              <HeroLayout alignment="center">
                <HeroBadge>System Showcase</HeroBadge>
                <GradientHeading as="h1" className="text-5xl md:text-6xl font-extrabold leading-[1.1]">
                  Building the <GradientText>Future</GradientText>
                </GradientHeading>
                <p className="text-lg text-muted-foreground max-w-xl text-balance mt-4">
                  This demonstrates the HeroLayout centered alignment wrapped in an AuroraBackground with FloatingDecorations.
                </p>
                <div className="mt-8">
                  <PremiumButton>Primary CTA</PremiumButton>
                </div>
              </HeroLayout>
            </AuroraBackground>
          </div>
        </section>

        {/* 2. Glassmorphism & Grids */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">2. Glass Cards & Grids</h2>
          <div className="p-8 border border-white/10 rounded-3xl bg-white/[0.01]">
            <GlassGrid columns={3}>
              <GlassCard hoverEffect="tilt" glowColor="primary">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tilt Hover (Primary)</h3>
                <p className="text-muted-foreground text-sm">Cards feature 3D tilt hover effects and inner radial glows.</p>
              </GlassCard>
              <GlassCard hoverEffect="lift" glowColor="accent">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lift Hover (Accent)</h3>
                <p className="text-muted-foreground text-sm">Cards feature lift hover effects with accent glows.</p>
              </GlassCard>
              <GlassCard hoverEffect="none" glowColor="primary">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Hover</h3>
                <p className="text-muted-foreground text-sm">Basic static glassmorphic panel.</p>
              </GlassCard>
            </GlassGrid>
          </div>
        </section>

        {/* 3. Metrics & Data */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">3. Data & Metrics</h2>
          <div className="p-8 md:p-16 border border-white/10 rounded-3xl bg-white/[0.01]">
            <StatsGrid stats={[
              { id: '1', value: '99.99%', label: 'Uptime SLA' },
              { id: '2', value: '45%', label: 'Faster Delivery' },
              { id: '3', value: '2M+', label: 'Daily Requests' },
              { id: '4', value: '10x', label: 'ROI' },
            ]} />
          </div>
        </section>

        {/* 4. Tech Badges */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">4. Tech Badges</h2>
          <div className="p-12 border border-white/10 rounded-3xl bg-white/[0.01] flex flex-wrap justify-center gap-8">
            <TechBadge icon={<Cloud className="w-10 h-10" />} label="AWS" />
            <TechBadge icon={<Database className="w-10 h-10" />} label="PostgreSQL" />
            <TechBadge icon={<Layout className="w-10 h-10" />} label="React" />
            <TechBadge icon={<Smartphone className="w-10 h-10" />} label="React Native" />
            <TechBadge icon={<Activity className="w-10 h-10" />} label="Monitoring" />
          </div>
        </section>

        {/* 5. Timelines */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">5. Timelines</h2>
          <div className="border border-white/10 rounded-3xl bg-white/[0.01]">
            <Timeline 
              title="Interactive Timeline" 
              description="Used for processes or history"
              steps={[
                { id: '1', title: 'Discovery', description: 'Initial deep dive.', icon: <Zap /> },
                { id: '2', title: 'Architecture', description: 'System design.', icon: <Layout /> },
              ]}
            />
          </div>
        </section>

        {/* 6. Buttons & CTAs */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b border-white/5 pb-4">6. Premium CTA & Buttons</h2>
          <div className="border border-white/10 rounded-3xl overflow-hidden relative">
            <PremiumCTA 
              headline="Ready to build?" 
              subheadline="Integrate this CTA at the bottom of major hubs."
            >
              <PremiumButton render={<Link href="#" />} nativeButton={false}>
                Contact Sales
              </PremiumButton>
            </PremiumCTA>
          </div>
        </section>

      </div>
    </main>
  );
}
