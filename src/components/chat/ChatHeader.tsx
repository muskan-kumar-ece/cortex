"use client";

import { useUIStore, useSessionStore, useMessageStore } from "@/store/useChatStore";
import { Maximize2, Minimize2, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export function ChatHeader() {
  const toggleFullscreen = useUIStore((state) => state.toggleFullscreen);
  const isFullscreen = useUIStore((state) => state.isFullscreen);
  const toggleOpen = useUIStore((state) => state.toggleOpen);
  
  const setCurrentSessionId = useSessionStore((state) => state.setCurrentSessionId);
  const clearMessages = useMessageStore((state) => state.clearMessages);
  const queryClient = useQueryClient();

  const handleNewChat = () => {
    setCurrentSessionId(null);
    clearMessages();
    queryClient.invalidateQueries({ queryKey: ["chatSessions"] });
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-inner">
          <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-white">Cortex AI</span>
      </div>

      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={handleNewChat}
          className="text-muted-foreground hover:text-white"
          title="New Chat"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={toggleFullscreen}
          className="text-muted-foreground hover:text-white hidden md:flex"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={toggleOpen}
          className="text-muted-foreground hover:text-white"
          title="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
