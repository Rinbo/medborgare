import { Handlers } from "$fresh/server.ts";
import { FlashMessage } from "islands/ServerFlash.tsx";
import { redirect, unauthorizedResponse } from "http-utils";
import { findById } from "kv/posts.ts";
import { PersistedSessionState } from "types";
import { ROUTES } from "route-utils";
import { deleteComment } from "kv/posts.ts";
import { setServerFlash } from "session-utils";

export const handler: Handlers<{ flash?: FlashMessage }, PersistedSessionState> = {
  GET(_req, _ctx) {
    return redirect("/");
  },
  async POST(_req, ctx) {
    const commentId = ctx.params.commentId;
    const post = await findById(ctx.params.postId);

    if (!post || !commentId) return ctx.renderNotFound();

    const comment = post.comments.find((c) => c.id === commentId);
    if (comment?.userId !== ctx.state.session.userId) return unauthorizedResponse();

    const ok = await deleteComment(post, commentId);

    if (!ok) return ctx.renderNotFound();

    setServerFlash(ctx, { message: "Kommentaren raderad", status: "success" });
    return redirect(ROUTES.postPath(post.city, post.id));
  },
};
