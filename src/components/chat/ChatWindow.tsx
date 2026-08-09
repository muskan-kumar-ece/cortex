"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { BackgroundMesh } from "@/components/backgrounds/BackgroundMesh";
import { NoiseLayer } from "@/components/backgrounds/NoiseLayer";
import { cn } from "@/lib/utils";
import { WelcomeScreen } from "./WelcomeScreen";
import { Conversation } from "./Conversation";
import { ChatInput } from "./ChatInput";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { useUIStore, useMessageStore } from "@/store/useChatStore";

export function ChatWindow() {
  const isOpen = useUIStore((state) => state.isOpen);
  const isFullscreen = useUIStore((state) => state.isFullscreen);
  const messages = useMessageStore((state) => state.messages);

  // Scroll lock when fullscreen on mobile
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth < 768 || isFullscreen) {
        document.body.style.overflow = "hidden";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isFullscreen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for fullscreen mode or mobile */}
          {(isFullscreen || typeof window !== 'undefined' && window.innerWidth < 768) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[125] bg-black/60 backdrop-blur-sm"
            />
          )}

          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "fixed z-[130] flex overflow-hidden shadow-2xl transition-all duration-300 ease-in-out border border-white/10 bg-black/70 backdrop-blur-3xl",
              // Mobile defaults to full screen
              "inset-0 md:inset-auto",
              // Desktop layout states
              isFullscreen 
                ? "md:inset-4 md:rounded-2xl" 
                : "md:bottom-24 md:right-6 md:w-[450px] md:h-[600px] md:rounded-2xl"
            )}
          >
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-20">
              <BackgroundMesh />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
              <NoiseLayer />
            </div>

            {/* Sidebar (Desktop Fullscreen Only) */}
            {isFullscreen && (
              <div className="hidden md:flex w-[260px] shrink-0 border-r border-white/10 bg-black/40 relative z-10">
                <Sidebar />
              </div>
            )}

            {/* Main Chat Area */}
            <div className="flex flex-col flex-1 relative z-10 h-full">
              <ChatHeader />
              
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                {messages.length === 0 ? (
                  <WelcomeScreen />
                ) : (
                  <Conversation />
                )}
              </div>

              <div className="shrink-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <ChatInput />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
