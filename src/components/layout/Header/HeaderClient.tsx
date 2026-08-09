"use client";

import * as React from "react";
import Link from "next/link";
import { NavigationGroup, CompanyProfile } from "@/cms/navigation/types";
import { layoutConfig } from "@/config/layout";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "../ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { Search } from "lucide-react";

export function HeaderClient({ 
  mainNav, 
  profile 
}: { 
  mainNav: NavigationGroup[], 
  profile: CompanyProfile 
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700",
        scrolled ? "pt-4" : "pt-8"
      )}
    >
      <div 
        className={cn(
          "w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-6 transition-all duration-700",
          scrolled 
            ? "bg-surface/60 backdrop-blur-3xl border border-border-strong shadow-2xl rounded-full mx-4" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Glowing Aura Behind Logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Premium Abstract Logo */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.8)] transition-all duration-500 overflow-hidden">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="w-3 h-3 bg-white rounded-sm transform group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block group-hover:text-primary transition-colors">
              {profile.name}
            </span>
          </Link>
          
          <DesktopNav items={mainNav} />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-surface-hover text-sm text-on-surface-muted transition-colors group">
              <Search className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span className="hidden lg:inline">Search...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border-strong bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
            <PremiumButton btnStyle="primary" className="h-9 px-5 text-sm" render={<Link href="#consultation" />}>
              Start Project
            </PremiumButton>
          </div>
          
          <MobileNav items={mainNav} profile={profile} />
        </div>
      </div>
    </motion.header>
  );
}
