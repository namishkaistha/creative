"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "./active-section-context";

type Props = {
  src: string;
  poster?: string;
  sectionId: string;
  className?: string;
};

export function VideoPlayer({ src, poster, sectionId, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = useActiveSection() === sectionId;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;
    if (shouldPlay) {
      // play() rejects on rapid swipes when a pause interrupts the pending play
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
