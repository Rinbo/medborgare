// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_k_search from "./routes/api/k-search.ts";
import * as $index from "./routes/index.tsx";
import * as $k_city_ from "./routes/k/[city].tsx";
import * as $login from "./routes/login.tsx";
import * as $logout from "./routes/logout.tsx";
import * as $posts_id_index from "./routes/posts/[id]/index.tsx";
import * as $CitySearch from "./islands/CitySearch.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Flash from "./islands/Flash.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/k-search.ts": $api_k_search,
    "./routes/index.tsx": $index,
    "./routes/k/[city].tsx": $k_city_,
    "./routes/login.tsx": $login,
    "./routes/logout.tsx": $logout,
    "./routes/posts/[id]/index.tsx": $posts_id_index,
  },
  islands: {
    "./islands/CitySearch.tsx": $CitySearch,
    "./islands/Counter.tsx": $Counter,
    "./islands/Flash.tsx": $Flash,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
