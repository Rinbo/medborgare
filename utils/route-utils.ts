const post = (id: string) => `${ROUTES.posts}/${id}`;
const editPost = (id: string) => `${ROUTES.posts}/${id}/edit`;
const newPost = (city?: string) => `${ROUTES.posts}/new${city ? "?city=" + city : ""}`;
const city = (city: string) => `/k/${city}`;

export const ROUTES = {
  root: "/",
  logout: "/logout",
  login: "/login",
  posts: "/posts",
  kSearch: "/api/k-search",
  city,
  post,
  newPost,
  editPost,
};
