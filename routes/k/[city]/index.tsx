import { RouteContext } from "$fresh/server.ts";
import { findByCity, Post } from "kv/posts.ts";
import { OptionalSessionState } from "types";
import { ROUTES } from "route-utils";
import NavIcon from "components/nav/NavIcon.tsx";
import { CircleChevronLeft, CirclePlus } from "lucide-preact";
import ActionRow from "components/nav/ActionRow.tsx";
import PostList from "islands/PostList.tsx";

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
        {state?.sessionId && <NavIcon href={ROUTES.newPostPath(city)} tooltip="New Post" icon={<CirclePlus />} />}
      </ActionRow>
      <PostList initialPosts={posts} />
    </div>
  );
}
