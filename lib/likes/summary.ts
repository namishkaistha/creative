import { cache } from "react";
import { currentVisitor } from "./current-visitor";
import { summaryFor, type LikesSummary } from "./store";

// Cached per request so every section's like button shares one query.
export const loadLikesSummary = cache(async (): Promise<LikesSummary | null> => {
  const visitor = await currentVisitor();
  try {
    return await summaryFor(visitor);
  } catch (error) {
    console.error("Likes unavailable; hiding like buttons", error);
    return null;
  }
});
