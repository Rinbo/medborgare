import { FreshContext } from "$fresh/server.ts";
import { getCookieSession } from "session-utils";

export function handler(req: Request, ctx: FreshContext) {
  if (ctx.destination !== "route") return ctx.next();

  getCookieSession(req).ifPresent((sessionState) => ctx.state = sessionState);
  // if mutating method also look up session in db

  return ctx.next();
}
