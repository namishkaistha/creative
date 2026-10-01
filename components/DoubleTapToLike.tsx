"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { HEART_PATH } from "./heart-path";

const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_SLOP_PX = 40;
const HEART_SIZE_PX = 96;
const HEART_MAX_TILT_DEG = 20;
const INTERACTIVE = "a, button, input, textarea, select, label, [role=button]";

const POP_AND_FLOAT: Transition = { duration: 0.9, times: [0, 0.2, 0.35, 1], ease: "easeOut" };
const FADE: Transition = { duration: 0.9, ease: "easeOut" };

type DoubleTapListener = () => void;
type Subscribe = (listener: DoubleTapListener) => () => void;
type Tap = { time: number; x: number; y: number };
type FloatingHeart = Tap & { id: number; tilt: number };

const DoubleTapContext = createContext<Subscribe>(() => () => {});

// Lets the section's like control react to a double-tap anywhere in the section,
// TikTok-style. Hearts only appear once a like control has subscribed, so nothing
// shows while likes are still streaming in or unavailable.
export function DoubleTapToLike({ children }: { children: ReactNode }) {
  const listeners = useRef(new Set<DoubleTapListener>());
  const lastTap = useRef<Tap | null>(null);
  const nextHeartId = useRef(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const subscribe = useCallback<Subscribe>((listener) => {
    listeners.current.add(listener);
    return () => listeners.current.delete(listener);
  }, []);

  function handlePointerUp(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || isInteractive(event.target)) return;
    const tap = { time: event.timeStamp, x: event.clientX, y: event.clientY };
    const isDoubleTap = lastTap.current !== null && isSecondTap(lastTap.current, tap);
    lastTap.current = tap;
    if (!isDoubleTap || listeners.current.size === 0) return;

    listeners.current.forEach((listener) => listener());
    const tilt = (Math.random() * 2 - 1) * HEART_MAX_TILT_DEG;
    setHearts((current) => [...current, { ...tap, id: nextHeartId.current++, tilt }]);
  }

  return (
    <DoubleTapContext.Provider value={subscribe}>
      <div className="contents" onPointerUp={handlePointerUp} onMouseDown={preventWordSelection}>
        {children}
        {hearts.map((heart) => (
          <BigHeart
            key={heart.id}
            heart={heart}
            onDone={() => setHearts((current) => current.filter((h) => h.id !== heart.id))}
          />
        ))}
      </div>
    </DoubleTapContext.Provider>
  );
}

export function useDoubleTap(listener: DoubleTapListener) {
  const subscribe = useContext(DoubleTapContext);
  useEffect(() => subscribe(listener), [subscribe, listener]);
}

function BigHeart({ heart, onDone }: { heart: FloatingHeart; onDone: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className="pointer-events-none fixed z-30 text-accent drop-shadow-[0_4px_12px_rgb(0_0_0/0.35)]"
      style={{
        left: heart.x - HEART_SIZE_PX / 2,
        top: heart.y - HEART_SIZE_PX / 2,
        width: HEART_SIZE_PX,
        height: HEART_SIZE_PX,
        rotate: heart.tilt,
      }}
      initial={{ scale: 0, opacity: 1, y: 0 }}
      animate={
        reduced
          ? { scale: 1, opacity: [1, 0] }
          : { scale: [0, 1.25, 1, 1], opacity: [1, 1, 1, 0], y: [0, 0, 0, -80] }
      }
      transition={reduced ? FADE : POP_AND_FLOAT}
      onAnimationComplete={onDone}
    >
      <path d={HEART_PATH} />
    </motion.svg>
  );
}

function isSecondTap(previous: Tap, tap: Tap) {
  return (
    tap.time - previous.time <= DOUBLE_TAP_MS &&
    Math.hypot(tap.x - previous.x, tap.y - previous.y) <= DOUBLE_TAP_SLOP_PX
  );
}

function isInteractive(target: EventTarget) {
  return target instanceof Element && target.closest(INTERACTIVE) !== null;
}

function preventWordSelection(event: MouseEvent) {
  if (event.detail > 1 && !isInteractive(event.target)) event.preventDefault();
}
