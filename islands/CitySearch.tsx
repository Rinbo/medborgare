import { useEffect, useRef, useState } from "preact/hooks";
import useDebouncedQueryFetch from "../hooks/useDebouncedQueryFetch.ts";
import { City } from "../routes/api/k-search.ts";
import { arrayIsEmpty } from "misc-utils";
import { ROUTES } from "route-utils";

export default function CitySearch() {
  const [input, setInput] = useState<string>("");
  const result = useDebouncedQueryFetch<City[]>(ROUTES.kSearch, input, 150);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const comboRef = useRef<HTMLDivElement | null>(null);

  const [focus, setFocus] = useState<boolean>(true);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  function onClickOutside(event: MouseEvent | TouchEvent): void {
    const target = event.target as Node;
    !inputRef.current?.contains(target) && !comboRef.current?.contains(target) && setFocus(false);
  }

  function onEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      inputRef.current?.blur();
      setFocus(false);
    }
  }

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (result && !arrayIsEmpty(result)) {
      window.location.href = ROUTES.city(result[0].name);
    }
  }

  return (
    <form class="relative w-full max-w-sm" onClick={() => setFocus(true)} onSubmit={(e) => onSubmit(e)} onKeyDown={onEscape}>
      <label class="input input-bordered input-primary flex items-center gap-2">
        <input
          onInput={(e) => setInput(e.currentTarget.value)}
          type="text"
          class="grow"
          placeholder="Sök kommun"
          value={input}
          ref={inputRef}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      {!arrayIsEmpty(result) && focus && (
        <div class="absolute z-10 mt-2 w-full overflow-clip rounded-md border border-primary bg-base-100 p-2" ref={comboRef}>
          {result?.map((city) => <CityResult city={city} />)}
        </div>
      )}
    </form>
  );
}

interface CityInterface {
  city: City;
}

function CityResult({ city: { name, province } }: CityInterface) {
  return (
    <a href={ROUTES.city(name)} class="btn btn-ghost btn-sm flex flex-row flex-nowrap justify-between rounded-sm">
      <span class="overflow-ellipsis whitespace-nowrap">{name}</span>
      <span class="truncate text-xs text-neutral-400">{province}</span>
    </a>
  );
}
