"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { PremiumButton } from "@/components/marketing/PremiumButton";

interface SidebarNavProps {
  items: {
    slug: string;
    title: string;
    category: string;
  }[];
  basePath: string; // e.g. "/services"
}

export function SidebarNav({ items, basePath }: SidebarNavProps) {
  const pathname = usePathname();
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <nav className="w-full">
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, categoryItems], idx) => (
          <div key={category} className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-muted mb-4 pl-3 border-l border-border/50">
              {category}
            </h4>
            <ul className="space-y-1 relative border-l border-border/50 ml-[5px]">
              {categoryItems.map((item) => {
                const href = `${basePath}/${item.slug}`;
                const isActive = pathname === href;
                
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "relative flex items-center py-1.5 pl-4 text-sm transition-colors",
                        isActive 
                          ? "text-foreground font-medium" 
                          : "text-on-surface-muted hover:text-on-surface"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active-indicator"
                          className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Contact CTA */}
      <div className="mt-12 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-3 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Mail className="w-5 h-5 text-primary" />
        <div>
          <h5 className="font-heading font-semibold text-sm text-foreground">Need architectural guidance?</h5>
          <p className="text-xs text-on-surface-muted mt-1 leading-relaxed">Speak with our enterprise engineering team.</p>
        </div>
        <PremiumButton btnStyle="glass" className="w-full justify-center mt-2 text-xs h-9" render={<Link href="#consultation" />}>
          Contact Engineering
        </PremiumButton>
      </div>
    </nav>
  );
}
