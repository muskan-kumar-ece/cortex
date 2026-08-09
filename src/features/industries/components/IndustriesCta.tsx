"use client";

import Link from "next/link";

import { PremiumCTA } from "@/components/marketing/PremiumCTA";
import { NeonButton } from "@/components/marketing/NeonButton";

export function IndustriesCta({ data }: { data: any }) {
  return (
    <PremiumCTA 
      headline={data.headline} 
      subheadline={data.subheadline}
    >
      <NeonButton render={<Link href={data.button?.href || "#consultation"} />}>
        {data.button?.title || "Get Started"}
      </NeonButton>
    </PremiumCTA>
  );
}

