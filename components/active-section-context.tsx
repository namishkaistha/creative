"use client";

import { createContext, useContext } from "react";

export const ActiveSectionContext = createContext<string | null>(null);

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
