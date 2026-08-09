"use client";

import { motion } from "framer-motion";
import { PromptCards } from "./PromptCards";

export function WelcomeScreen() {

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 mb-6 shadow-2xl relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-inner" />
        </div>
        
        <h2 className="text-2xl font-heading font-bold text-white mb-2 tracking-tight">
          Good afternoon
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          How can Cortex AI help today?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        <PromptCards />
      </motion.div>
    </div>
  );
}
