"use client";

import { ReactNode, ReactElement, ComponentProps, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends Omit<ComponentProps<typeof Button>, "variant"> {
  children: ReactNode;
  render?: ReactElement;
  btnStyle?: "primary" | "ghost" | "outline" | "glass";
  nativeButton?: boolean;
}

export function PremiumButton({
  children,
  className,
  btnStyle = "primary",
  nativeButton,
  render,
  ...props
}: PremiumButtonProps) {
  // Base UI button accessibility fix: if rendering as a Link/anchor, it's not a native button
  const isNative = nativeButton !== undefined ? nativeButton : (render ? false : true);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  
  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx * 0.15);
    y.set(cy * 0.15);
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const handleMouseLeave = () => { 
    x.set(0); 
    y.set(0); 
  };

  if (btnStyle === "ghost") {
    return (
      <Button
        {...props}
        render={render}
        nativeButton={isNative}
        className={cn(
          "h-10 px-5 rounded-full text-sm font-semibold tracking-wide",
          "text-muted-foreground hover:text-foreground",
          "bg-transparent border border-transparent hover:border-foreground/10 dark:hover:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5",
          "transition-all duration-300",
          className
        )}
      >
        <span className="relative z-10 flex items-center">{children}</span>
      </Button>
    );
  }

  if (btnStyle === "glass") {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.98 }}
        className="relative inline-flex group"
      >
        <Button
          {...props}
          render={render}
          nativeButton={isNative}
          className={cn(
            "relative h-12 px-7 rounded-full text-sm font-semibold overflow-hidden",
            "bg-[var(--glass-bg)] text-foreground dark:text-white backdrop-blur-xl",
            "border border-[var(--glass-border)] shadow-[var(--glass-shadow)]",
            "transition-all duration-500 hover:border-foreground/20 dark:hover:border-white/20 hover:bg-foreground/10 dark:hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
            className
          )}
        >
          {/* Spotlight hover effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`,
            }}
          />
          <span className="relative z-10 flex items-center drop-shadow-md">{children}</span>
        </Button>
      </motion.div>
    );
  }

  if (btnStyle === "outline") {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.98 }}
        className="relative inline-flex group"
      >
        <Button
          {...props}
          render={render}
          nativeButton={isNative}
          className={cn(
            "relative h-12 px-7 rounded-full text-sm font-semibold overflow-hidden",
            "bg-transparent text-primary",
            "border border-primary/30",
            "transition-all duration-500",
            className
          )}
        >
          {/* Outer glow and border change on hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full shadow-[inset_0_0_15px_rgba(124,58,237,0.3),0_0_15px_rgba(124,58,237,0.3)]" />
          <span className="relative z-10 flex items-center">{children}</span>
        </Button>
      </motion.div>
    );
  }

  // Primary variant — the premium CTA
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="relative inline-flex group"
    >
      <Button
        {...props}
        render={render}
        nativeButton={isNative}
        className={cn(
          "relative h-14 px-9 text-base rounded-full font-bold overflow-hidden",
          "bg-primary text-primary-foreground",
          "border border-foreground/20 dark:border-white/20 shadow-[0_4px_25px_rgba(124,58,237,0.5),0_1px_0_rgba(255,255,255,0.2)_inset]",
          "transition-all duration-300 group-hover:shadow-[0_8px_40px_rgba(124,58,237,0.7),0_1px_0_rgba(255,255,255,0.3)_inset]",
          className
        )}
      >
        {/* Dynamic mesh gradient background that moves slightly on hover */}
        <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
        
        {/* Spotlight hover effect for primary button */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
          style={{
            background: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 80%)`,
          }}
        />
        
        <span className="absolute inset-0 translate-x-[-150%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">{children}</span>
      </Button>
    </motion.div>
  );
}
