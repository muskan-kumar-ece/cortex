"use client";

import { Variants } from "framer-motion";

// Cinematic bezier curves — expo out for entrances, expo in for exits
const EXPO_OUT  = [0.16, 1, 0.3, 1] as const;
const EXPO_IN   = [0.7, 0, 0.84, 0] as const;
const SPRING    = { type: "spring" as const, stiffness: 80, damping: 20 };
const SPRING_FAST = { type: "spring" as const, stiffness: 300, damping: 30 };

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: EXPO_OUT } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: EXPO_IN } },
};

export const slide: Variants = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
  exit:    { y: 24, opacity: 0, transition: { duration: 0.3, ease: EXPO_IN } },
};

export const slideUp: Variants = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EXPO_OUT } },
  exit:    { y: 40, opacity: 0, transition: { duration: 0.3, ease: EXPO_IN } },
};

export const slideLeft: Variants = {
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
  exit:    { x: 40, opacity: 0, transition: { duration: 0.3, ease: EXPO_IN } },
};

export const scale: Variants = {
  initial: { scale: 0.92, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EXPO_OUT } },
  exit:    { scale: 0.96, opacity: 0, transition: { duration: 0.25, ease: EXPO_IN } },
};

/** Staggered container — use with children that have their own variant */
export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};

/** Tight stagger for dense grids */
export const staggerFast: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

/** Hero text choreography — blur + slide for cinematic entrances */
export const heroEntrance: Variants = {
  initial: { y: 40, opacity: 0, filter: "blur(8px)" },
  animate: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.9, ease: EXPO_OUT },
  },
  exit: { y: -20, opacity: 0, filter: "blur(4px)", transition: { duration: 0.3, ease: EXPO_IN } },
};

/** Spring card reveal */
export const cardReveal: Variants = {
  initial: { y: 32, opacity: 0, scale: 0.96 },
  animate: { y: 0, opacity: 1, scale: 1, transition: SPRING },
  exit:    { y: 16, opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

/** Smooth drawer from right */
export const drawer: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
  exit:    { x: "100%", transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } },
};

/** Dropdown menus */
export const dropdown: Variants = {
  initial: { opacity: 0, y: -6, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EXPO_OUT } },
  exit:    { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.15, ease: EXPO_IN } },
};

/** Page-level transitions */
export const page: Variants = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: EXPO_OUT } },
  exit:    { opacity: 0, filter: "blur(4px)", transition: { duration: 0.3, ease: EXPO_IN } },
};

/** Hover lift utility for cards */
export const hoverLift: Variants = {
  initial: { y: 0 },
  hover:   { y: -6, transition: { duration: 0.3, ease: EXPO_OUT } },
};

/** Generic hover scale */
export const hover: Variants = {
  initial: { scale: 1 },
  hover:   { scale: 1.04, transition: SPRING_FAST },
  tap:     { scale: 0.97 },
};

/** Subtle fade in from nothing (used for background elements) */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: EXPO_OUT } },
  exit:    { opacity: 0, transition: { duration: 0.3, ease: EXPO_IN } },
};

// Legacy alias kept for back-compat
export const fadeInUp = slideUp;
