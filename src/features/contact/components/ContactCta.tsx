"use client";

import Link from "next/link";
import { ContactCtaData } from "@/config/contact.types";
import { PremiumCTA } from "@/components/marketing/PremiumCTA";
import { NeonButton } from "@/components/marketing/NeonButton";

export function ContactCta({ data }: { data: ContactCtaData }) {
  if (!data) return null; // Safe fallback if data isn't passed

  return (
    <PremiumCTA 
      headline={data.headline} 
      subheadline={data.subheadline}
    >
      <NeonButton render={<Link href={data.button.href} />}>
        {data.button.title}
      </NeonButton>
    </PremiumCTA>
  );
}
