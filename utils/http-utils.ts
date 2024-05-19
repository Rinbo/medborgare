import { Handlers } from "$fresh/server.ts";
import { getSession } from "session-utils";

export function getSearchParams(
  req: Request,
  name: string,
): string | null {
  const url = new URL(req.url);
  return url.searchParams.get(name);
}

export function json(body: object, status: number, optionalHeaders?: object) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...optionalHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

export function redirect(path: string, optionalHeaders?: object): Response {
  return new Response(null, {
    status: 303,
    headers: { ...optionalHeaders, Location: encodeURI(path) },
  });
}

export function withAuth(handler: Handlers): Handlers {
  return {
    async GET(req, ctx) {
      const sessionOption = await getSession(req);
      if (sessionOption.isEmpty()) return unauthorizedResponse("/login");
      ctx.state.session = sessionOption.get();
      return handler.GET ? handler.GET(req, ctx) : new Response(null, { status: 405 });
    },
    async POST(req, ctx) {
      const sessionOption = await getSession(req);
      if (sessionOption.isEmpty()) unauthorizedResponse("/login");
      ctx.state.session = sessionOption.get();
      return handler.POST ? handler.POST(req, ctx) : new Response(null, { status: 405 });
    },
  };
}

export const unauthorizedResponse = (redirect?: string) =>
  new Response("Unauthorized", { status: 303, headers: { Location: redirect ?? "/" } });
