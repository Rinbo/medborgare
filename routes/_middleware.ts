import { FreshContext } from "$fresh/server.ts";
import { getCookieSession, getSession } from "session-utils";
import { unauthorizedResponse } from "http-utils";
import { isMutatingMethod, isMutatingRoute, ROUTES } from "route-utils";

export async function handler(req: Request, ctx: FreshContext) {
  if (ctx.destination !== "route" || ctx.url.pathname === ROUTES.login) return ctx.next();

  getCookieSession(req).ifPresent((sessionState) => ctx.state = sessionState);

  if (isMutatingRoute(ctx.url.pathname) || isMutatingMethod(req.method)) {
    const sessionOption = await getSession(req);
    if (sessionOption.isEmpty()) return unauthorizedResponse("/login");
    ctx.state.session = sessionOption.get();
  }

  return ctx.next();
}
