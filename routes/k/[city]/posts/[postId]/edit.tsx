import { Handlers, PageProps } from "$fresh/server.ts";
import { redirect, unauthorizedResponse } from "http-utils";
import { flattenZodErrors } from "misc-utils";
import { findById, insertPost } from "kv/posts.ts";
import { ROUTES } from "route-utils";
import PostForm, { PostFormData, schema } from "islands/forms/PostForm.tsx";
import { PersistedSessionState } from "types";
import { setServerFlash } from "session-utils";

export const handler: Handlers<PostFormData, PersistedSessionState> = {
  async GET(_req, ctx) {
    const post = await findById(ctx.params.postId);

    if (!post) return ctx.renderNotFound();

    const { userId } = ctx.state.session;

    if (userId !== post.userId) return unauthorizedResponse();

    return ctx.render({ formData: { ...post }, city: post.city });
  },
  async POST(req, ctx) {
    const { userId } = ctx.state.session;

    const post = await findById(ctx.params.postId);

    if (!post) return ctx.renderNotFound();

    if (userId !== post.userId) return unauthorizedResponse();

    const formData = Object.fromEntries(await req.formData());

    const validation = schema.safeParse(formData);
    const { city } = post;

    if (!validation.success) {
      const errors = flattenZodErrors(validation.error);
      setServerFlash(ctx, { message: "Felaktig data. Kontrollera fälten", status: "error" });
      return ctx.render({ formData, city, errors }, { status: 400 });
    }

    const { title, body } = validation.data;
    const isUpdated = await insertPost({ ...post, title, body, createdAt: new Date().toUTCString() });

    if (!isUpdated) {
      setServerFlash(ctx, { message: "Uppdatering misslyckades", status: "error" });
      return ctx.render({ formData, city });
    }

    setServerFlash(ctx, { message: "Inlägget uppdaterades", status: "success" });
    return redirect(ROUTES.postPath(city, post.id));
  },
};

export default function EditPost(props: PageProps<PostFormData>) {
  return (
    <div class="mx-auto max-w-lg p-2">
      <h1 class="mb-4 text-center text-3xl uppercase">Ändra inlägg</h1>
      <PostForm {...props.data} />
    </div>
  );
}
