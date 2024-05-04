import { Handlers } from "$fresh/server.ts";
import { getSearchParams, json } from "http-utils";
import { arrayIsEmpty, includesIgnoreCase, isBlankString } from "misc-utils";

export type City = { name: string; province: string };

const RESULT_LIMIT = 10;
let cities: City[] = [];

export const handler: Handlers = {
  async GET(req, _ctx) {
    const query = getSearchParams(req, "query") ?? "";

    if (isBlankString(query)) return json([], 200);

    if (arrayIsEmpty(cities)) {
      const rawCities = await Deno.readTextFile("./static/cities.json");
      cities = JSON.parse(rawCities);
    }

    const result = cities
      .filter((city) => includesIgnoreCase(city.name, query))
      .slice(0, RESULT_LIMIT);

    return json(result, 200);
  },
};
