import { Handlers } from "$fresh/server.ts";
import { PersistedSessionState } from "types";
import { findById, updateComment } from "kv/posts.ts";
import { json, unauthorizedResponse } from "http-utils";
import { schema } from "../new.ts";
import { flattenZodErrors } from "misc-utils";

// TODO I probably want to add an edit flag on the comment and show that it has been edited
export const handler: Handlers<void, PersistedSessionState> = {
  async POST(req, ctx) {
    const commentId = ctx.params.commentId;
    const post = await findById(ctx.params.postId);

    if (!post || !commentId) return ctx.renderNotFound();

    const comment = post.comments.find((c) => c.id === commentId);
    if (comment?.userId !== ctx.state.session.userId) return unauthorizedResponse();

    const formdata = await req.formData();
    const validation = schema.safeParse(Object.fromEntries(formdata));

    if (!validation.success) {
      return json({ errors: flattenZodErrors(validation.error) }, 400);
    }

    const { text } = validation.data;

    const updatedCommment = { ...comment, text };

    const ok = await updateComment({ post, comment: updatedCommment });

    if (!ok) return ctx.renderNotFound();

    // TODO add flash message
    return json({ comment: updatedCommment }, 200);
  },
};
