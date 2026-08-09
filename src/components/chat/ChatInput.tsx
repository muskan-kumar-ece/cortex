"use client";

import { useSessionStore, useMessageStore } from "@/store/useChatStore";
import { useQueryClient } from "@tanstack/react-query";
import { Paperclip, Mic, Send, ArrowUp, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { chatApi } from "@/lib/api";

export function ChatInput() {
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const setCurrentSessionId = useSessionStore((state) => state.setCurrentSessionId);
  const addMessage = useMessageStore((state) => state.addMessage);
  const isStreaming = useMessageStore((state) => state.isStreaming);
  const setIsStreaming = useMessageStore((state) => state.setIsStreaming);
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<{name: string; base64: string} | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = async () => {
    if (!input.trim() || isStreaming) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add User Message Optimistically
    addMessage({ 
      id: Date.now().toString(), 
      role: "user", 
      content: userMessage, 
      created_at: new Date().toISOString() 
    });
    
    setIsStreaming(true);

    try {
      const metadata: Record<string, any> = {};
      if (attachment) {
        metadata.attachment = attachment.base64;
        metadata.attachmentName = attachment.name;
        setAttachment(null);
      }
      
      const token = currentSessionId ? localStorage.getItem(`b10_token_${currentSessionId}`) : null;

      const result = await chatApi.sendMessage(
        currentSessionId,
        token,
        userMessage,
        Object.keys(metadata).length > 0 ? metadata : undefined
      );

      const responseData = result.data || result; // Handle both wrapped and unwrapped

      // If this is a new session
      if (responseData?.session?.id && responseData?.session?.token && !currentSessionId) {
        setCurrentSessionId(responseData.session.id);
        localStorage.setItem(`b10_token_${responseData.session.id}`, responseData.session.token);
        queryClient.invalidateQueries({ queryKey: ["chatSessions"] });
      }

      // Add Assistant Message
      addMessage({ 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: responseData?.message?.content || "Sorry, I couldn't process that request.", 
        created_at: new Date().toISOString(),
      });
      
      // Print the Zustand messages array after update
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment({
          name: file.name,
          base64: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {/* Templates Row */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <Button variant="ghost" size="xs" className="h-6 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] uppercase tracking-wider text-muted-foreground flex gap-1">
          <Zap className="h-3 w-3 text-yellow-500" /> Templates
        </Button>
      </div>

      <div className="relative flex flex-col w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all group overflow-hidden">
        
        {attachment && (
          <div className="px-3 py-2 border-b border-white/5 bg-primary/10 flex items-center gap-2 text-xs text-primary-foreground">
            <Paperclip className="h-3 w-3" />
            <span className="truncate max-w-[200px]">{attachment.name}</span>
            <button onClick={() => setAttachment(null)} className="ml-auto text-muted-foreground hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Cortex AI..."
          className="w-full resize-none bg-transparent border-0 py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none min-h-[48px] max-h-[200px]"
          rows={1}
        />

        <div className="flex items-center justify-between px-3 py-2 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-1">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <Button variant="ghost" size="icon-sm" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/10" title="Attach File" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/10" title="Voice Input">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground/50 font-mono hidden sm:block">
              {input.length} chars
            </span>
            <Button 
              size="icon-sm" 
              onClick={handleSubmit}
              disabled={!input.trim() || isStreaming}
              className={cn(
                "rounded-full transition-all duration-300 h-8 w-8",
                input.trim() ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/10 text-muted-foreground cursor-not-allowed"
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-muted-foreground/60 font-mono">
          Cortex AI can make mistakes. Verify important information.
        </span>
      </div>
    </div>
  );
}
