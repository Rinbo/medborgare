import { Handlers, PageProps } from "$fresh/server.ts";
import { z } from "z";
import TextInput from "components/form/TextInput.tsx";
import TextArea from "components/form/TextArea.tsx";
import { getSearchParams, redirect, withAuth } from "http-utils";
import { flash, flattenZodErrors } from "misc-utils";
import { insertNewPost } from "kv/posts.ts";
import { Session } from "kv/sessions.ts";
import { ROUTES } from "route-utils";
import { FlashMessage } from "../../islands/Flash.tsx";

export const EMPTY_POST: PostFields = {
  title: "",
  body: "",
};

type PostFields = { title: string; body: string };
type PostFormErrors = { title: string[]; body: string[] };

type PostFormData = {
  formData: PostFields;
  errors?: PostFormErrors;
  flash?: FlashMessage;
};

export const schema = z.object({
  title: z.string().min(2).max(128),
  body: z.string().min(1),
});

export const handler: Handlers = withAuth({
  GET(req, ctx) {
    if (!getSearchParams(req, "city")) return redirect("/");
    return ctx.render({ formData: EMPTY_POST });
  },
  async POST(req, ctx) {
    const city = getSearchParams(req, "city");
    if (!city) return redirect("/");

    ctx.render();

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

    return redirect(ROUTES.city(city), {});
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

// TODO Move to island an implement proper functionality to remove error messages on focus
function PostForm({ formData, errors }: PostFormData) {
  return (
    <form method="post" class="form-control flex flex-col gap-2">
      <TextInput name="title" value={formData.title} placeholder="Titel" errors={errors?.title} />
      <TextArea name="body" value={formData.body} placeholder="Skriv någonting..." errors={errors?.title} />
      <button class="btn btn-primary">Skicka</button>
    </form>
  );
}
