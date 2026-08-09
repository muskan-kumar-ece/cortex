"use client";

import Link from "next/link";
import { PremiumCTA } from "@/components/marketing/PremiumCTA";
import { NeonButton } from "@/components/marketing/NeonButton";

export function ServicesCta({ data }: { data: any }) {
  if (!data) return null;
  return (
    <PremiumCTA 
      headline={data.headline || "Ready to Transform?"} 
      subheadline={data.subheadline || "Book a consultation with our architecture team."}
    >
      <NeonButton render={<Link href={data.button?.href || "#consultation"} />}>
        {data.button?.title || "Get Started"}
      </NeonButton>
    </PremiumCTA>
  );
}
