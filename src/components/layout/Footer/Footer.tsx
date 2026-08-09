import * as React from "react";
import Link from "next/link";
import { getFooterNavigation, getCompanyProfile } from "@/services/cms/navigation.service";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const [footerNav, profile] = await Promise.all([
    getFooterNavigation(),
    getCompanyProfile(),
  ]);

  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-background pt-32 pb-12 border-t border-border">
      <BackgroundMesh className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      <div className="container relative mx-auto px-6 max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[linear-gradient(-45deg,var(--cortex-violet)_0%,var(--cortex-cyan)_100%)] flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm transform group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground">
                {profile.name}
              </span>
            </Link>
            
            <p className="text-on-surface-muted text-sm leading-relaxed max-w-xs font-mono">
              {profile.description}
            </p>
            
            <div className="flex gap-4">
              {Object.entries(profile.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-on-surface-muted hover:text-foreground hover:bg-surface hover:border-primary/50 transition-all capitalize text-[10px] font-mono tracking-widest"
                >
                  {platform.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-6">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-4 text-sm text-on-surface-muted">
                  {group.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="w-1 h-1 rounded-full bg-border-strong group-hover/link:bg-primary transition-colors" />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">
              Newsletter
            </h4>
            <p className="text-sm text-on-surface-muted leading-relaxed">
              Subscribe to get the latest enterprise tech insights and architecture patterns.
            </p>
            <NewsletterForm />
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-muted">
          <p>© {currentYear} {profile.name}. System Operational.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems normal
            </span>
            <span>Latency: 12ms</span>
            <span>Version: 2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
