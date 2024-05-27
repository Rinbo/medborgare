import { useSignal } from "@preact/signals";
import { Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";
import { ROUTES } from "route-utils";

export default function PostIsland({ post, isLoggedIn }: { post: Post; userId: string; isLoggedIn: boolean }) {
  const errors = useSignal([]);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    fetch(ROUTES.addComment(post.city, post.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => res.json())
      .then((_json) => {
        window.location.reload();
        target.reset();
      })
      .catch((err) => (errors.value = err?.errors?.text || []));
  }

  return (
    <div class="flex flex-col gap-2">
      <div class="flex h-full flex-col gap-1 rounded-md border p-4">
        <div class="font-semibold text-primary">{post.userName}</div>
        <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
        <p class="whitespace-pre-line">{post.body}</p>
      </div>
      {isLoggedIn && <CommentForm onSubmit={onSubmit} />}
      {post.comments?.map((comment) => <div key={comment.id} class="truncate">{comment.text}</div>)}
    </div>
  );
}

function CommentForm({ onSubmit }: { onSubmit: (e: SubmitEvent) => void }) {
  return (
    <form onSubmit={onSubmit}>
      <AutoSizeTextArea name="text" placeholder="Lägg till en kommentar" rows={1} />
      <button tabindex={0} class="btn btn-primary float-right my-1">Svara</button>
    </form>
  );
}
