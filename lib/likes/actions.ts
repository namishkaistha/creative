"use server";

import { isSectionId, type SectionId } from "@/lib/sections";
import { currentVisitor } from "./current-visitor";
import { addLike, removeLike } from "./store";

// Next rejects cross-origin calls to Server Actions, but any same-origin POST can
// still reach them with arbitrary arguments, so the section id is untrusted.
export async function likeSection(sectionId: SectionId) {
  assertSectionId(sectionId);
  await addLike(sectionId, await requireVisitor());
}

export async function unlikeSection(sectionId: SectionId) {
  assertSectionId(sectionId);
  await removeLike(sectionId, await requireVisitor());
}

function assertSectionId(value: unknown): asserts value is SectionId {
  if (!isSectionId(value)) throw new Error("unknown section");
}

async function requireVisitor() {
  const visitor = await currentVisitor();
  if (!visitor) throw new Error("visitor IP unavailable");
  return visitor;
}
