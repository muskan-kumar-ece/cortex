"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/useChatStore";
import { Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ChatLauncher() {
  const toggleOpen = useUIStore((state) => state.toggleOpen);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-[120] flex items-end gap-4"
    >
      <button
        onClick={toggleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:bg-black/60 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {/* Breathing Glow Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl pointer-events-none"
        />

        {/* Content Container (Apple/Raycast dock style) */}
        <div className="relative flex items-center gap-3 pr-4 pl-1 py-1 rounded-full overflow-hidden">
          {/* Animated AI Orb */}
          <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-blue-600/80 p-0.5 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-black/20 rounded-full" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/20 border-t-white/80"
            />
            <Sparkles className="relative z-10 h-4 w-4 text-white" />
            
            {/* Notification Pulse */}
            <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-black/50"></span>
            </span>
          </div>

          <div className="flex flex-col items-start justify-center pr-2">
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              Cortex AI
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80 font-medium">
              Enterprise Assistant
            </span>
          </div>
        </div>
      </button>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            className="absolute right-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs text-white whitespace-nowrap shadow-xl"
          >
            Start a conversation
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black/80 border-r border-t border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
