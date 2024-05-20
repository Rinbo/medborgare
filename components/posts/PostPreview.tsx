import { Post } from "kv/posts.ts";
import { ROUTES } from "route-utils";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <a href={ROUTES.postPath(post.city, post.id)}>
      <div class="my-2 rounded-xl border p-4 hover:bg-base-200">
        <h5 class="upp mb-2 text-2xl font-bold tracking-tight">{post.title}</h5>
        <p class="mb-1 text-xs font-normal">
          <span class="font-semibold text-primary">{post.userName}</span>
        </p>
        <p class="mb-2 truncate font-light">
          {post.body}
        </p>
        <p class="text-xs italic text-neutral-content">
          Posted on {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </a>
  );
}
