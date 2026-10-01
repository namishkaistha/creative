"use client";

import { useEffect, useState } from "react";
import type { LikesSummary } from "@/lib/likes/handlers.ts";
import { loadLikesSummary, saveLike } from "@/lib/likes/client.ts";
import { LikeBurst } from "./interior/like-burst";

export function HeartButton({ sectionId }: { sectionId: string }) {
  const [summary, setSummary] = useState<LikesSummary | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadLikesSummary().then(
      (loaded) => isMounted && setSummary(loaded),
      // Showing no button beats showing a count we know is wrong.
      () => {},
    );
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="absolute top-4 right-4 z-10">
      {summary && (
        <LikeBurst
          initialLiked={summary.liked.includes(sectionId)}
          initialCount={summary.counts[sectionId] ?? 0}
          label="Like"
          activeLabel="Liked"
          onCommit={(liked, signal) => saveLike({ sectionId, liked, signal })}
        />
      )}
    </div>
  );
}
