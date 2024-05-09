import { Head } from "$fresh/runtime.ts";
import { ROUTES } from "route-utils";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="mx-auto px-4 py-8">
        <div class="mx-auto flex max-w-screen-md flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">404 - Page not found</h1>
          <p class="my-4">
            The page you were looking for doesn't exist.
          </p>
          <a href={ROUTES.root} class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
