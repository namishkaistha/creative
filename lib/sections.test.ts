import { test } from "node:test";
import assert from "node:assert/strict";
import { isSectionId } from "./sections";

test("accepts a known section id", () => {
  assert.equal(isSectionId("hi"), true);
});

test("rejects an unknown section id", () => {
  assert.equal(isSectionId("nope"), false);
});

test("rejects a non-string value", () => {
  assert.equal(isSectionId({ id: "hi" }), false);
});

test("rejects inherited object keys", () => {
  assert.equal(isSectionId("toString"), false);
});
