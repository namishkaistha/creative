import type { LikesSummary } from "./handlers.ts";

const LIKES_ENDPOINT = "/api/likes";

type SaveLikeRequest = {
  sectionId: string;
  liked: boolean;
  signal: AbortSignal;
};

// One request serves every section's button; the buttons own their state after mount.
let summaryRequest: Promise<LikesSummary> | null = null;

export function loadLikesSummary(): Promise<LikesSummary> {
  summaryRequest ??= fetch(LIKES_ENDPOINT).then(async (response) => {
    if (!response.ok) throw new Error(`likes summary failed: ${response.status}`);
    return (await response.json()) as LikesSummary;
  });
  summaryRequest.catch(() => {
    summaryRequest = null;
  });
  return summaryRequest;
}

export async function saveLike({ sectionId, liked, signal }: SaveLikeRequest) {
  const response = await fetch(LIKES_ENDPOINT, {
    method: liked ? "POST" : "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sectionId }),
    signal,
  });
  if (!response.ok) throw new Error(`saving like failed: ${response.status}`);
}
