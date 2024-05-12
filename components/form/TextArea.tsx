import { arrayIsEmpty } from "misc-utils";

type Props = {
  name: string;
  value: string;
  rows?: number;
  placeholder?: string;
  label?: string;
  errors?: string[];
  setOnFocus?: () => void;
  setOnBlur?: () => void;
};

export default function TextArea({ name, value, rows, errors, label, placeholder, setOnFocus, setOnBlur }: Props) {
  return (
    <div>
      {label && <label for={name} class="label label-text">{label}</label>}
      <textarea
        onFocus={setOnFocus ? () => setOnFocus() : undefined}
        onBlur={setOnBlur ? () => setOnBlur() : undefined}
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
