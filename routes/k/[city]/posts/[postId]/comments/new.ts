import { Handlers } from "$fresh/server.ts";
import { json } from "http-utils";
import { z } from "z";
import { addComment, buildNewComment, Post } from "kv/posts.ts";
import { FlashMessage } from "islands/ServerFlash.tsx";
import { createFlash, flattenZodErrors } from "misc-utils";
import { PersistedSessionState } from "types";

export const schema = z.object({
  text: z.string().min(2).max(2048),
});

type Data = { post?: Post; flash?: FlashMessage; errors?: { comment: string[] } };

export const handler: Handlers<Data, PersistedSessionState> = {
  async POST(req, ctx) {
    const formdata = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formdata));

    if (!validation.success) {
      const flash = createFlash("Det gick inte att spara din kommentar. Kontrollera din inmatning och försök igen.", "error");
      return json({ flash, errors: flattenZodErrors(validation.error) }, 400);
    }

    const postId = ctx.params.postId;
    const { userId, name: userName } = ctx.state.session;
    const { text } = validation.data;

    const comment = buildNewComment({ postId, userId, userName, text });
    const ok = await addComment(comment);

    // TODO rework flash messages
    if (!ok) return json({ flash: createFlash("Det gick inte att spara din kommentar. Försök igen senare", "error") }, 500);

    return json({ comment, flash: createFlash("Kommentar sparad", "success") }, 200);
  },
};
