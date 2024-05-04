import { Handlers, RouteContext } from "$fresh/server.ts";

export const handler: Handlers<string> = {
  GET(_req, ctx) {
    return ctx.render(ctx.params.testId);
  },
};

export default function Test(req: Request, ctx: RouteContext) {
  const kommun = ctx.data;
  return <div>Hello {decodeURIComponent(kommun)}</div>;
}
