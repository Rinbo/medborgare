import { FreshContext, Handlers, PageProps, RouteContext } from "$fresh/server.ts";

export const handler: Handlers<string> = {
  GET(_req, ctx) {
    console.log(ctx.params.kommun);

    return ctx.render(ctx.params.kommun);
  },
};

export default function Test({ data }: PageProps) {
  return <div>Hello {decodeURIComponent(data)}</div>;
}
