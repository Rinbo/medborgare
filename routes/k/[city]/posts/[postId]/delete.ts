import { Handlers } from "$fresh/server.ts";
import { findById } from "kv/posts.ts";
import { PersistedSessionState } from "types";
import { redirect, unauthorizedResponse } from "http-utils";
import { deletePost } from "kv/posts.ts";
import { flash } from "misc-utils";
import { FlashMessage } from "islands/ServerFlash.tsx";
import { ROUTES } from "route-utils";

export const handler: Handlers<{ flash?: FlashMessage }, PersistedSessionState> = {
  GET(_req, _ctx) {
    return redirect("/");
  },
  async POST(_req, ctx) {
    const post = await findById(ctx.params.postId);
    if (!post) return ctx.renderNotFound();

    if (post.userId !== ctx.state.session.userId) return unauthorizedResponse();

    await deletePost(post);
    ctx.data = flash("Inlägg raderat");

    return redirect(ROUTES.cityPath(post.city));
  },
};
