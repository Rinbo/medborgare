import { Handlers } from "$fresh/server.ts";
import { destroySession } from "session-utils";
import { redirect } from "http-utils";
import { LogOut } from "lucide-preact";

export const handler: Handlers = {
  async POST(req, _ctx) {
    return redirect("/", { "Set-Cookie": await destroySession(req) });
  },
};

export default function Logout() {
  return (
    <div class="mx-auto">
      <LogoutButton />
    </div>
  );
}

export function LogoutButton() {
  return (
    <form action={"/logout"} method="post">
      <button type="submit" class="flex flex-row gap-1 items-center justify-center">
        <LogOut />
        Logout
      </button>
    </form>
  );
}
