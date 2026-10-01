import { neon } from "@neondatabase/serverless";
import type { LikeStore } from "./handlers.ts";

export function createNeonLikeStore(databaseUrl: string): LikeStore {
  const sql = neon(databaseUrl);
  return {
    async countsBySection() {
      const rows = await sql`
        SELECT section_id, count(*)::int AS count FROM likes GROUP BY section_id`;
      return Object.fromEntries(rows.map((row) => [row.section_id, row.count]));
    },
    async sectionsLikedBy(visitor) {
      const rows = await sql`
        SELECT section_id FROM likes WHERE visitor_hash = ${visitor}`;
      return rows.map((row) => row.section_id as string);
    },
    async addLike(sectionId, visitor) {
      await sql`
        INSERT INTO likes (section_id, visitor_hash) VALUES (${sectionId}, ${visitor})
        ON CONFLICT DO NOTHING`;
    },
    async removeLike(sectionId, visitor) {
      await sql`
        DELETE FROM likes WHERE section_id = ${sectionId} AND visitor_hash = ${visitor}`;
    },
  };
}
