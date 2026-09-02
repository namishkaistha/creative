"use client";

import { useEffect, useRef, useState } from "react";
import { ActiveSectionContext } from "./active-section-context";

export function SnapContainer({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target.id) setActive(mostVisible.target.id);
      },
      { root, threshold: [0.5, 0.75, 1] },
    );

    const sections = root.querySelectorAll<HTMLElement>("[data-section]");
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider value={active}>
      <div
        ref={scrollRef}
        className="h-[100dvh] w-screen overflow-y-scroll snap-y snap-mandatory bg-bg"
      >
        {children}
      </div>
    </ActiveSectionContext.Provider>
  );
}
