import * as React from "react";
import { getMainNavigation, getCompanyProfile } from "@/services/cms/navigation.service";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  // Fetch live data from the CMS backend
  const [mainNav, profile] = await Promise.all([
    getMainNavigation(),
    getCompanyProfile(),
  ]);

  return <HeaderClient mainNav={mainNav} profile={profile} />;
}
