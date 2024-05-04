import { useEffect, useState } from "preact/hooks";

export const useDebouncedQueryFetch = (path: string, input: string, delay: number) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (input) {
        fetch(`${path}?query=${input}`)
          .then((response) => response.json())
          .then((result) => setData(result))
          .catch((error) => console.error("Error:", error));
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [input, delay]);

  return data;
};

export default useDebouncedQueryFetch;
