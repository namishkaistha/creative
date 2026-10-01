"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { useDoubleTap } from "./DoubleTapToLike";
import { HEART_PATH } from "./heart-path";
import { useOptimisticLike, type LikeCommit } from "./interior/like-burst";

const POP: Transition = { duration: 0.45, times: [0, 0.35, 0.7, 1], ease: "easeOut" };
const SETTLE: Transition = { duration: 0.2, ease: "easeOut" };
const INSTANT: Transition = { duration: 0 };

const BURST_DOTS = 8;
const BURST_RADIUS = 30;
const DOTS = Array.from({ length: BURST_DOTS }, (_, i) => {
  const angle = (i / BURST_DOTS) * Math.PI * 2;
  return { x: Math.cos(angle) * BURST_RADIUS, y: Math.sin(angle) * BURST_RADIUS };
});

const formatCount = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
}).format;

type Props = {
  initialLiked: boolean;
  initialCount: number;
  onCommit: LikeCommit;
};

export function TikTokLike({ initialLiked, initialCount, onCommit }: Props) {
  const reduced = useReducedMotion();
  const { liked, count, pending, burst, settled, toggle } = useOptimisticLike({
    initialLiked,
    initialCount,
    onCommit,
  });

  // Double-tapping only ever likes, never unlikes, matching TikTok.
  useDoubleTap(
    useCallback(() => {
      if (!liked) toggle();
    }, [liked, toggle]),
  );

  return (
    <>
      <button
        type="button"
        aria-pressed={liked}
        aria-busy={pending}
        aria-label="Like"
        onClick={toggle}
        style={{ touchAction: "manipulation" }}
        className="flex select-none flex-col items-center gap-1 rounded-lg text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <span aria-hidden className="relative grid size-12 place-items-center">
          <motion.svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-10 drop-shadow-[0_2px_4px_rgb(0_0_0/0.45)] transition-colors duration-150 ${
              liked ? "text-accent" : "text-white"
            }`}
            initial={false}
            animate={{ scale: liked ? [1, 0.6, 1.25, 1] : [1, 0.85, 1] }}
            transition={reduced ? INSTANT : liked ? POP : SETTLE}
          >
            <path d={HEART_PATH} />
          </motion.svg>

          {!reduced && burst > 0 ? (
            <span key={burst} className="pointer-events-none absolute left-1/2 top-1/2 size-0">
              {DOTS.map((dot, i) => (
                <motion.span
                  key={i}
                  className="absolute -top-1 -left-1 block size-2 rounded-full bg-accent"
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: dot.x, y: dot.y, scale: [1, 1, 0.3], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                />
              ))}
            </span>
          ) : null}
        </span>

        <span
          aria-hidden
          className="text-[13px] font-semibold tabular-nums [text-shadow:0_1px_3px_rgb(0_0_0/0.6)]"
        >
          {formatCount(count)}
        </span>
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {`${settled.count} likes, ${settled.liked ? "liked" : "not liked"}`}
      </span>
    </>
  );
}
