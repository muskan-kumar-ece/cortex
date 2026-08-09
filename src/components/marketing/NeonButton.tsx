import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  render?: React.ReactElement<{ className?: string, children?: ReactNode }>;
}

export function NeonButton({ children, className, render, ...props }: NeonButtonProps) {
  const content = (
    <button 
      className={cn(
        "group relative inline-flex items-center justify-center px-6 py-3 min-w-[120px]",
        "bg-background text-foreground font-semibold text-sm rounded-lg",
        "transition-all duration-300 outline-none z-10",
        // The spinning gradient border (before)
        "before:absolute before:inset-[-2px] before:-z-10 before:rounded-[10px]",
        "before:bg-[linear-gradient(-45deg,var(--cortex-violet)_0%,var(--cortex-cyan)_100%)]",
        "before:transition-transform before:duration-700 hover:before:-rotate-180",
        "active:before:scale-95",
        // The glowing shadow (after)
        "after:absolute after:inset-0 after:-z-20 after:rounded-xl",
        "after:bg-[linear-gradient(-45deg,var(--cortex-violet)_0%,var(--cortex-cyan)_100%)]",
        "after:blur-[20px] after:opacity-70 hover:after:blur-[30px] hover:after:opacity-100",
        "after:transition-all after:duration-500",
        className
      )} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center h-full w-full bg-background/80 rounded-lg backdrop-blur-sm px-6 py-2 border border-border">
        {children}
      </span>
    </button>
  );

  if (render) {
    return React.cloneElement(render, {
      className: cn(render.props.className, "relative inline-flex z-10"),
      children: content
    });
  }

  return <div className="relative inline-flex z-10">{content}</div>;
}
