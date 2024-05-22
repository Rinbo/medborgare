const cityPath = (city: string) => `/k/${city}`;
const postPath = (city: string, id: string) => `${cityPath(city)}/posts/${id}`;
const editPostPath = (city: string, id: string) => postPath(city, id) + "/edit";
const deletePostPath = (city: string, id: string) => postPath(city, id) + "/delete";
const newPostPath = (city: string) => cityPath(city) + "/posts/new";
const fetchMorePosts = (city: string, cursor: string) => cityPath(city) + `/posts/fetch-more?cursor=${cursor}`;

export const ROUTES = {
  root: "/",
  logout: "/logout",
  login: "/login",
  kSearch: "/api/k-search",
  cityPath,
  postPath,
  newPostPath,
  editPostPath,
  deletePostPath,
  fetchMorePosts,
};

export function isMutatingRoute(path: string): boolean {
  return new RegExp(/\/(new|delete|edit)\/?$/gm).test(path);
}
