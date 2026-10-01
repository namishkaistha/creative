"use client";

import { useSyncExternalStore } from "react";
import { LikeBurst } from "./interior/like-burst";

const STORAGE_PREFIX = "hearts:";

export function HeartButton({ sectionId }: { sectionId: string }) {
  const initialLiked = useSyncExternalStore(
    noopSubscribe,
    () => (parseInt(readStored(sectionId) ?? "", 10) || 0) > 0,
    () => null,
  );

  return (
    <div className="absolute top-4 right-4 z-10">
      {initialLiked !== null && (
        <LikeBurst
          initialLiked={initialLiked}
          initialCount={initialLiked ? 1 : 0}
          label="Like"
          activeLabel="Liked"
          onToggle={(liked) => writeStored(sectionId, liked)}
        />
      )}
    </div>
  );
}

// LikeBurst owns the liked state after mount, so storage is only read once.
function noopSubscribe() {
  return () => {};
}

function readStored(sectionId: string) {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + sectionId);
  } catch {
    return null;
  }
}

function writeStored(sectionId: string, liked: boolean) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + sectionId, liked ? "1" : "0");
  } catch {
    // Storage unavailable (private mode); the like still shows for this visit.
  }
}
