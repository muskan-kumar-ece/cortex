"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function KnowledgeCodeBlock({ 
  code, 
  language, 
  filename, 
  highlightLines = [] 
}: { 
  code: string; 
  language: string; 
  filename?: string;
  highlightLines?: number[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border-strong bg-[#1E1E1E] my-8 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D] border-b border-border-strong">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
          </div>
          {filename && (
            <span className="text-xs font-mono text-on-surface-muted/70 font-medium">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
            {language}
          </span>
          <button 
            onClick={handleCopy}
            className="text-on-surface-muted hover:text-foreground transition-colors p-1"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* Syntax Highlighting */}
      <div className="relative overflow-x-auto text-sm leading-relaxed max-h-[500px]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '14px',
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const isHighlighted = highlightLines.includes(lineNumber);
            return {
              style: {
                display: 'block',
                background: isHighlighted ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                borderLeft: isHighlighted ? '3px solid #38bdf8' : '3px solid transparent',
                paddingLeft: isHighlighted ? '0.75rem' : '0.9rem',
              }
            };
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
