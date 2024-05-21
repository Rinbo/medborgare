import { Handlers } from "$fresh/server.ts";
import { getSearchParams } from "http-utils";
import { insertNewPost } from "kv/posts.ts";
import { findUser } from "kv/users.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    if (Deno.env.get("DENO_ENV") !== "local") return new Response("can't do that here", { status: 403 });

    const user = await findUser("robin.b@outlook.com");

    if (user.isEmpty()) throw new Error("booh");

    const { id: userId, name: userName } = user.get();

    const city = getSearchParams(req, "city") ?? "arboga";
    const count = parseInt(getSearchParams(req, "count") ?? "200");

    console.log(city, count);

    for (let i = 0; i < count; i++) {
      await insertNewPost({ body: createBody(), title: "Some Title " + i, userId, userName, city: city.toLowerCase() });
    }

    return new Response(`Posts inserted: ${count}\n`);
  },
};

function createBody() {
  return `Under eftermiddagen och kvällen har många tåg till och från Göteborg varit försenade eller inställda. Orsaken är ett signalfel på Göteborgs centralstation.

    Enligt Trafikverkets prognos ska felet vara reparerat till tisdag morgon. Västtrafik räknar med inställd trafik fram till 20, och därefter ska trafiken rulla på med endast mindre störningar.
    
    Det är oklart exakt vad felet är.
    
    – Det måste bli svalare innan problemet kan lösas, säger Ronny Hörstrand på SJ:s pressjour.
    
    Främst är det tåg norr om Göteborg mot Älvängen, Trollhättan och Karlstad som påverkas.
    
    – Men det är spårbrist, så det är lite problem på andra linjer också, säger Henrik Kjellberg på Västtrafiks presstjänst.`;
}
