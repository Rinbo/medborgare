import { Handlers } from "$fresh/server.ts";
import { getSearchParams, json } from "http-utils";
import { includesIgnoreCase, isBlankString } from "misc-utils";
import { getCities } from "../../utils/city-cache.ts";

const RESULT_LIMIT = 10;

export const handler: Handlers = {
  async GET(req, _ctx) {
    const query = getSearchParams(req, "query") ?? "";

    if (isBlankString(query)) return json([], 200);

    const cities = await getCities();

    const result = cities
      .filter((city) => includesIgnoreCase(city.name, query))
      .slice(0, RESULT_LIMIT);

    return json(result, 200);
  },
};
