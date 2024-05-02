import { defineLayout } from "$fresh/server.ts";
import { Globe } from "lucide-preact";

export default defineLayout((req, ctx) => {
  console.info("Layout state", ctx.state);

  return (
    <div class="min-h-screen w-screen flex flex-col">
      <div class="float fixed bottom-6 right-2 md:top-10 md:left-10">
        <button class="btn btn-primary btn-outline btn-sm md:btn-md">
          <Globe />
        </button>
      </div>
      <div class="grow">
        <ctx.Component />
      </div>
      <div class="text-center font-mono m-1">Copyright borjessons.dev</div>
    </div>
  );
});
