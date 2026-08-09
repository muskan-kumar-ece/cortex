"use client";

import { User, Copy, CheckCircle2, ChevronRight, Download, Calendar, FileText, AlertCircle, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/features/contact/components/ConsultationModal";
import { QuoteRequestModal } from "@/features/contact/components/QuoteRequestModal";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatApi } from "@/lib/api";
import { useSessionStore, Message } from "@/store/useChatStore";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const content = message.content || "";
  const isError = message.type === "error" || content.includes("experiencing technical difficulties");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex gap-4 max-w-full md:max-w-[85%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isUser ? (
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="h-8 w-8 rounded-lg bg-error/20 flex items-center justify-center shadow-lg border border-error/30">
              <AlertCircle className="h-4 w-4 text-error" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
              <div className="h-2 w-2 bg-white rounded-full" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "flex flex-col gap-2 min-w-0",
            isUser ? "items-end" : "items-start"
          )}
        >
          {isUser ? (
            <div className="px-5 py-3 rounded-2xl bg-white/10 text-white font-medium backdrop-blur-md border border-white/5 shadow-sm text-sm">
              {content}
            </div>
          ) : (
            <div className="text-foreground w-full prose prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent max-w-none text-sm space-y-4">
              <MarkdownReal message={message} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// Real Markdown & Rich Components
// ----------------------------------------------------------------------

function MarkdownReal({ message }: { message: Message }) {
  const { id, content, timestamp, created_at, response_metadata } = message;
  const msgTime = timestamp || created_at || new Date().toISOString();
  const isNew = new Date().getTime() - new Date(msgTime).getTime() < 5000;
  const safeContent = content || "";
  const [displayedContent, setDisplayedContent] = useState(isNew ? "" : safeContent);
  
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  
  const [feedbackSent, setFeedbackSent] = useState<"up" | "down" | null>(null);
  const currentSessionId = useSessionStore((state) => state.currentSessionId);

  useEffect(() => {
     if (!isNew) return;
     let i = 0;
     const interval = setInterval(() => {
       setDisplayedContent(safeContent.slice(0, i));
       i += 4;
       if (i > safeContent.length) {
         setDisplayedContent(safeContent);
         clearInterval(interval);
       }
     }, 10);
     return () => clearInterval(interval);
  }, [safeContent, isNew]);

  const handleFeedback = async (isPositive: boolean) => {
    if (feedbackSent || !currentSessionId || !id) return;
    try {
      const token = localStorage.getItem(`b10_token_${currentSessionId}`) || "";
      await chatApi.sendFeedback(currentSessionId, token, id, isPositive);
      setFeedbackSent(isPositive ? "up" : "down");
    } catch (err: any) {
      console.error("Failed to send feedback", err);
      if (err?.message?.includes("401")) {
        useSessionStore.getState().setCurrentSessionId(null);
      }
    }
  };

  const intents = response_metadata?.intents || [];
  const mode = response_metadata?.mode || "";

  return (
    <div className="flex flex-col gap-4">
      <div className="break-words">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline ? (
                <div className="flex flex-col w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] my-4 shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{match ? match[1] : 'code'}</span>
                    </div>
                  </div>
                  <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-blue-200">
                    <pre {...props}>
                      <code className={className}>{children}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <code className="bg-white/10 px-1 py-0.5 rounded text-blue-300 font-mono text-[13px]" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {displayedContent}
        </ReactMarkdown>
      </div>
      
      {/* Interactive Tool Triggers based on Intents */}
      {intents.includes("consultation") && displayedContent === safeContent && (
        <div className="mt-2 p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Calendar className="w-4 h-4" /> Schedule a Consultation
          </div>
          <p className="text-xs text-muted-foreground">It sounds like you'd benefit from a detailed discussion. Book a time with our engineers.</p>
          <Button onClick={() => setConsultModalOpen(true)} className="w-fit h-8 text-xs">Book Consultation</Button>
          <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />
        </div>
      )}

      {intents.includes("pricing") && displayedContent === safeContent && (
        <div className="mt-2 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            <FileText className="w-4 h-4" /> Request a Custom Quote
          </div>
          <p className="text-xs text-muted-foreground">Get a precise estimate for your project scope and requirements.</p>
          <Button onClick={() => setQuoteModalOpen(true)} className="w-fit h-8 text-xs bg-blue-600 hover:bg-blue-700">Request Quote</Button>
          <QuoteRequestModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} services={[]} />
        </div>
      )}

      {mode === "escalated" && displayedContent === safeContent && (
        <div className="mt-2 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Transferring to a human agent... Please hold on.
        </div>
      )}
      
      {message.type === "error" || safeContent.includes("technical difficulties") ? (
        <div className="mt-2">
           <Button variant="outline" size="sm" className="h-8 text-xs border-error/20 text-error hover:bg-error/10 hover:text-error" onClick={() => window.location.reload()}>
             <RefreshCw className="w-3 h-3 mr-2" /> Retry Connection
           </Button>
        </div>
      ) : null}

      {/* Feedback UI */}
      {displayedContent === safeContent && message.type !== "error" && !feedbackSent && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5 opacity-0 animate-in fade-in fill-mode-forwards duration-500 delay-500">
          <span className="text-[10px] text-muted-foreground mr-1">Was this helpful?</span>
          <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/10" onClick={() => handleFeedback(true)}>
            <ThumbsUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-error hover:bg-error/10" onClick={() => handleFeedback(false)}>
            <ThumbsDown className="h-3 w-3" />
          </Button>
        </div>
      )}
      {feedbackSent && (
         <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
           <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Feedback submitted
         </div>
      )}
    </div>
  );
}
