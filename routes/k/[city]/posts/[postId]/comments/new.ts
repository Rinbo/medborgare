import { Handlers } from "$fresh/server.ts";
import { json } from "http-utils";
import { z } from "z";
import { addComment, buildNewComment } from "kv/posts.ts";
import { PersistedSessionState } from "types";

export const schema = z.object({
  text: z.string().min(2).max(2048),
});

export const handler: Handlers<void, PersistedSessionState> = {
  async POST(req, ctx) {
    const formdata = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formdata));

    if (!validation.success) return json({}, 400);

    const postId = ctx.params.postId;
    const { userId, name: userName } = ctx.state.session;
    const { text } = validation.data;

    const comment = buildNewComment({ postId, userId, userName, text });

    if (!await addComment(comment)) return json({}, 500);

    return json({ comment }, 200);
  },
};
