import { useSignal } from "@preact/signals";
import { Comment, Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";
import { ROUTES } from "route-utils";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.22.1/formatDistanceToNow/index.js";

export default function PostIsland({ post, isLoggedIn }: { post: Post; userId: string; isLoggedIn: boolean }) {
  const comments = useSignal(post.comments ?? []);

  function scrollToBottom() {
    globalThis.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

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
      .then((json) => {
        target.reset();
        comments.value = [...comments.value, json.comment];
        scrollToBottom();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div class="mb-2 flex flex-col gap-1">
      <div class="flex h-full flex-col gap-1 rounded-md border p-4">
        <div class="font-semibold text-primary">@{post.userName}</div>
        <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
        <p class="whitespace-pre-line">{post.body}</p>
      </div>
      {isLoggedIn && <CommentForm onSubmit={onSubmit} />}
      {comments.value?.map((comment) => <CommentPanel key={comment.id} comment={comment} />)}
    </div>
  );
}

function CommentPanel({ comment }: { comment: Comment }) {
  return (
    <div class="flex flex-col gap-1 rounded-md border px-4 py-2">
      <span class="flex flex-row gap-4">
        <div class="text-xs font-extralight">@{comment.userName}</div>
        <div class="text-xs">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</div>
      </span>
      <div class="whitespace-pre-line">{comment.text}</div>
    </div>
  );
}

function CommentForm({ onSubmit }: { onSubmit: (e: SubmitEvent) => void }) {
  return (
    <form class="rounded-md border px-4 py-2" onSubmit={onSubmit}>
      <AutoSizeTextArea name="text" placeholder="Lägg till en kommentar" rows={1} />
      <button type="submit" tabindex={0} class="btn btn-primary btn-sm float-right my-1">Svara</button>
    </form>
  );
}
