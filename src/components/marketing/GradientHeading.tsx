import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * GradientHeading — Use for section titles.
 * - For display-scale headings (5xl+): pass className="text-5xl tracking-[-0.04em]"
 * - Reserve GradientText for ONE key word per heading, not entire strings
 */
export function GradientHeading({
  children,
  className,
  as: Component = "h2",
}: GradientHeadingProps) {
  return (
    <Component
      className={cn(
        "font-bold tracking-tight text-foreground text-balance leading-[1.1]",
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * GradientText — Applies the Cortex brand gradient to a single word or phrase.
 * Use sparingly: one word per heading, never entire paragraphs.
 */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * AccentText — For cyan / emerald semantic highlights.
 */
export function AccentText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-gradient-to-r from-cyan-400 to-emerald-400",
        className
      )}
    >
      {children}
    </span>
  );
}
