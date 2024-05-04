import { useEffect, useRef, useState } from "preact/hooks";
import useDebouncedQueryFetch from "../hooks/useDebouncedQueryFetch.ts";
import { City } from "../routes/api/k-search.ts";
import { arrayIsEmpty } from "misc-utils";

export default function CitySearch() {
  const [input, setInput] = useState<string>("");
  const result = useDebouncedQueryFetch<City[]>("/api/k-search", input, 150);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <form class="relative w-full max-w-sm">
      <label class="input input-bordered input-primary flex items-center gap-2">
        <input
          onInput={(e) => setInput(e.currentTarget.value)}
          type="text"
          class="grow"
          placeholder="Sök stad"
          value={input}
          ref={inputRef}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      {result && !arrayIsEmpty(result) && (
        <div class="absolute z-10 bg-base-100 mt-2 p-2 border border-primary overflow-clip rounded-md w-full">
          {result.map((city) => <CityResult city={city} />)}
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
    <a href={`/k/${name}`} class="flex flex-row flex-nowrap justify-between btn btn-ghost btn-sm">
      <span class="truncate">{name}</span>
      <span class="text-xs text-neutral-400 truncate">{province}</span>
    </a>
  );
}
