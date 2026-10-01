import { neon } from "@neondatabase/serverless";
import type { SectionId } from "@/lib/sections";
import { requiredEnv } from "./env";

export type SectionLikes = { count: number; liked: boolean };
export type LikesSummary = Map<string, SectionLikes>;

export async function summaryFor(visitor: string | null): Promise<LikesSummary> {
  const rows = await sql()`
    SELECT section_id, count(*)::int AS count, bool_or(visitor_hash = ${visitor}) AS liked
    FROM likes GROUP BY section_id`;
  return new Map(
    rows.map((row) => [row.section_id, { count: row.count, liked: row.liked === true }]),
  );
}

export async function addLike(sectionId: SectionId, visitor: string) {
  await sql()`
    INSERT INTO likes (section_id, visitor_hash) VALUES (${sectionId}, ${visitor})
    ON CONFLICT DO NOTHING`;
}

export async function removeLike(sectionId: SectionId, visitor: string) {
  await sql()`
    DELETE FROM likes WHERE section_id = ${sectionId} AND visitor_hash = ${visitor}`;
}

function sql() {
  return neon(requiredEnv("DATABASE_URL"));
}
