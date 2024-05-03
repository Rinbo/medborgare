import { Handlers } from "$fresh/server.ts";
import { SessionState } from "../utils/types.ts";
import { redirect } from "http-utils";
import { Lock } from "lucide-preact";
import { z } from "z";
import { isValidPassword } from "kv/users.ts";
import { flash } from "misc-utils";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const handler: Handlers<object, SessionState | undefined> = {
  GET(_req, ctx) {
    return ctx.state?.sessionId ? redirect("/") : ctx.render();
  },
  async POST(req, ctx) {
    const formdata = await req.formData();
    const validation = schema.safeParse(Object.fromEntries(formdata));

    if (!validation.success) return ctx.render(flash("Validation failed, check your inputs", "error"));

    const sessionId = crypto.randomUUID();
    const { email, password } = validation.data;

    if (!(await isValidPassword({ email, password }))) return ctx.render(flash("Password is invalid or user does not exist", "error"));

    // create session

    console.log("user authentication passed");

    return redirect("/");
  },
};

export default function Signin() {
  return (
    <div class="flex flex-col justify-center items-center h-full p-2">
      <div class="flex flex-col items-center p-4 bg-base-200 shadow-sm border border-primary rounded-lg w-full max-w-sm">
        <Lock class="text-error" />
        <h1 class="text-2xl mb-2">Signin</h1>
        <form method="POST" class="w-full flex flex-col">
          <label className="form-control">
            <span className="label label-text">Email</span>
            <input name="email" type="email" placeholder="john.doe@example.com" className="input input-bordered input-sm" />
          </label>
          <label className="form-control">
            <span className="label label-text">Password</span>
            <input name="password" type="password" placeholder="password" className="input input-bordered input-sm" />
          </label>
          <button type="submit" class="btn btn-primary btn-sm w-full mt-4">Submit</button>
        </form>
      </div>
    </div>
  );
}
