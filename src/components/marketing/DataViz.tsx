"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STATIC_DATA_STREAMS = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  duration: 4 + (i % 5),
  delay: (i % 10) * 0.2,
  text: `0x${(i * 1337).toString(16).padStart(8, '0')} CORTEX_NODE_CLUSTER_${i} SYNC_OK LATENCY_${10 + (i % 8)}ms `.repeat(4),
}));

export function DataStreamGrid({ className = "" }: { className?: string }) {
  const [items] = useState(STATIC_DATA_STREAMS);

  return (
    <div className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}>
      <div className="w-full h-full font-mono text-[8px] leading-[8px] overflow-hidden whitespace-pre text-white select-none opacity-30">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BlueprintGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:8px_8px]" />
    </div>
  );
}

export function FloatingNodes({ count = 5, color = "rgba(124,58,237,0.5)", className = "" }: { count?: number, color?: string, className?: string }) {
  const [nodes] = useState(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: `${3 + (i % 3)}px`,
      left: `${(i * 19 + 7) % 95}%`,
      top: `${(i * 23 + 11) % 95}%`,
      yEnd: -100 - (i % 50),
      duration: 12 + (i % 8),
      delay: (i % 5) * 1.5,
    }))
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full blur-[2px]"
          style={{
            width: node.size,
            height: node.size,
            backgroundColor: color,
            left: node.left,
            top: node.top,
          }}
          animate={{
            y: [0, node.yEnd],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "linear",
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
}

export function WorkflowDiagram({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wd-line-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
          <stop offset="50%" stopColor="rgba(124,58,237,0.5)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0.3)" />
        </linearGradient>
      </defs>
      
      <path d="M 0 200 C 300 200 400 400 1000 400" stroke="url(#wd-line-grad)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <path d="M 0 300 C 400 300 500 100 1000 100" stroke="url(#wd-line-grad)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
      <path d="M 0 400 C 200 400 300 300 1000 300" stroke="url(#wd-line-grad)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
    </svg>
  );
}
