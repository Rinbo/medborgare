import { arrayIsEmpty } from "misc-utils";

type Props = {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  type?: string;
  errors?: string[];
  setOnFocus?: () => void;
  setOnBlur?: () => void;
};

export default function TextInput({ name, value, errors, label, placeholder, type, setOnFocus, setOnBlur }: Props) {
  return (
    <div>
      {label && <label for={name} class="label label-text">{label}</label>}
      <input
        onFocus={setOnFocus ? () => setOnFocus() : undefined}
        onBlur={setOnBlur ? () => setOnBlur() : undefined}
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
