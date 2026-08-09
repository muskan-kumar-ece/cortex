"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

export function KnowledgeFeedback() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  if (feedback) {
    return (
      <div className="py-6 flex items-center justify-between border-b border-border">
        <span className="text-sm font-semibold text-foreground">
          Was this article helpful?
        </span>
        <div className="flex items-center gap-2 text-sm text-success bg-success/10 border border-success/20 px-4 py-2 rounded-full font-medium">
          <CheckCircle2 className="w-4 h-4" />
          Thank you for your feedback!
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 flex items-center justify-between border-b border-border">
      <span className="text-sm font-semibold text-foreground">
        Was this article helpful?
      </span>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setFeedback("up")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:text-primary transition-colors text-sm font-medium text-on-surface-muted"
        >
          <ThumbsUp className="w-4 h-4" />
          Yes
        </button>
        <button 
          onClick={() => setFeedback("down")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:text-error transition-colors text-sm font-medium text-on-surface-muted"
        >
          <ThumbsDown className="w-4 h-4" />
          No
        </button>
      </div>
    </div>
  );
}
