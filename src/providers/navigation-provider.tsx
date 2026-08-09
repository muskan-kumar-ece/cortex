"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationStateProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationState() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationState must be used within a NavigationStateProvider"
    );
  }
  return context;
}
