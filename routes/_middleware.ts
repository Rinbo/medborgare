import { FreshContext } from "$fresh/server.ts";
import { getCookieSession, getSession } from "session-utils";
import { unauthorizedResponse } from "http-utils";
import { isMutatingRoute } from "route-utils";

export async function handler(req: Request, ctx: FreshContext) {
  if (ctx.destination !== "route") return ctx.next();

  getCookieSession(req).ifPresent((sessionState) => ctx.state = sessionState);

  if (isMutatingRoute(ctx.url.pathname)) {
    const sessionOption = await getSession(req);
    if (sessionOption.isEmpty()) return unauthorizedResponse("/login");
    ctx.state.session = sessionOption.get();
  }

  return ctx.next();
}
