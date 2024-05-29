import { Handlers } from "$fresh/server.ts";
import { SessionState } from "types";
import { redirect } from "http-utils";
import { Lock } from "lucide-preact";
import { z } from "z";
import { findUser, insertNewUser, validatePasswordAndGetUser } from "kv/users.ts";
import { flash } from "misc-utils";
import { commitSession, createSession } from "session-utils";
import { ROUTES } from "route-utils";
import { insertNewPost } from "kv/posts.ts";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const handler: Handlers<object, SessionState | undefined> = {
  GET(_req, ctx) {
    return ctx.state?.sessionId ? redirect(ROUTES.root) : ctx.render();
  },
  async POST(req, ctx) {
    const formdata = await req.formData();
    const validation = schema.safeParse(Object.fromEntries(formdata));

    if (!validation.success) return ctx.render(flash("Validation failed, check your inputs", "error"));

    const { email, password } = validation.data;

    const userOption = await validatePasswordAndGetUser({ email, password });

    if (userOption.isEmpty()) return ctx.render(flash("Password is invalid or user does not exist", "error"));

    const user = userOption.get();
    const session = await createSession(user, req.headers.get("user-agent") ?? "");

    return redirect(ROUTES.root, { "Set-Cookie": commitSession(session) });
  },
};

export default function Signin() {
  return (
    <div class="flex h-full flex-col items-center justify-center p-2">
      <div class="flex w-full max-w-sm flex-col items-center rounded-lg border border-primary bg-base-200 p-4 shadow-sm">
        <Lock class="text-error" />
        <h1 class="mb-2 text-2xl">Sign In</h1>
        <form method="POST" class="flex w-full flex-col">
          <label className="form-control">
            <span className="label label-text">Email</span>
            <input name="email" type="email" placeholder="john.doe@example.com" className="input input-sm input-bordered" />
          </label>
          <label className="form-control">
            <span className="label label-text">Password</span>
            <input name="password" type="password" placeholder="password" className="input input-sm input-bordered" />
          </label>
          <button type="submit" class="btn btn-primary btn-sm mt-4 w-full">Submit</button>
        </form>
      </div>
    </div>
  );
}
