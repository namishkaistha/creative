import { createHmac } from "node:crypto";

export function visitorIpFrom(headers: Headers): string | null {
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  const forwardedFor = headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0].trim() || null;
}

// Stores a keyed hash rather than the raw IP so the database never holds addresses.
export function hashVisitor(ip: string, salt: string): string {
  return createHmac("sha256", salt).update(ip).digest("hex");
}
