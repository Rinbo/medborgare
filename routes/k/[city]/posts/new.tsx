import { Handlers, PageProps } from "$fresh/server.ts";
import { redirect } from "http-utils";
import { insertNewPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import PostForm, { EMPTY_POST, PostFormData, schema } from "islands/forms/PostForm.tsx";
import { PersistedSessionState } from "types";
import { setServerFlash } from "session-utils";

export const handler: Handlers<PostFormData, PersistedSessionState> = {
  GET(_req, ctx) {
    return ctx.render({ formData: EMPTY_POST, city: ctx.params.city });
  },
  async POST(req, ctx) {
    const city = decodeURIComponent(ctx.params.city);

    const formData = Object.fromEntries(await req.formData());
    const validation = schema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setServerFlash(ctx, { message: "Felaktig data. Kontrollera fälten", status: "error" });
      return ctx.render({ formData, city, errors }, { status: 400 });
    }

    const { title, body } = validation.data;
    const { userId, name: userName } = ctx.state.session as Session;
    await insertNewPost({ title, body, city, userId, userName });

    setServerFlash(ctx, { message: "Ditt inlägg är tillagt", status: "success" });
    return redirect(ROUTES.cityPath(city));
  },
};

export default function NewPost(props: PageProps<PostFormData>) {
  return (
    <div class="mx-auto max-w-lg p-2">
      <h1 class="mb-4 text-center text-3xl uppercase">Nytt inlägg</h1>
      <PostForm {...props.data} />
    </div>
  );
}
