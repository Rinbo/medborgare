import { useState } from "preact/hooks";
import useDebouncedQueryFetch from "../hooks/useDebouncedQueryFetch.ts";

export default function CitySearch() {
  const [input, setInput] = useState<string>("");
  const result = useDebouncedQueryFetch("/api/k-search", input, 150);

  return (
    <div>
      <form>
        <label class="input input-bordered input-primary flex items-center gap-2 w-full max-w-sm">
          <input onInput={(e) => setInput(e.currentTarget.value)} type="text" class="grow" placeholder="Sök stad" value={input} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
      {result && <pre class="m-2 p-2 border border-primary overflow-clip rounded-md">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
