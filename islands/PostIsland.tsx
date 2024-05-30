import { useSignal } from "@preact/signals";
import { Comment, Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";
import { Pencil } from "lucide-preact";
import { ROUTES } from "route-utils";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.22.1/formatDistanceToNow/index.js";
import DeleteModal from "islands/modals/DeleteModal.tsx";

export default function PostIsland({ post, isLoggedIn, userId }: { post: Post; userId: string; isLoggedIn: boolean }) {
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

    fetch(ROUTES.newComment(post.city, post.id), {
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
    <div class="flex flex-col gap-1">
      <div class="flex h-full flex-col gap-1 rounded-md border p-4">
        <div class="font-semibold text-primary">@{post.userName}</div>
        <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
        <p class="whitespace-pre-line">{post.body}</p>
      </div>
      {isLoggedIn && <CommentForm onSubmit={onSubmit} />}
      {comments.value?.map((comment) => <CommentPanel key={comment.id} comment={comment} city={post.city} userId={userId} />)}
    </div>
  );
}

// TODO Make another component called EditableComment and only render it conditionally above if this is user's comment
// Then call this commentPanel in that component if not in edit mode
// Make Resizable area take initial height as parameter and if there should be a cancel button, and the name of "save" button
function CommentPanel({ comment, city, userId }: { comment: Comment; city: string; userId: string }) {
  const commentSignal = useSignal(comment);
  const editMode = useSignal(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    fetch(ROUTES.newComment(city, comment.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        target.reset();
        commentSignal.value = json.comment;
        editMode.value = false;
      })
      .catch((err) => {
        console.error(err);
        editMode.value = false;
      });
  }

  if (editMode.value) return <CommentForm onSubmit={onSubmit} initialText={comment.text} />;

  return (
    <div class="flex flex-col gap-1 rounded-md border px-4 py-2">
      <span class="flex flex-row gap-4">
        <div class="text-xs font-extralight">@{comment.userName}</div>
        <div class="grow text-xs">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</div>
        {userId === comment.userId && (
          <ul class="flex flex-row gap-2">
            <li>
              <button onClick={() => (editMode.value = true)}>
                <Pencil class="w-5" />
              </button>
            </li>
            <DeleteModal action={ROUTES.deleteComment(city, comment.postId, comment.id)} resource="kommentar" iconClass="w-5" />
          </ul>
        )}
      </span>
      <div class="whitespace-pre-line">{comment.text}</div>
    </div>
  );
}

function CommentForm({ onSubmit, initialText }: { onSubmit: (e: SubmitEvent) => void; initialText?: string }) {
  return (
    <form class="rounded-md border p-4" onSubmit={onSubmit}>
      <AutoSizeTextArea name="text" value={initialText} placeholder="Lägg till en kommentar" rows={1} />
      <button type="submit" tabindex={0} class="btn btn-primary btn-sm float-right my-1">Svara</button>
    </form>
  );
}
