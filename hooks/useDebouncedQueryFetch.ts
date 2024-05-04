import { useEffect, useState } from "preact/hooks";

// TODO should probably use zod to validate shape of result here
export const useDebouncedQueryFetch = <T>(path: string, input: string, delay: number): T | null => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetch(`${path}?query=${input}`)
        .then((response) => response.json())
        .then((result: T) => setData(result))
        .catch((error) => console.error("Error:", error));
    }, delay);

    return () => clearTimeout(handler);
  }, [input, delay]);

  return data;
};

export default useDebouncedQueryFetch;
