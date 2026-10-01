import { test } from "node:test";
import assert from "node:assert/strict";
import { createLikesHandlers, type LikeStore } from "./handlers.ts";
import { hashVisitor } from "./visitor.ts";

const SALT = "test-salt";
const VISITOR_IP = "9.9.9.9";
const VISITOR = hashVisitor(VISITOR_IP, SALT);

function fakeStore(rows: Array<[string, string]> = []): LikeStore & { rows: Set<string> } {
  const rows_ = new Set(rows.map(([section, visitor]) => `${section}|${visitor}`));
  const entries = () => [...rows_].map((row) => row.split("|") as [string, string]);
  return {
    rows: rows_,
    async countsBySection() {
      const counts: Record<string, number> = {};
      for (const [section] of entries()) counts[section] = (counts[section] ?? 0) + 1;
      return counts;
    },
    async sectionsLikedBy(visitor) {
      return entries().filter(([, v]) => v === visitor).map(([section]) => section);
    },
    async addLike(section, visitor) {
      rows_.add(`${section}|${visitor}`);
    },
    async removeLike(section, visitor) {
      rows_.delete(`${section}|${visitor}`);
    },
  };
}

function request(method: string, body?: unknown, ip: string | null = VISITOR_IP) {
  const headers = new Headers({ "content-type": "application/json" });
  if (ip) headers.set("x-real-ip", ip);
  return new Request("https://site.test/api/likes", {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function handlersFor(store: LikeStore) {
  return createLikesHandlers({ store, salt: SALT, sectionIds: ["hi", "fun"] });
}

test("GET returns counts across all visitors", async () => {
  const store = fakeStore([["hi", "a"], ["hi", "b"], ["fun", "a"]]);
  const body = await (await handlersFor(store).GET(request("GET"))).json();
  assert.deepEqual(body.counts, { hi: 2, fun: 1 });
});

test("GET returns the sections this visitor liked", async () => {
  const store = fakeStore([["hi", VISITOR], ["fun", "someone-else"]]);
  const body = await (await handlersFor(store).GET(request("GET"))).json();
  assert.deepEqual(body.liked, ["hi"]);
});

test("POST stores a like under the hashed IP", async () => {
  const store = fakeStore();
  await handlersFor(store).POST(request("POST", { sectionId: "hi" }));
  assert.ok(store.rows.has(`hi|${VISITOR}`));
});

test("POST twice from the same IP keeps one like", async () => {
  const store = fakeStore();
  const { POST } = handlersFor(store);
  await POST(request("POST", { sectionId: "hi" }));
  await POST(request("POST", { sectionId: "hi" }));
  assert.equal(store.rows.size, 1);
});

test("DELETE removes only this visitor's like", async () => {
  const store = fakeStore([["hi", VISITOR], ["hi", "someone-else"]]);
  await handlersFor(store).DELETE(request("DELETE", { sectionId: "hi" }));
  assert.deepEqual([...store.rows], ["hi|someone-else"]);
});

test("rejects an unknown section", async () => {
  const response = await handlersFor(fakeStore()).POST(request("POST", { sectionId: "nope" }));
  assert.equal(response.status, 400);
});

test("rejects a malformed body", async () => {
  const response = await handlersFor(fakeStore()).POST(request("POST", "not-an-object"));
  assert.equal(response.status, 400);
});

test("rejects a write with no visitor IP", async () => {
  const response = await handlersFor(fakeStore()).POST(request("POST", { sectionId: "hi" }, null));
  assert.equal(response.status, 400);
});
