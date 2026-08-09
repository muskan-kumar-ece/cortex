"use client";

import { useState } from "react";
import { Link2, MessageCircle, Briefcase, Check } from "lucide-react";

export function KnowledgeShare({ title, url = "" }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  
  // Try to use window location if url is empty and we're on client
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : "");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="py-6 border-y border-border flex items-center justify-between">
      <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
        Share this article
      </span>
      <div className="flex items-center gap-2">
        <button 
          onClick={shareTwitter}
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors"
          aria-label="Share on Twitter"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button 
          onClick={shareLinkedin}
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Briefcase className="w-4 h-4" />
        </button>
        <button 
          onClick={copyToClipboard}
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-success" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
