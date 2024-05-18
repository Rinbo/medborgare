import { arrayIsEmpty } from "misc-utils";

export type City = { name: string; province: string };

let cities: City[] = [];

export async function getCities(): Promise<City[]> {
  if (arrayIsEmpty(cities)) {
    const rawCities = await Deno.readTextFile("./static/cities.json");
    cities = JSON.parse(rawCities);
  }
  return cities;
}
