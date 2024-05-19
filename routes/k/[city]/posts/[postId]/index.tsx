import { RouteContext } from "$fresh/server.ts";
import { findById } from "kv/posts.ts";
import ActionRow from "components/nav/ActionRow.tsx";
import NavIcon from "components/nav/NavIcon.tsx";
import { CircleChevronLeft, Pencil } from "lucide-preact";
import { SessionState } from "types";
import { ROUTES } from "route-utils";

export default async function MyPage(_req: Request, ctx: RouteContext<void, SessionState>) {
  const post = await findById(ctx.params.postId);
  const userId = ctx.state.userId;
  console.log(userId, "USERID");

  if (!post) return ctx.renderNotFound();

  return (
    <div class="mx-auto w-full max-w-3xl p-1">
      <h1 class="mb-1 rounded-md border p-1 text-center text-3xl uppercase">{post.title}</h1>
      <ActionRow>
        <NavIcon href="javascript:history.back()" tooltip="Back" icon={<CircleChevronLeft />} />
        <div class="grow" />
        {userId === post.userId && <NavIcon href={ROUTES.editPostPath(post.city, post.id)} icon={<Pencil />} />}
      </ActionRow>
      <div class="mt-3 px-4 font-semibold text-primary sm:px-2">{post.userName}</div>
      <div class="px-4 text-xs italic sm:px-2">{new Date(post.createdAt).toLocaleDateString()}</div>
      <p class="mt-2 p-4 sm:p-2">{post.body}</p>
    </div>
  );
}
