"use client";

import Link from "next/link";

import { PremiumCTA } from "@/components/marketing/PremiumCTA";
import { NeonButton } from "@/components/marketing/NeonButton";

export function PortfolioCta({ data }: { data: any }) {
  return (
    <PremiumCTA 
      headline={data.headline} 
      subheadline={data.subheadline}
    >
      <NeonButton render={<Link href={data.button?.href || "/portfolio"} />}>
        {data.button?.title || "View Portfolio"}
      </NeonButton>
    </PremiumCTA>
  );
}

