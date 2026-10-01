"use client";

import type { SectionId } from "@/lib/sections";
import type { SectionLikes } from "@/lib/likes/store";
import { likeSection, unlikeSection } from "@/lib/likes/actions";
import { TikTokLike } from "./TikTokLike";

export function HeartButton({ sectionId, likes }: { sectionId: SectionId; likes: SectionLikes }) {
  return (
    <TikTokLike
      initialLiked={likes.liked}
      initialCount={likes.count}
      onCommit={(liked) => (liked ? likeSection(sectionId) : unlikeSection(sectionId))}
    />
  );
}
