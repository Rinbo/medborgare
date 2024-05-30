const cityPath = (city: string) => `/k/${city}`;
const postPath = (city: string, id: string) => `${cityPath(city)}/posts/${id}`;
const editPostPath = (city: string, id: string) => postPath(city, id) + "/edit";
const deletePostPath = (city: string, id: string) => postPath(city, id) + "/delete";
const newPostPath = (city: string) => cityPath(city) + "/posts/new";
const fetchMorePosts = (city: string, cursor: string) => cityPath(city) + `/posts/fetch-more?cursor=${cursor}`;
const newComment = (city: string, postId: string) => postPath(city, postId) + "/comments/new";
const deleteComment = (city: string, postId: string, commentId: string) => postPath(city, postId) + `/comments/${commentId}/delete`;

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
  newComment,
  deleteComment,
};

export function isMutatingRoute(path: string): boolean {
  return new RegExp(/\/(new|delete|edit)\/?$/gm).test(path);
}

export function isMutatingMethod(method: string) {
  const normalizedMethod = method.toLowerCase();
  return normalizedMethod === "post" || normalizedMethod === "delete" || normalizedMethod === "update";
}
