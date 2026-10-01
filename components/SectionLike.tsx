import type { SectionId } from "@/lib/sections";
import type { SectionLikes } from "@/lib/likes/store";
import { loadLikesSummary } from "@/lib/likes/summary";
import { HeartButton } from "./HeartButton";

const NO_LIKES: SectionLikes = { count: 0, liked: false };

export async function SectionLike({ sectionId }: { sectionId: SectionId }) {
  const summary = await loadLikesSummary();
  if (!summary) return null;
  return <HeartButton sectionId={sectionId} likes={summary.get(sectionId) ?? NO_LIKES} />;
}
