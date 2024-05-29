import { RouteContext } from "$fresh/server.ts";
import { findById } from "kv/posts.ts";
import ActionRow from "components/nav/ActionRow.tsx";
import NavIcon from "components/nav/NavIcon.tsx";
import { CircleChevronLeft, Pencil } from "lucide-preact";
import { SessionState } from "types";
import { ROUTES } from "route-utils";
import DeleteModal from "islands/modals/DeleteModal.tsx";
import { Fragment } from "preact";
import PostIsland from "islands/PostIsland.tsx";

export default async function ShowPost(_req: Request, ctx: RouteContext<void, SessionState>) {
  const post = await findById(ctx.params.postId);
  const userId = ctx.state.userId;
  const isLoggedIn = !!userId;

  if (!post) return ctx.renderNotFound();

  return (
    <div class="mx-auto flex w-full max-w-3xl flex-col gap-1 p-1">
      <h1 class="rounded-md border p-1 text-center text-3xl uppercase">{post.title}</h1>
      <ActionRow>
        <NavIcon href="javascript:history.back()" tooltip="Back" icon={<CircleChevronLeft />} />
        <div class="grow" />
        {userId === post.userId && (
          <Fragment>
            <NavIcon href={ROUTES.editPostPath(post.city, post.id)} icon={<Pencil />} />
            <DeleteModal action={ROUTES.deletePostPath(post.city, post.id)} resource="inlägg" />
          </Fragment>
        )}
      </ActionRow>
      <PostIsland post={post} userId={userId} isLoggedIn={isLoggedIn} />
    </div>
  );
}
