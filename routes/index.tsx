import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import CitySearch from "../islands/CitySearch.tsx";

const POSTS = [
  { name: "Some cool post", author: "Robin Börjesson", date: Date.now(), city: "Kungälv" },
];

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="mx-auto px-4 py-6 md:py-4">
      <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center">
        <CitySearch />
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <button class="btn btn-primary">My Button</button>
        <Counter count={count} />
      </div>
    </div>
  );
}
