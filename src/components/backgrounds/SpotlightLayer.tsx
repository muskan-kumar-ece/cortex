"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";

export function SpotlightLayer({ className, color = "rgba(124,58,237,0.15)" }: { className?: string, color?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isClient = useIsClient();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  if (!isClient) return null;

  return (
    <motion.div
      className={cn("pointer-events-none fixed inset-0 z-50 mix-blend-screen", className)}
      style={{ background }}
    />
  );
}
