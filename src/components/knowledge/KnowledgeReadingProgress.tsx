"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function KnowledgeReadingProgress({ readingTime }: { readingTime: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar only after scrolling past the hero (roughly 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-surface/50 backdrop-blur-md">
      <motion.div 
        className="h-full bg-primary origin-left"
        style={{ scaleX }}
      />
      <div className="absolute top-full right-4 mt-2 px-3 py-1 bg-surface border border-border-strong rounded-full text-[10px] font-bold tracking-widest uppercase text-primary shadow-lg">
        {readingTime}
      </div>
    </div>
  );
}
