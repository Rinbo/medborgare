import { JSX } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { StateUpdater } from "preact/hooks";

type Props = JSX.HTMLAttributes<HTMLFormElement> & { replace?: boolean; setFormErrors: StateUpdater<Record<string, string[]>> };

export default function Form(props: Props) {
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
        const json = await response.json();
        props.setFormErrors(json.errors);
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
    <form onSubmit={onSubmit} class="form-control flex flex-col gap-2" {...props}>
      {props.children}
    </form>
  );
}
