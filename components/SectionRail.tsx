"use client";

import { useActiveSection } from "./active-section-context";

type Pip = { id: string; label: string };

export function SectionRail({ pips }: { pips: readonly Pip[] }) {
  const active = useActiveSection();
  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed inset-y-0 right-3 z-20 hidden items-center sm:flex"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {pips.map((pip, index) => (
          <RailPip
            key={pip.id}
            pip={pip}
            index={index}
            isActive={active === pip.id}
          />
        ))}
      </ul>
    </nav>
  );
}

function RailPip({
  pip,
  index,
  isActive,
}: {
  pip: Pip;
  index: number;
  isActive: boolean;
}) {
  return (
    <li>
      <a
        href={`#${pip.id}`}
        aria-label={pip.label}
        aria-current={isActive ? "location" : undefined}
        className="group flex items-center gap-2"
      >
        <span
          className={`font-mono text-[10px] tabular-nums transition-colors ${
            isActive ? "text-ink" : "text-ink-mute group-hover:text-ink-dim"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`block h-6 w-[2px] rounded-full transition-all duration-300 ${
            isActive
              ? "bg-accent shadow-[0_0_10px_var(--color-accent)]"
              : "bg-rail group-hover:bg-rail-strong"
          }`}
        />
      </a>
    </li>
  );
}
