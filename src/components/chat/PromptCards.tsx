"use client";

import { motion } from "framer-motion";
import { useSessionStore, useMessageStore } from "@/store/useChatStore";
import { useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api";

const prompts = [
  {
    title: "Design an AI Architecture",
    description: "Enterprise Solution",
    time: "12 min",
  },
  {
    title: "Explain Django",
    description: "Backend Architecture",
    time: "5 min",
  },
  {
    title: "Cloud Migration",
    description: "AWS Strategy",
    time: "8 min",
  },
  {
    title: "Generate Proposal",
    description: "SaaS Application",
    time: "2 min",
  }
];

export function PromptCards() {
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const setCurrentSessionId = useSessionStore((state) => state.setCurrentSessionId);
  const addMessage = useMessageStore((state) => state.addMessage);
  const isStreaming = useMessageStore((state) => state.isStreaming);
  const setIsStreaming = useMessageStore((state) => state.setIsStreaming);
  const queryClient = useQueryClient();

  const handlePrompt = async (prompt: string) => {
    if (isStreaming) return;

    addMessage({ 
      id: Date.now().toString(), 
      role: "user", 
      content: prompt, 
      created_at: new Date().toISOString()
    });
    
    setIsStreaming(true);

    try {
      const token = currentSessionId ? localStorage.getItem(`b10_token_${currentSessionId}`) : null;

      const result = await chatApi.sendMessage(currentSessionId, token, prompt);
      const responseData = result.data || result;
      
      // If this is a new session
      if (responseData?.session?.id && responseData?.session?.token && !currentSessionId) {
        setCurrentSessionId(responseData.session.id);
        localStorage.setItem(`b10_token_${responseData.session.id}`, responseData.session.token);
        queryClient.invalidateQueries({ queryKey: ["chatSessions"] });
      }
      
      addMessage({ 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: responseData?.message?.content || "Sorry, I couldn't process that request.", 
        created_at: new Date().toISOString(),
      });
      console.log("Zustand Messages Array:", useMessageStore.getState().messages);
    } catch (err) {
      console.error("Chat Error:", err);
      // If 401, they might have an expired token, clear session so they can retry
      if ((err as Error)?.message?.includes("401")) {
        setCurrentSessionId(null);
      }
      addMessage({ 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: "Sorry, I couldn't process that request. (Network/Backend Error)", 
        created_at: new Date().toISOString() 
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {prompts.map((prompt, index) => (
        <motion.button
          key={prompt.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          onClick={() => handlePrompt(prompt.title)}
          className="group relative flex flex-col text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h4 className="font-medium text-white text-sm relative z-10 mb-1">
            {prompt.title}
          </h4>
          <div className="flex items-center justify-between mt-auto pt-2 relative z-10">
            <span className="text-xs text-muted-foreground">{prompt.description}</span>
            <span className="text-xs font-mono text-muted-foreground/60">{prompt.time}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
