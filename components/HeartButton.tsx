"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "hearts:";

type FloatingHeart = { id: number };

export function HeartButton({ sectionId }: { sectionId: string }) {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [floaters, setFloaters] = useState<FloatingHeart[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_PREFIX + sectionId);
    if (stored) setCount(parseInt(stored, 10) || 0);
  }, [sectionId]);

  function addHeart() {
    const next = count + 1;
    setCount(next);
    window.localStorage.setItem(STORAGE_PREFIX + sectionId, String(next));
    const id = nextId.current++;
    setFloaters((current) => [...current, { id }]);
    window.setTimeout(() => {
      setFloaters((current) => current.filter((f) => f.id !== id));
    }, 1200);
  }

  return (
    <div className="pointer-events-none absolute top-5 right-4 z-10 flex items-center gap-2">
      <button
        type="button"
        aria-label="Leave a heart on this section"
        onClick={addHeart}
        className="pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full border border-rail bg-black/40 text-ink transition-transform hover:scale-110 active:scale-95"
      >
        <HeartIcon filled={count > 0} />
        {floaters.map((floater) => (
          <HeartIcon key={floater.id} filled floating />
        ))}
      </button>
      <span
        className="font-mono text-[11px] tabular-nums text-ink-dim"
        aria-live="polite"
      >
        {mounted ? count : 0}
      </span>
    </div>
  );
}

function HeartIcon({
  filled,
  floating,
}: {
  filled: boolean;
  floating?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 transition-colors ${
        filled ? "fill-accent text-accent" : "fill-none text-ink"
      } ${
        floating
          ? "pointer-events-none absolute animate-[heart-rise_1.2s_ease-out_forwards]"
          : ""
      }`}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
