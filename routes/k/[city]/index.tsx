import { RouteContext } from "$fresh/server.ts";
import { findByCity, Post } from "kv/posts.ts";
import { OptionalSessionState } from "types";
import { ROUTES } from "route-utils";
import NavIcon from "components/nav/NavIcon.tsx";
import { CircleChevronLeft, CirclePlus } from "lucide-preact";
import ActionRow from "components/nav/ActionRow.tsx";

export default async function City(_req: Request, ctx: RouteContext<void, OptionalSessionState>) {
  const city = decodeURIComponent(ctx.params.city);
  const posts: Post[] = await findByCity(city);
  const state = ctx.state;

  return (
    <div class="mx-auto w-full max-w-3xl p-1">
      <h1 class="mb-1 rounded-lg border p-2 text-center font-mono text-4xl font-semibold uppercase">
        {city}
      </h1>
      <ActionRow>
        <NavIcon href="javascript:history.back()" tooltip="Back" icon={<CircleChevronLeft />} />
        <div class="grow" />
        {state?.sessionId && <NavIcon href={ROUTES.newPost(city)} tooltip="New Post" icon={<CirclePlus />} />}
      </ActionRow>
      {posts.map((post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
}

function PostPreview({ post }: { post: Post }) {
  return (
    <a href={ROUTES.post(post.id)}>
      <div class="my-2 rounded-xl border p-4 hover:bg-base-200">
        <h5 class="upp mb-2 text-2xl font-bold tracking-tight">{post.title}</h5>
        <p class="mb-1 text-xs font-normal">
          <span class="font-semibold text-primary">{post.userName}</span>
        </p>
        <p class="mb-2 truncate font-light">
          {post.body}
        </p>
        <p class="text-xs italic text-neutral-content">
          Posted on {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </a>
  );
}
