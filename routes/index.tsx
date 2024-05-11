import CitySearch from "../islands/CitySearch.tsx";

export default function Home() {
  return (
    <div class="mx-auto h-full px-2 py-6 md:py-4">
      <div class="mx-auto flex h-full max-w-screen-md flex-col">
        <div class="hero rounded-xl md:h-1/2">
          <div class="hero-content text-center">
            <div class="flex max-w-md flex-col items-center">
              <h1 class="text-5xl font-bold">Medborgare</h1>
              <p class="py-6 font-serif">
                Publikt forum för diskussion och inlägg om lokala händelser och evangemang. Garanterat trollfritt då autentisering görs med
                bankId och alla skiver i sitt riktiga namn.
              </p>
              <CitySearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
