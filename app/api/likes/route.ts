import { createLikesHandlers } from "@/lib/likes/handlers.ts";
import { createNeonLikeStore } from "@/lib/likes/neon-store.ts";
import { LIKEABLE_SECTION_IDS } from "@/lib/likes/sections.ts";

export async function GET(request: Request) {
  return likesHandlers().GET(request);
}

export async function POST(request: Request) {
  return likesHandlers().POST(request);
}

export async function DELETE(request: Request) {
  return likesHandlers().DELETE(request);
}

// Built per request so a missing env var fails the request, not the build.
function likesHandlers() {
  return createLikesHandlers({
    store: createNeonLikeStore(requiredEnv("DATABASE_URL")),
    salt: requiredEnv("LIKES_SALT"),
    sectionIds: LIKEABLE_SECTION_IDS,
  });
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
