import { Handlers } from "$fresh/server.ts";
import { getSearchParams, json } from "http-utils";
import { arrayIsEmpty } from "misc-utils";

type City = { name: string; provice: string };

let cities: City[] = [];

export const handler: Handlers = {
  async GET(req, _ctx) {
    const query = getSearchParams(req, "query") ?? "";

    if (arrayIsEmpty(cities)) {
      const rawCities = await Deno.readTextFile("./static/cities.json");
      cities = JSON.parse(rawCities);
    }

    const result = cities.filter((city) => city.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

    return json({ result }, 200);
  },
};
