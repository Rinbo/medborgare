import { useSignal } from "@preact/signals";
import { Comment, Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";
import { Pencil } from "lucide-preact";
import { ROUTES } from "route-utils";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.22.1/formatDistanceToNow/index.js";
import DeleteModal from "islands/modals/DeleteModal.tsx";
import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useState } from "preact/hooks";

export default function PostIsland({ post, isLoggedIn, userId }: { post: Post; userId: string; isLoggedIn: boolean }) {
  const comments = useSignal(post.comments ?? []);
  const loading = useSignal(false);

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
    loading.value = true;

    // create comment here instead and optimistically update it. Lots of information is required though
    // stuff that I usually get easily access to serverside

    fetch(ROUTES.newComment(post.city, post.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        target.reset();
        comments.value = [...comments.value, json.comment];
        loading.value = false;
      })
      .then(() => scrollToBottom())
      .catch((err) => {
        loading.value = false;
        console.error(err);
      });
  }

  return (
    <div class="flex flex-col gap-1">
      <div class="flex h-full flex-col gap-1 rounded-md border p-4">
        <div class="font-semibold text-primary">@{post.userName}</div>
        <div class="text-xs italic">{new Date(post.createdAt).toLocaleDateString()}</div>
        <p class="whitespace-pre-line">{post.body}</p>
      </div>
      {isLoggedIn && <CommentForm onSubmit={onSubmit} loading={loading.value} />}
      {comments.value.map((comment) =>
        comment.userId === userId
          ? <MutableCommentPanel key={comment.id} comment={comment} city={post.city} />
          : <CommentPanel key={comment.id} comment={comment} />
      )}
    </div>
  );
}

function MutableCommentPanel({ comment, city }: { comment: Comment; city: string }) {
  const commentSignal = useSignal(comment);
  const [editMode, setEditMode] = useState(false);
  const loading = useSignal(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    loading.value = true;

    fetch(ROUTES.newComment(city, comment.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        target.reset();
        commentSignal.value = json.comment;
        loading.value = false;
        setEditMode(false);
      })
      .catch((err) => {
        console.error(err);
        setEditMode(false);
        loading.value = false;
      });
  }

  if (editMode) {
    return (
      <CommentForm
        onSubmit={onSubmit}
        initialText={comment.text}
        buttonTitle="Spara"
        cancelCallback={() => setEditMode(false)}
        loading={loading.value}
      />
    );
  }

  return (
    <CommentPanel comment={commentSignal.value}>
      <ul class="flex flex-row gap-2">
        <li>
          <button onClick={() => setEditMode(true)}>
            <Pencil class="w-5" />
          </button>
        </li>
        <DeleteModal action={ROUTES.deleteComment(city, comment.postId, comment.id)} resource="kommentar" iconClass="w-5" />
      </ul>
    </CommentPanel>
  );
}

function CommentPanel({ comment, children }: { comment: Comment; children?: ComponentChildren }) {
  return (
    <div class="flex flex-col gap-1 rounded-md border px-4 py-2">
      <span class="flex flex-row gap-4">
        <div class="text-xs font-extralight">@{comment.userName}</div>
        <div class="grow text-xs">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</div>
        {children}
      </span>
      <div class="whitespace-pre-line">{comment.text}</div>
    </div>
  );
}

function CommentForm(
  { onSubmit, loading, initialText, cancelCallback, buttonTitle }: {
    onSubmit: (e: SubmitEvent) => void;
    loading: boolean;
    initialText?: string;
    cancelCallback?: () => void;
    buttonTitle?: string;
  },
) {
  return (
    <form class="rounded-md border p-4" onSubmit={onSubmit}>
      <AutoSizeTextArea name="text" value={initialText} placeholder="Lägg till en kommentar" rows={1} />
      <div class="my-1 flex flex-row justify-end gap-2">
        {cancelCallback && <button type="button" onClick={cancelCallback} class="btn btn-outline btn-sm">Avbryt</button>}
        <button disabled={loading} type="submit" tabindex={0} class="btn btn-primary btn-sm">{buttonTitle ?? "Skicka"}</button>
      </div>
    </form>
  );
}
