import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";

const ulid = monotonicFactory();
const kv = await Deno.openKv();

/*
Posts must belong to a city
Posts must have an author
Post Author must be scrubbable, ie if the user is deleted his name in the post must be changed to "Unknown" or "Former User" or something
Posts must be sortable by date
Posts should have some type of popularity ranking (right?)
Posts can have have comments

I might have to make a service for these kind of aggregate service layer for integrating with posts

It seems to me we are going to need a relational database for this. There will be so much duplication of data otherwise
and frankly hard to manage
*/

type Post = {
  id: string;
  city: string;
  title: string;
  body: string;
  userName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type NewPost = {
  city: string;
  title: string;
  body: string;
  userName: string;
  userId: string;
};

const POSTS = "posts";
const POSTS_BY_CITY = "posts_by_city";
const POSTS_BY_USER_ID = "posts_by_user_id";

const postsById = (post: Post) => [POSTS, post.id];
const postsByCity = (post: Post) => [POSTS_BY_CITY, post.city, post.id];
const postsByUserId = (post: Post) => [POSTS_BY_USER_ID, post.userId, post.id];

export async function insertNewPost(newPost: NewPost) {
  return await insertPost(createPost(newPost));
}

export async function findByCity(city: string, limit?: number) {
  return await findByPrefix([POSTS_BY_CITY, city], limit);
}

export async function findByUserId(userId: string, limit?: number) {
  return await findByPrefix([POSTS_BY_USER_ID, userId], limit);
}

async function insertPost(post: Post) {
  return await kv.atomic()
    .set(postsById(post), post)
    .set(postsByCity(post), post)
    .set(postsByUserId(post), post)
    .commit();
}

async function findByPrefix(prefix: string[], limit?: number) {
  const entries = kv.list<Post>({ prefix }, { limit: limit ?? 20 });

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
    city,
    title,
    body,
    userName,
    userId,
    createdAt: now,
    updatedAt: now,
  };
}
