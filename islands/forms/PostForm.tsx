import { z } from "z";
import TextInput from "components/form/TextInput.tsx";
import TextArea from "components/form/TextArea.tsx";
import { useState } from "preact/hooks";
import { ROUTES } from "route-utils";
import { useSignal } from "@preact/signals";

export const EMPTY_POST: PostFields = {
  title: "",
  body: "",
};

const EMPTY_FORM_ERRORS = {
  title: [],
  body: [],
};

export type PostFields = { title?: string; body?: string };
type PostFormErrors = { body?: string[] | undefined; title?: string[] | undefined };

export type PostFormData = {
  formData: PostFields;
  city: string;
  errors?: PostFormErrors;
};

export const schema = z.object({
  title: z.string().min(2).max(128),
  body: z.string().min(1),
});

export default function PostForm({ formData, errors, city }: PostFormData) {
  const [formErrors, setFormErrors] = useState<PostFormErrors>(errors ?? EMPTY_FORM_ERRORS);
  const [values, setValues] = useState(formData);
  const loading = useSignal(false);

  function onFocus(e: FocusEvent) {
    const target = e.target as HTMLFormElement;
    setFormErrors((prev) => ({ ...prev, [target.name]: [] }));
  }

  function onInput(e: InputEvent) {
    const target = e.target as HTMLFormElement;
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  }

  return (
    <form method="post" class="form-control flex flex-col gap-2" onSubmit={() => (loading.value = true)}>
      <TextInput
        name="title"
        value={values.title ?? ""}
        placeholder="Titel"
        errors={formErrors.title}
        setOnFocus={onFocus}
        setOnInput={onInput}
      />
      <TextArea
        name="body"
        value={values.body ?? ""}
        placeholder="Skriv någonting..."
        errors={formErrors.body}
        setOnFocus={onFocus}
        setOnInput={onInput}
      />
      <div>
        <a href={ROUTES.cityPath(city)} type="button" class="btn btn-ghost btn-outline float-start" tabindex={0}>Cancel</a>
        <button type="submit" class="btn btn-primary float-end" tabindex={0} disabled={loading.value}>Skicka</button>
      </div>
    </form>
  );
}
