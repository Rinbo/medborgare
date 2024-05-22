import { Handlers } from "$fresh/server.ts";
import { getSearchParams } from "http-utils";
import { json } from "http-utils";
import { findByCityPaginated } from "kv/posts.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const city = ctx.params.city;
    const cursor = getSearchParams(req, "cursor");

    if (!cursor) return json({ error: "Cursor missing" }, 400);

    const postsAndCursor = await findByCityPaginated({ city, cursor });

    return json({ data: postsAndCursor }, 200);
  },
};
