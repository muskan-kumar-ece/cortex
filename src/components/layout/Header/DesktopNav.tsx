"use client";

import * as React from "react";
import Link from "next/link";
import { NavigationGroup } from "@/cms/navigation/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";

interface DesktopNavProps {
  items: NavigationGroup[];
}

export function DesktopNav({ items }: DesktopNavProps) {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-2">
        {items.map((group) => (
          <NavigationMenuItem key={group.title}>
            {group.sections || group.links ? (
              <>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  {group.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6 rounded-2xl bg-[var(--glass-bg)] backdrop-blur-3xl border border-[var(--glass-border)] shadow-2xl flex gap-6">
                    {/* Left Side: Links Grid */}
                    <div className="flex-1">
                      {group.sections ? (
                        <div className="grid grid-cols-2 gap-8">
                          {group.sections.map((section) => (
                            <div key={section.title} className="flex flex-col gap-3">
                              <h4 className="text-[10px] uppercase tracking-widest font-mono text-primary font-bold">
                                {section.title}
                              </h4>
                              <ul className="flex flex-col gap-2">
                                {section.links.map((link) => (
                                  <ListItem
                                    key={link.title}
                                    title={link.title}
                                    href={link.href}
                                  >
                                    {link.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : group.links ? (
                        <ul className="grid grid-cols-2 gap-4">
                          {group.links.map((link) => (
                            <ListItem
                              key={link.title}
                              title={link.title}
                              href={link.href}
                            >
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    {/* Right Side: Featured Visual Card */}
                    <div className="w-1/3 flex flex-col justify-end">
                      <div className="rounded-xl overflow-hidden bg-foreground/5 dark:bg-black/40 border border-foreground/5 dark:border-white/5 p-4 flex flex-col gap-4 group cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden">
                          {group.title === "Services" ? (
                            <ArchitectureDiagram interactive={false} />
                          ) : (
                            <DashboardPreview interactive={false} />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {group.cta?.title || "Explore More"}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Discover our world-class engineering solutions and active project telemetry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink 
                render={<Link href={group.cta?.href || "#"} />}
                className={cn(
                  navigationMenuTriggerStyle(), 
                  "bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                )}
              >
                {group.title}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        render={<Link href={props.href || "#"} />}
        ref={ref}
        className={cn(
          "group block select-none rounded-xl p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-foreground/5 dark:hover:bg-white/5 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-transparent hover:border-foreground/10 dark:hover:border-white/10",
          className
        )}
        {...props}
      >
        <div className="text-sm font-bold leading-none text-foreground mb-1.5 flex items-center justify-between">
          {title}
          <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        {children && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
            {children}
          </p>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
