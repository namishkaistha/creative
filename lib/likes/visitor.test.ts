import { test } from "node:test";
import assert from "node:assert/strict";
import { hashVisitor, visitorIpFrom } from "./visitor.ts";

test("prefers x-real-ip", () => {
  const headers = new Headers({ "x-real-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2" });
  assert.equal(visitorIpFrom(headers), "1.1.1.1");
});

test("falls back to the first x-forwarded-for entry", () => {
  const headers = new Headers({ "x-forwarded-for": "2.2.2.2, 3.3.3.3" });
  assert.equal(visitorIpFrom(headers), "2.2.2.2");
});

test("returns null when no IP header is present", () => {
  assert.equal(visitorIpFrom(new Headers()), null);
});

test("hashes the same IP to the same value", () => {
  assert.equal(hashVisitor("1.1.1.1", "salt"), hashVisitor("1.1.1.1", "salt"));
});

test("hashes differ across salts", () => {
  assert.notEqual(hashVisitor("1.1.1.1", "a"), hashVisitor("1.1.1.1", "b"));
});

test("hash does not contain the raw IP", () => {
  assert.doesNotMatch(hashVisitor("1.1.1.1", "salt"), /1\.1\.1\.1/);
});
