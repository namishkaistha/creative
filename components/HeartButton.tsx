"use client";

import type { SectionId } from "@/lib/sections";
import type { SectionLikes } from "@/lib/likes/store";
import { likeSection, unlikeSection } from "@/lib/likes/actions";
import { LikeBurst } from "./interior/like-burst";

export function HeartButton({ sectionId, likes }: { sectionId: SectionId; likes: SectionLikes }) {
  return (
    <LikeBurst
      initialLiked={likes.liked}
      initialCount={likes.count}
      label="Like"
      activeLabel="Liked"
      onCommit={(liked) => (liked ? likeSection(sectionId) : unlikeSection(sectionId))}
    />
  );
}
