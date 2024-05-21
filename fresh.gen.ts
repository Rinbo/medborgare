// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_k_search from "./routes/api/k-search.ts";
import * as $api_populate_city from "./routes/api/populate-city.ts";
import * as $index from "./routes/index.tsx";
import * as $k_city_index from "./routes/k/[city]/index.tsx";
import * as $k_city_posts_postId_delete from "./routes/k/[city]/posts/[postId]/delete.ts";
import * as $k_city_posts_postId_edit from "./routes/k/[city]/posts/[postId]/edit.tsx";
import * as $k_city_posts_postId_index from "./routes/k/[city]/posts/[postId]/index.tsx";
import * as $k_city_posts_fetch_posts from "./routes/k/[city]/posts/fetch-posts.ts";
import * as $k_city_posts_new from "./routes/k/[city]/posts/new.tsx";
import * as $k_middleware from "./routes/k/_middleware.ts";
import * as $login from "./routes/login.tsx";
import * as $logout from "./routes/logout.tsx";
import * as $CitySearch from "./islands/CitySearch.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Flash from "./islands/Flash.tsx";
import * as $PostList from "./islands/PostList.tsx";
import * as $forms_PostForm from "./islands/forms/PostForm.tsx";
import * as $modals_DeleteModal from "./islands/modals/DeleteModal.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/k-search.ts": $api_k_search,
    "./routes/api/populate-city.ts": $api_populate_city,
    "./routes/index.tsx": $index,
    "./routes/k/[city]/index.tsx": $k_city_index,
    "./routes/k/[city]/posts/[postId]/delete.ts": $k_city_posts_postId_delete,
    "./routes/k/[city]/posts/[postId]/edit.tsx": $k_city_posts_postId_edit,
    "./routes/k/[city]/posts/[postId]/index.tsx": $k_city_posts_postId_index,
    "./routes/k/[city]/posts/fetch-posts.ts": $k_city_posts_fetch_posts,
    "./routes/k/[city]/posts/new.tsx": $k_city_posts_new,
    "./routes/k/_middleware.ts": $k_middleware,
    "./routes/login.tsx": $login,
    "./routes/logout.tsx": $logout,
  },
  islands: {
    "./islands/CitySearch.tsx": $CitySearch,
    "./islands/Counter.tsx": $Counter,
    "./islands/Flash.tsx": $Flash,
    "./islands/PostList.tsx": $PostList,
    "./islands/forms/PostForm.tsx": $forms_PostForm,
    "./islands/modals/DeleteModal.tsx": $modals_DeleteModal,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
