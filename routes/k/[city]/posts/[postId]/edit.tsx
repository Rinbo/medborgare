import { Handlers, PageProps } from "$fresh/server.ts";
import { redirect, unauthorizedResponse } from "http-utils";
import { createFlash, flattenZodErrors } from "misc-utils";
import { findById, insertPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import PostForm, { PostFormData, schema } from "islands/forms/PostForm.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const post = await findById(ctx.params.postId);
    if (!post) return ctx.renderNotFound();

    const { userId } = ctx.state.session as Session;

    if (userId !== post.userId) return unauthorizedResponse();

    return ctx.render({ formData: { ...post }, city: ctx.params.city });
  },
  async POST(req, ctx) {
    const post = await findById(ctx.params.postId);
    if (!post) return ctx.renderNotFound();

    const { userId } = ctx.state.session as Session;
    if (userId !== post.userId) return unauthorizedResponse();

    const formData = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formData));

    if (!validation.success) {
      const errors = flattenZodErrors(validation.error);
      const flash = createFlash("Felaktig data. Kontrollera fälten", "error");
      return ctx.render({ formData, city: post.city, errors, flash }, { status: 400 });
    }

    const { title, body } = validation.data;
    const isUpdated = await insertPost({ ...post, title, body, createdAt: new Date().toUTCString() });

    if (!isUpdated) ctx.render({ formData, flash: createFlash("Något gick snett. Kunde inte uppdatera inlägg") });

    return redirect(ROUTES.cityPath(post.city));
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
