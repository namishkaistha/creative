import { hashVisitor, visitorIpFrom } from "./visitor.ts";

export type LikeStore = {
  countsBySection(): Promise<Record<string, number>>;
  sectionsLikedBy(visitor: string): Promise<string[]>;
  addLike(sectionId: string, visitor: string): Promise<void>;
  removeLike(sectionId: string, visitor: string): Promise<void>;
};

export type LikesSummary = {
  counts: Record<string, number>;
  liked: string[];
};

type LikesConfig = {
  store: LikeStore;
  salt: string;
  sectionIds: readonly string[];
};

export function createLikesHandlers({ store, salt, sectionIds }: LikesConfig) {
  function visitorFrom(request: Request) {
    const ip = visitorIpFrom(request.headers);
    return ip ? hashVisitor(ip, salt) : null;
  }

  async function sectionIdFrom(request: Request) {
    const body: unknown = await request.json().catch(() => null);
    const sectionId = (body as { sectionId?: unknown } | null)?.sectionId;
    return typeof sectionId === "string" && sectionIds.includes(sectionId)
      ? sectionId
      : null;
  }

  function writeHandler(write: (sectionId: string, visitor: string) => Promise<void>) {
    return async (request: Request) => {
      const visitor = visitorFrom(request);
      const sectionId = await sectionIdFrom(request);
      if (!visitor || !sectionId) {
        return Response.json({ error: "invalid like request" }, { status: 400 });
      }
      await write(sectionId, visitor);
      return new Response(null, { status: 204 });
    };
  }

  return {
    async GET(request: Request) {
      const visitor = visitorFrom(request);
      const [counts, liked] = await Promise.all([
        store.countsBySection(),
        visitor ? store.sectionsLikedBy(visitor) : Promise.resolve([]),
      ]);
      const summary: LikesSummary = { counts, liked };
      return Response.json(summary, { headers: { "cache-control": "no-store" } });
    },
    POST: writeHandler((sectionId, visitor) => store.addLike(sectionId, visitor)),
    DELETE: writeHandler((sectionId, visitor) => store.removeLike(sectionId, visitor)),
  };
}
