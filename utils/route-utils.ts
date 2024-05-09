const post = (id: string) => `${ROUTES.posts}/${id}`;
const editPost = (id: string) => `${ROUTES.posts}/${id}/edit`;
const city = (city: string) => `/k/${city}`;

export const ROUTES = {
  root: "/",
  logout: "/logout",
  login: "/login",
  posts: "/posts",
  newPost: "/posts/new",
  kSearch: "/api/k-search",
  city,
  post,
  editPost,
};
