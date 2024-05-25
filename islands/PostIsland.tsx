import { useSignal } from "@preact/signals";
import { Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";

export default function PostIsland({ initialPost }: { initialPost: Post }) {
  const post = useSignal(initialPost);

  // KEEP IT SIMPLE FIRST TIME AROUND!
  return (
    <div class="flex flex-col gap-2">
      <div class="flex h-full flex-col gap-1 rounded-md border p-4">
        <div class="font-semibold text-primary">{post.value.userName}</div>
        <div class="text-xs italic">{new Date(post.value.createdAt).toLocaleDateString()}</div>
        <p class="whitespace-pre-line">{post.value.body}</p>
      </div>
      <form>
        <AutoSizeTextArea name="comment" value="" placeholder="Lägg till en kommentar" rows={1} />
        <button class="btn btn-primary float-right my-1">Svara</button>
      </form>
      {post.value.comments?.map((comment) => <pre class="truncate">{JSON.stringify(comment, null, 2)}</pre>)}
    </div>
  );
}
