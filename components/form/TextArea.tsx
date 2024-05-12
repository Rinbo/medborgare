import { arrayIsEmpty } from "misc-utils";

type Props = {
  name: string;
  value: string;
  rows?: number;
  placeholder?: string;
  label?: string;
  errors?: string[];
  setOnFocus?: (e: FocusEvent) => void;
  setOnBlur?: () => void;
  setOnInput?: (e: InputEvent) => void;
};

export default function TextArea({ name, value, rows, errors, label, placeholder, setOnFocus, setOnBlur, setOnInput }: Props) {
  return (
    <div>
      {label && <label for={name} class="label label-text">{label}</label>}
      <textarea
        onFocus={setOnFocus ? (e) => setOnFocus(e) : undefined}
        onBlur={setOnBlur ? () => setOnBlur() : undefined}
        onInput={setOnInput ? (e) => setOnInput(e) : undefined}
        id={name}
        rows={rows ?? 10}
        placeholder={placeholder}
        value={value}
        name={name}
        class={`textarea w-full textarea-bordered ${!arrayIsEmpty(errors) && "input-error"}`}
      />
      {errors?.map((error) => (
        <small class="block text-red-500" key={error}>
          {error}
        </small>
      ))}
    </div>
  );
}
