"use client";

import React, { useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";
import { useIsClient } from "@/hooks/useIsClient";
import { chatApi } from "@/lib/api";
import { useUIStore, useSessionStore } from "@/store/useChatStore";

export function ChatbotRoot({ children }: { children?: ReactNode }) {
  const isClient = useIsClient();
  const isOpen = useUIStore((state) => state.isOpen);
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const setCurrentSessionId = useSessionStore((state) => state.setCurrentSessionId);

  // Fetch sessions from backend
  const { data: sessionsResponse, isLoading } = useQuery({
    queryKey: ["chatSessions"],
    queryFn: () => chatApi.getSessions(),
    enabled: isOpen && !currentSessionId,
  });

  useEffect(() => {
    // If widget opens and we don't have a session ID, let's load or create one
    if (isOpen && !currentSessionId) {
      if (sessionsResponse?.data?.sessions && sessionsResponse.data.sessions.length > 0) {
        // Resume latest session (data is now nested in { sessions: [...] })
        setCurrentSessionId(sessionsResponse.data.sessions[0].id);
      } else if (sessionsResponse?.data && Array.isArray(sessionsResponse.data) && sessionsResponse.data.length > 0) {
        // Fallback for older API format just in case
        setCurrentSessionId(sessionsResponse.data[0].id);
      }
      // If no sessions exist, we DO NOT create a new one. We just let the user see the Welcome Screen.
    }
  }, [isOpen, currentSessionId, sessionsResponse, isLoading, setCurrentSessionId]);

  if (!isClient) return null;

  return (
    <>
      {children}
      <div className="fixed z-[120]">
        {!isOpen && <ChatLauncher />}
        {isOpen && <ChatWindow />}
      </div>
    </>
  );
}
