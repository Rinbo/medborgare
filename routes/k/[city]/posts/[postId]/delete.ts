import { Handlers } from "$fresh/server.ts";
import { findById } from "kv/posts.ts";
import { PersistedSessionState } from "types";
import { redirect, unauthorizedResponse } from "http-utils";
import { deletePost } from "kv/posts.ts";
import { ROUTES } from "route-utils";
import { setServerFlash } from "session-utils";

export const handler: Handlers<void, PersistedSessionState> = {
  GET(_req, _ctx) {
    return redirect("/");
  },
  async POST(_req, ctx) {
    const post = await findById(ctx.params.postId);
    if (!post) return ctx.renderNotFound();

    if (post.userId !== ctx.state.session.userId) return unauthorizedResponse();

    await deletePost(post);

    setServerFlash(ctx, { message: "Inlägget raderat", status: "success" });
    return redirect(ROUTES.cityPath(post.city));
  },
};
