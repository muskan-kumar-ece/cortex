"use client";

import { useEffect, useState } from "react";

export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
}

const STORAGE_KEY = "b10_marketing_attribution";

export function useMarketingAttribution() {
  const [attribution, setAttribution] = useState<AttributionData>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landing_page: "",
    referrer: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load existing attribution from session storage
    let storedAttribution: Partial<AttributionData> = {};
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        storedAttribution = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse stored attribution", e);
    }

    const urlParams = new URLSearchParams(window.location.search);
    
    // Only update if we have new UTMs or it's the first visit
    const hasNewUtms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].some(
      key => urlParams.has(key)
    );

    if (hasNewUtms || !storedAttribution.landing_page) {
      const newAttribution: AttributionData = {
        utm_source: urlParams.get("utm_source") || storedAttribution.utm_source || "",
        utm_medium: urlParams.get("utm_medium") || storedAttribution.utm_medium || "",
        utm_campaign: urlParams.get("utm_campaign") || storedAttribution.utm_campaign || "",
        utm_term: urlParams.get("utm_term") || storedAttribution.utm_term || "",
        utm_content: urlParams.get("utm_content") || storedAttribution.utm_content || "",
        landing_page: storedAttribution.landing_page || window.location.href.split("?")[0],
        referrer: storedAttribution.referrer || document.referrer || "",
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAttribution));
      setAttribution(newAttribution);
    } else {
      setAttribution(storedAttribution as AttributionData);
    }
  }, []);

  return attribution;
}
