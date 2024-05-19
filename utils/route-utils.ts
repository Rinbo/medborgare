const cityPath = (city: string) => `/k/${city}`;
const postPath = (city: string, id: string) => `${cityPath(city)}/posts/${id}`;
const editPostPath = (city: string, id: string) => postPath(city, id) + "/edit";
const newPostPath = (city: string) => cityPath(city) + "/posts/new";

export const ROUTES = {
  root: "/",
  logout: "/logout",
  login: "/login",
  kSearch: "/api/k-search",
  cityPath,
  postPath,
  newPostPath,
  editPostPath,
};

export function isMutatingRoute(path: string): boolean {
  return new RegExp(/\/(new|delete|edit)\/?$/gm).test(path);
}
