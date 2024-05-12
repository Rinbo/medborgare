import { arrayIsEmpty } from "misc-utils";

type Props = {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  type?: string;
  errors?: string[];
  setOnFocus?: (e: FocusEvent) => void;
  setOnBlur?: () => void;
  setOnInput?: (e: InputEvent) => void;
};

export default function TextInput({ name, value, errors, label, placeholder, type, setOnFocus, setOnBlur, setOnInput }: Props) {
  return (
    <div>
      {label && <label for={name} class="label label-text">{label}</label>}
      <input
        onFocus={setOnFocus ? (e) => setOnFocus(e) : undefined}
        onBlur={setOnBlur ? () => setOnBlur() : undefined}
        onInput={setOnInput ? (e) => setOnInput(e) : undefined}
        id={name}
        placeholder={placeholder}
        type={type ?? "text"}
        value={value}
        name={name}
        class={`input input-bordered w-full ${!arrayIsEmpty(errors) && "input-error"}`}
      />
      {errors?.map((error) => (
        <small class="block text-red-500" key={error}>
          {error}
        </small>
      ))}
    </div>
  );
}
