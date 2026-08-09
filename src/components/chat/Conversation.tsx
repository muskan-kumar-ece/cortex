"use client";

import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMessageStore, useSessionStore } from "@/store/useChatStore";
import { useQuery } from "@tanstack/react-query";
import { chatApi } from "@/lib/api";

export function Conversation() {
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const isStreaming = useMessageStore((state) => state.isStreaming);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch history when session changes
  const { data: historyData } = useQuery({
    queryKey: ["chatHistory", currentSessionId],
    queryFn: async () => {
      if (!currentSessionId) return null;
      const token = localStorage.getItem(`b10_token_${currentSessionId}`) || "";
      try {
        return await chatApi.getHistory(currentSessionId, token);
      } catch (err: any) {
        if (err?.message?.includes("401")) {
          useSessionStore.getState().setCurrentSessionId(null);
        }
        throw err;
      }
    },
    enabled: !!currentSessionId,
    retry: false, // Do not retry on 401 errors
  });

  useEffect(() => {
    if (historyData?.data?.messages) {
      setMessages(historyData.data.messages);
    }
  }, [historyData, setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto pb-8">
      <AnimatePresence initial={false}>
        {messages.map((message, i) => (
          <ChatMessage key={message.id || i} message={message} />
        ))}
        {isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-3 max-w-[85%] self-start"
          >
            {/* Thinking / Tool Calling Simulation */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-white/5 border border-white/10 px-3 py-1.5 rounded-md self-start">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span>Analyzing context & searching knowledge base...</span>
            </div>
            
            {/* Pulsing Skeleton for Streaming */}
            <div className="flex items-center gap-2 text-primary font-heading font-medium">
              <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
              Cortex AI is typing...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={bottomRef} className="h-px w-full" />
    </div>
  );
}
