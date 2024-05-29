import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";

const ulid = monotonicFactory();
const kv = await Deno.openKv();

const DEFAULT_LIMIT = 20;

interface ListOptions {
  prefix: string[];
  cursor?: string;
  limit?: number;
}

export type Post = {
  id: string;
  city: string;
  title: string;
  body: string;
  userName: string;
  userId: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = { id: string; postId: string; text: string; userId: string; userName: string; createdAt: string; updatedAt: string };

type NewPost = {
  city: string;
  title: string;
  body: string;
  userName: string;
  userId: string;
};

type ExistingPost = {
  id: string;
  title: string;
  body: string;
};

type NewComment = Omit<Comment, "createdAt" | "updatedAt" | "id">;

const POSTS = "posts";
const POSTS_BY_CITY = "posts_by_city";
const POSTS_BY_USER_ID = "posts_by_user_id";

const postsById = (post: Post) => [POSTS, post.id];
const postsByCity = (post: Post) => [POSTS_BY_CITY, post.city, post.id];
const postsByUserId = (post: Post) => [POSTS_BY_USER_ID, post.userId, post.id];

export async function insertNewPost(newPost: NewPost) {
  return await insertPost(createPost(newPost));
}

export async function updatePost(existingPost: ExistingPost) {
  const post = await findById(existingPost.id);

  if (!post) {
    console.error("attempted to update post that does not exist", existingPost);
    return false;
  }

  return insertPost({ ...post, title: existingPost.title, body: existingPost.title, updatedAt: new Date().toUTCString() });
}

export async function findByCity(city: string, limit?: number) {
  return await findByPrefix({ prefix: [POSTS_BY_CITY, city.toLowerCase()], limit });
}

export async function findByUserId(userId: string, limit?: number) {
  return await findByPrefix({ prefix: [POSTS_BY_USER_ID, userId], limit });
}

export async function findById(id: string) {
  return (await kv.get<Post>([POSTS, id])).value;
}

// TODO, should probably add check on the indexes here
export async function insertPost(post: Post) {
  return await kv.atomic()
    .set(postsById(post), post)
    .set(postsByCity(post), post)
    .set(postsByUserId(post), post)
    .commit();
}

export async function addComment(comment: Comment) {
  const post = await findById(comment.postId);

  if (!post) {
    console.error("unable to insert comment for postId", comment.postId);
    return false;
  }

  post.comments = [...post.comments ?? [], comment];
  const result = await insertPost(post);

  return result.ok;
}

export async function deleteComment(post: Post, commentId: string) {
  post.comments = post.comments.filter((c) => c.id !== commentId);
  const result = await insertPost(post);
  return result.ok;
}

export function buildNewComment(newComment: NewComment) {
  const now = new Date().toUTCString();
  return { id: ulid(), createdAt: now, updatedAt: now, ...newComment };
}

export async function deletePost(post: Post) {
  return await kv.atomic()
    .delete(postsById(post))
    .delete(postsByCity(post))
    .delete(postsByUserId(post))
    .commit();
}

export async function findByCityPaginated({ city, cursor, limit = DEFAULT_LIMIT }: { city: string; cursor?: string; limit?: number }) {
  const iter = kv.list<Post>({ prefix: [POSTS_BY_CITY, city.toLowerCase()] }, { limit, cursor, reverse: true });

  const posts = [];

  for await (const post of iter) {
    posts.push(post.value);
  }

  return { posts, cursor: iter.cursor };
}

async function findByPrefix({ prefix, limit = DEFAULT_LIMIT }: ListOptions) {
  const entries = kv.list<Post>({ prefix }, { limit, reverse: true });

  const posts: Post[] = [];

  for await (const entry of entries) {
    posts.push(entry.value);
  }

  return posts;
}

function createPost({ city, title, body, userName, userId }: NewPost): Post {
  const now = new Date().toUTCString();

  return {
    id: ulid(),
    city: city.toLowerCase(),
    title,
    body,
    userName,
    userId,
    comments: [],
    createdAt: now,
    updatedAt: now,
  };
}
