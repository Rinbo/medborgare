import { Handlers, PageProps } from "$fresh/server.ts";
import { getSearchParams, redirect, withAuth } from "http-utils";
import { flash, flattenZodErrors } from "misc-utils";
import { insertNewPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import PostForm, { EMPTY_POST, PostFormData, schema } from "../../islands/forms/PostForm.tsx";

export const handler: Handlers = withAuth({
  GET(req, ctx) {
    const city = getSearchParams(req, "city");
    if (!city) return redirect("/");

    return ctx.render({ formData: EMPTY_POST });
  },
  async POST(req, ctx) {
    const city = getSearchParams(req, "city");
    if (!city) return redirect("/");

    const formData = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formData));

    if (!validation.success) {
      return ctx.render({ formData, errors: flattenZodErrors(validation.error), ...flash("Felaktig data. Kontrollera fälten", "error") }, {
        status: 400,
      });
    }

    const { title, body } = validation.data;

    const { userId, name: userName } = ctx.state.session as Session;

    await insertNewPost({ title, body, city, userId, userName });

    return redirect(ROUTES.city(city));
  },
});

export default function NewPost(props: PageProps<PostFormData>) {
  return (
    <div class="mx-auto max-w-md p-2">
      <h1 class="mb-4 text-center text-3xl uppercase">Nytt inlägg</h1>
      <PostForm {...props.data} />
    </div>
  );
}
