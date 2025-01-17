import { useEffect, useRef } from "preact/hooks";
import { arrayIsEmpty } from "misc-utils";

type Props = {
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  errors?: string[];
};

export default function AutoSizeTextArea({ name, defaultValue, placeholder, rows, errors }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current && (ref.current.style.height = `${ref.current.scrollHeight}px`);
  }, []);

  function onInput() {
    ref.current && (ref.current.style.height = "inherit");
    ref.current && (ref.current.style.height = `${ref.current.scrollHeight}px`);
  }

  return (
    <div>
      <textarea
        id={name}
        ref={ref}
        defaultValue={defaultValue ?? ""}
        rows={rows ?? 10}
        placeholder={placeholder}
        name={name}
        onInput={onInput}
        class={`textarea w-full textarea-bordered resize-none ${!arrayIsEmpty(errors) && "input-error"}`}
      />
      {errors?.map((error) => (
        <small class="block text-red-500" key={error}>
          {error}
        </small>
      ))}
    </div>
  );
}
