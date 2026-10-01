import { headers } from "next/headers";
import { requiredEnv } from "./env";
import { hashVisitor, visitorIpFrom } from "./visitor";

export async function currentVisitor(): Promise<string | null> {
  const ip = visitorIpFrom(await headers());
  return ip ? hashVisitor(ip, requiredEnv("LIKES_SALT")) : null;
}
