import { RouteContext } from "$fresh/server.ts";
import { Post } from "kv/posts.ts";

export default async function MyPage(req: Request, ctx: RouteContext) {
  const posts: Post[] = JSON.parse(await Deno.readTextFile("./static/posts.json"));
  const post = posts.find((p) => p.id === ctx.params.id);

  if (!post) return ctx.renderNotFound();

  return (
    <div class="mx-auto w-full max-w-lg p-2">
      <h1 class="mb-2 text-center text-2xl uppercase">{post.title}</h1>
      <div class="font-semibold text-primary">{post.userName}</div>
      <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
      <p class="mt-2">{post.body}</p>
    </div>
  );
}
