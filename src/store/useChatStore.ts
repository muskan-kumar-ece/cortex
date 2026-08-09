import { create } from 'zustand';

interface UIState {
  isOpen: boolean;
  isFullscreen: boolean;
  isSidebarOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  setFullscreen: (isFullscreen: boolean) => void;
  toggleFullscreen: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isOpen: false,
  isFullscreen: false,
  isSidebarOpen: true,
  setOpen: (isOpen) => set({ isOpen }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

interface SessionState {
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentSessionId: null,
  setCurrentSessionId: (id) => set({ currentSessionId: id }),
}));

interface SettingsState {
  theme: 'dark' | 'light' | 'system';
  historyEnabled: boolean;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  setHistoryEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'system',
  historyEnabled: true,
  setTheme: (theme) => set({ theme }),
  setHistoryEnabled: (historyEnabled) => set({ historyEnabled }),
}));

export type Role = "user" | "assistant" | "system";
export type MessageType = "text" | "tool_call" | "tool_result" | "architecture" | "error";

export interface Message {
  id?: string;
  role: Role;
  type?: MessageType | string;
  content: string;
  created_at?: string;
  timestamp?: string; // For backward compatibility if needed
  isStreaming?: boolean;
  response_metadata?: any;
}

interface MessageState {
  messages: Message[];
  isStreaming: boolean;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateStreamingMessage: (content: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  isStreaming: false,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateStreamingMessage: (content) => set((state) => {
    const messages = [...state.messages];
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.isStreaming) {
      lastMessage.content += content;
    }
    return { messages };
  }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  clearMessages: () => set({ messages: [] }),
}));
