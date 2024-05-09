import { Handlers } from "$fresh/server.ts";
import { destroySession } from "session-utils";
import { redirect } from "http-utils";
import { ROUTES } from "route-utils";

export const handler: Handlers = {
  async POST(req, _ctx) {
    return redirect(ROUTES.root, { "Set-Cookie": await destroySession(req) });
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
    <form action={ROUTES.logout} method="post">
      <button type="submit" class="flex flex-row items-center justify-center gap-1">
        Logout
      </button>
    </form>
  );
}
