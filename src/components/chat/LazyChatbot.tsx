"use client";

import dynamic from "next/dynamic";

const DynamicChatbotRoot = dynamic(
  () => import("./ChatbotRoot").then((mod) => mod.ChatbotRoot),
  { ssr: false }
);

export function LazyChatbot() {
  return <DynamicChatbotRoot />;
}
