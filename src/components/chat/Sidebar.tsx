"use client";

import { MessageSquare, Clock, LayoutDashboard, Bookmark, Settings, Database, PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { chatApi } from "@/lib/api";
import { useSessionStore } from "@/store/useChatStore";

export function Sidebar() {
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const setCurrentSessionId = useSessionStore((state) => state.setCurrentSessionId);
  
  const { data: sessionsResponse, isLoading } = useQuery({
    queryKey: ["chatSessions"],
    queryFn: () => chatApi.getSessions(),
  });

  const sessionsArray = sessionsResponse?.data?.sessions || (Array.isArray(sessionsResponse?.data) ? sessionsResponse.data : []);

  // Grouping logic
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const groups = {
    today: [] as any[],
    yesterday: [] as any[],
    lastWeek: [] as any[],
    older: [] as any[]
  };

  sessionsArray.forEach((session: any) => {
    const sessionDate = new Date(session.updated_at || session.created_at || Date.now());
    if (sessionDate >= today) {
      groups.today.push(session);
    } else if (sessionDate >= yesterday) {
      groups.yesterday.push(session);
    } else if (sessionDate >= lastWeek) {
      groups.lastWeek.push(session);
    } else {
      groups.older.push(session);
    }
  });

  const renderGroup = (title: string, groupSessions: any[]) => {
    if (groupSessions.length === 0) return null;
    return (
      <div className="flex flex-col mb-4">
        <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 flex items-center gap-2">
          {title}
        </h4>
        <div className="flex flex-col gap-1">
          {groupSessions.map((chat: any) => (
            <Button 
              key={chat.id} 
              variant="ghost" 
              onClick={() => setCurrentSessionId(chat.id)}
              className={`justify-start text-xs font-normal h-8 px-2 w-full ${currentSessionId === chat.id ? 'bg-primary/20 text-white' : 'text-on-surface-muted hover:text-white'}`}
            >
              <MessageSquare className={`h-3 w-3 mr-2 ${currentSessionId === chat.id ? 'opacity-100 text-primary' : 'opacity-50'}`} />
              <span className="truncate">{chat.title || "New Chat"}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full text-sm">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-heading font-semibold text-white tracking-tight flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          Workspace
        </h3>
        <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-white" onClick={() => setCurrentSessionId(null)}>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 no-scrollbar flex flex-col mt-4">
        
        {isLoading && (
          <div className="flex items-center justify-center p-4">
             <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && sessionsArray.length === 0 && (
          <div className="px-2 py-4 text-xs text-muted-foreground text-center">
            No recent chats
          </div>
        )}

        {!isLoading && sessionsArray.length > 0 && (
          <>
            {renderGroup("Today", groups.today)}
            {renderGroup("Yesterday", groups.yesterday)}
            {renderGroup("Last Week", groups.lastWeek)}
            {renderGroup("Older", groups.older)}
          </>
        )}
      </div>

      <div className="p-2 border-t border-white/5 mt-auto">
        <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-white">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
