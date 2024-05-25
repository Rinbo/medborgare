import { useSignal } from "@preact/signals";
import { Post } from "kv/posts.ts";
import TextInput from "components/form/TextInput.tsx";

export default function PostIsland({ post }: { post: Post }) {
  const reply = useSignal(false);

  // KEEP IT SIMPLE FIRST TIME AROUND!
  return (
    <div class="flex h-full flex-col gap-1 rounded-md border p-4">
      <div class="font-semibold text-primary">{post.userName}</div>
      <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
      <p class="whitespace-pre-line">{post.body}</p>
      <div class="my-2">
        <button onClick={() => (reply.value = !reply.value)} class="btn btn-primary">Reply</button>
      </div>
      {reply.value && <TextInput name="comment" value="" />}
      {post.comments?.map((comment) => <pre class="truncate">{JSON.stringify(comment, null, 2)}</pre>)}
    </div>
  );
}
