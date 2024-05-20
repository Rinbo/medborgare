import { RouteContext } from "$fresh/server.ts";
import { findById } from "kv/posts.ts";
import ActionRow from "components/nav/ActionRow.tsx";
import NavIcon from "components/nav/NavIcon.tsx";
import { CircleChevronLeft, Pencil } from "lucide-preact";
import { SessionState } from "types";
import { ROUTES } from "route-utils";
import DeleteModal from "islands/modals/DeleteModal.tsx";

export default async function ShowPost(_req: Request, ctx: RouteContext<void, SessionState>) {
  const post = await findById(ctx.params.postId);
  const userId = ctx.state.userId;

  if (!post) return ctx.renderNotFound();

  return (
    <div class="mx-auto flex w-full max-w-3xl flex-col p-1">
      <h1 class="mb-1 rounded-md border p-1 text-center text-3xl uppercase">{post.title}</h1>
      <ActionRow>
        <NavIcon href="javascript:history.back()" tooltip="Back" icon={<CircleChevronLeft />} />
        <div class="grow" />
        {userId === post.userId && (
          <>
            <NavIcon href={ROUTES.editPostPath(post.city, post.id)} icon={<Pencil />} />
            <DeleteModal action={ROUTES.deletePostPath(post.city, post.id)} resource="inlägg" />
          </>
        )}
      </ActionRow>
      <div class="mt-1 flex h-full flex-col rounded-md border">
        <div class="mt-3 px-4 font-semibold text-primary sm:px-2">{post.userName}</div>
        <div class="px-4 text-xs italic sm:px-2">{new Date(post.createdAt).toLocaleDateString()}</div>
        <p class="mt-2 whitespace-pre-line p-4 sm:p-2">{post.body}</p>
      </div>
    </div>
  );
}
