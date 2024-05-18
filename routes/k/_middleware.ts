import { FreshContext } from "$fresh/server.ts";
import { getCities } from "../../utils/city-cache.ts";

export async function handler(_req: Request, ctx: FreshContext) {
  if (ctx.destination !== "route") return ctx.next();

  const city = decodeURIComponent(ctx.params.city);

  console.log(city);

  const cities = await getCities();
  if (!cities.find((c) => c.name.toLowerCase() === city.toLowerCase())) return ctx.renderNotFound();

  return ctx.next();
}
