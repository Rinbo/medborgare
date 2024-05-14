import { z } from "z";
import { FlashMessage } from "../Flash.tsx";
import TextInput from "components/form/TextInput.tsx";
import TextArea from "components/form/TextArea.tsx";
import { useState } from "preact/hooks";
import { JSX } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

export const EMPTY_POST: PostFields = {
  title: "",
  body: "",
};

const EMPTY_FORM_ERRORS = {
  title: [],
  body: [],
};

type PostFields = { title: string; body: string };
type PostFormErrors = { title: string[]; body: string[] };

export type PostFormData = {
  formData: PostFields;
  errors?: PostFormErrors;
  flash?: FlashMessage;
};

export const schema = z.object({
  title: z.string().min(2).max(128),
  body: z.string().min(1),
});

export default function PostForm({ formData, errors }: PostFormData) {
  const [formErrors, setFormErrors] = useState<PostFormErrors>(errors ?? EMPTY_FORM_ERRORS);
  const [values, setValues] = useState(formData);

  function onFocus(e: FocusEvent) {
    const target = e.target as HTMLFormElement;
    setFormErrors((prev) => ({ ...prev, [target.name]: [] }));
  }

  function onInput(e: InputEvent) {
    const target = e.target as HTMLFormElement;
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  }

  return (
    <Form replace method="post" class="form-control flex flex-col gap-2">
      <TextInput
        name="title"
        value={values.title}
        placeholder="Titel"
        errors={formErrors.title}
        setOnFocus={onFocus}
        setOnInput={onInput}
      />
      <TextArea
        name="body"
        value={values.body}
        placeholder="Skriv någonting..."
        errors={formErrors.body}
        setOnFocus={onFocus}
        setOnInput={onInput}
      />
      <button class="btn btn-primary">Skicka</button>
    </Form>
  );
}

type Props = JSX.HTMLAttributes<HTMLFormElement> & { replace?: boolean };

function Form(props: Props) {
  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    try {
      const response = await fetch(target.action, {
        method: target.method,
        body: formData,
      });

      if (response.ok) {
        redirect(response.headers.get("Location") || response.url);
      } else {
        console.error("Form submission failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function redirect(redirectUrl: string) {
    if (props.replace) {
      window.location.replace(redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  }

  return (
    <form onSubmit={onSubmit} {...props}>
      {props.children}
    </form>
  );
}
