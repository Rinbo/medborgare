import { Handlers } from "$fresh/server.ts";
import { getSearchParams, redirect, withAuth } from "http-utils";
import { createFlash, flattenZodErrors } from "misc-utils";
import { insertNewPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import PostForm, { EMPTY_POST, PostFormData, schema } from "islands/forms/PostForm.tsx";

export const handler: Handlers<PostFormData> = withAuth({
  GET(req, ctx) {
    const city = getSearchParams(req, "city");
    if (!city) return redirect("/");

    return ctx.render({ formData: EMPTY_POST, city });
  },
  async POST(req, ctx) {
    const city = getSearchParams(req, "city");
    if (!city) return redirect("/");

    const formData = await req.formData();

    const validation = schema.safeParse(Object.fromEntries(formData));

    if (!validation.success) {
      return ctx.render({
        formData,
        city,
        errors: flattenZodErrors(validation.error),
        flash: createFlash("Felaktig data. Kontrollera fälten", "error"),
      }, { status: 400 });
    }

    const { title, body } = validation.data;
    const { userId, name: userName } = ctx.state.session as Session;
    await insertNewPost({ title, body, city, userId, userName });

    return redirect(ROUTES.cityPath(city));
  },
});

export default function EditPost() {
  return <div>EDIT</div>;
}
