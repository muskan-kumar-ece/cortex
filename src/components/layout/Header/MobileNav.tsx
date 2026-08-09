"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Search, MapPin, Phone, Mail, Clock } from "lucide-react";
import { NavigationGroup, CompanyProfile } from "@/cms/navigation/types";
import { useNavigationState } from "@/providers/navigation-provider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { SpotlightLayer } from "@/components/backgrounds/SpotlightLayer";
import { NoiseLayer } from "@/components/backgrounds/NoiseLayer";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavigationGroup[];
  profile: CompanyProfile;
}

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const STAGGER_PARENT: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export function MobileNav({ items, profile }: MobileNavProps) {
  const { mobileOpen, setMobileOpen } = useNavigationState();
  const [mounted, setMounted] = React.useState(false);

  // Focus trap ref
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileOpen, setMobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex lg:hidden">
      {/* Trigger Button */}
      <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="h-9 w-9 relative z-[110]">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open navigation menu</span>
      </Button>

      {/* Full Screen Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
              <BackgroundMesh />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
              <SpotlightLayer />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
              <NoiseLayer />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

            <div className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar pb-12">
              {/* Header */}
              <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-black/20">
                <span className="font-heading font-bold text-lg tracking-tight">
                  {profile.name}
                </span>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close navigation menu</span>
                </Button>
              </div>

              {/* Staggered Content Container */}
              <motion.div
                variants={STAGGER_PARENT}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-8 px-6 pt-6"
              >
                {/* Search Bar Placeholder */}
                <motion.div variants={STAGGER_CHILD} className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search Services, Products, Technologies..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-muted-foreground uppercase">
                      ⌘ K
                    </kbd>
                  </div>
                </motion.div>

                {/* Navigation Sections */}
                <motion.div variants={STAGGER_CHILD} className="flex flex-col gap-8">
                  {items.map((group) => {
                    const hasSubItems = !!(group.sections || group.links);

                    if (!hasSubItems) {
                      return (
                        <Link
                          key={group.title}
                          href={group.cta?.href || "#"}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between py-2 text-left w-full group transition-colors border-b border-white/5 pb-4"
                        >
                          <span className="text-xl font-heading tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {group.title}
                          </span>
                        </Link>
                      );
                    }

                    return (
                      <div key={group.title} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                          <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">
                            {group.title}
                          </span>
                        </div>

                        <div className="flex flex-col gap-6 pl-2">
                          {group.sections ? (
                            group.sections.map(section => (
                              <div key={section.title} className="flex flex-col gap-2">
                                <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/50">
                                  {section.title}
                                </h4>
                                <ul className="flex flex-col gap-3 mt-1">
                                  {section.links.map(link => (
                                    <li key={link.title}>
                                      <Link
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        className="text-base font-medium text-foreground/80 hover:text-white hover:translate-x-1 transition-all block"
                                      >
                                        {link.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          ) : group.links ? (
                            <ul className="flex flex-col gap-3">
                              {group.links.map(link => (
                                <li key={link.title}>
                                  <Link
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="text-base font-medium text-foreground/80 hover:text-white hover:translate-x-1 transition-all block"
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                  {/* Quick Actions */}
                  <motion.div variants={STAGGER_CHILD} className="flex flex-col gap-3 mt-4">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/70 pl-2">Quick Actions</h4>
                    <PremiumButton render={<Link href="#consultation" onClick={handleLinkClick} />} className="w-full justify-center">
                      Schedule Strategy Call
                    </PremiumButton>
                    <PremiumButton btnStyle="glass" render={<Link href="#quote" onClick={handleLinkClick} />} className="w-full justify-center">
                      Start a Project
                    </PremiumButton>
                    <div className="grid grid-cols-2 gap-3">
                      <Button nativeButton={false} variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10" render={<Link href="#consultation" onClick={handleLinkClick}>Contact Sales</Link>} />
                      <Button nativeButton={false} variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10" render={<Link href="#quote" onClick={handleLinkClick}>Request Quote</Link>} />
                    </div>
                  </motion.div>

                  {/* Company Info Card */}
                  <motion.div variants={STAGGER_CHILD} className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex flex-col gap-4 relative z-10">
                      <div>
                        <h3 className="font-heading font-bold text-lg">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">Enterprise Software Architecture</p>
                      </div>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-on-surface-muted">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>Hyderabad</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <Link href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">{profile.phone}</Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <Link href={`mailto:${profile.email}`} className="hover:text-primary transition-colors block truncate w-[100px]">{profile.email}</Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>9 AM - 6 PM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                {/* Social Pills */}
                <motion.div variants={STAGGER_CHILD} className="flex flex-wrap items-center gap-3 mt-2">
                  {[
                    { name: "LinkedIn", href: profile.socials?.linkedin || "#" },
                    { name: "GitHub", href: profile.socials?.github || "#" },
                    { name: "Twitter", href: profile.socials?.twitter || "#" },
                    { name: "YouTube", href: "#" },
                  ].map(social => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                      {social.name}
                    </Link>
                  ))}
                </motion.div>
                  
                  {/* Future Ready Spacing */}
                  <motion.div variants={STAGGER_CHILD} className="h-12 w-full" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
