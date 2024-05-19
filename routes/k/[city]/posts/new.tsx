import { Handlers, PageProps } from "$fresh/server.ts";
import { redirect, withAuth } from "http-utils";
import { createFlash, flattenZodErrors } from "misc-utils";
import { insertNewPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import PostForm, { EMPTY_POST, PostFormData, schema } from "islands/forms/PostForm.tsx";

export const handler: Handlers<PostFormData> = withAuth({
  GET(_req, ctx) {
    return ctx.render({ formData: EMPTY_POST, city: ctx.params.city });
  },
  async POST(req, ctx) {
    const city = decodeURIComponent(ctx.params.city);

    const formData = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formData));

    if (!validation.success) {
      const errors = flattenZodErrors(validation.error);
      const flash = createFlash("Felaktig data. Kontrollera fälten", "error");
      return ctx.render({ formData, city, errors, flash }, { status: 400 });
    }

    const { title, body } = validation.data;
    const { userId, name: userName } = ctx.state.session as Session;
    await insertNewPost({ title, body, city, userId, userName });

    return redirect(ROUTES.cityPath(city));
  },
});

export default function NewPost(props: PageProps<PostFormData>) {
  return (
    <div class="mx-auto max-w-lg p-2">
      <h1 class="mb-4 text-center text-3xl uppercase">Nytt inlägg</h1>
      <PostForm {...props.data} />
    </div>
  );
}
