import { useSignal } from "@preact/signals";
import { Comment, Post } from "kv/posts.ts";
import AutoSizeTextArea from "islands/forms/AutoSizeTextArea.tsx";
import { Pencil } from "lucide-preact";
import { ROUTES } from "route-utils";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.22.1/formatDistanceToNow/index.js";
import DeleteModal from "islands/modals/DeleteModal.tsx";
import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import Spinner from "components/Spinner.tsx";
import { useClientFlash } from "../hooks/useClientFlash.ts";
import { FlashMessage } from "islands/ServerFlash.tsx";

export default function PostIsland({ post, isLoggedIn, userId }: { post: Post; userId: string; isLoggedIn: boolean }) {
  const comments = useSignal(post.comments ?? []);
  const loading = useSignal(false);
  const { setFlash } = useClientFlash();

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

    // TODO consider optimistic adding of comments
    fetch(ROUTES.newComment(post.city, post.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then((json) => {
        target.reset();
        comments.value = [...comments.value, json.comment];
        loading.value = false;
        setFlash({ message: "Kommentar sparad", status: "success" });
      })
      .then(() => scrollToBottom())
      .catch((err) => {
        loading.value = false;
        setFlash({ message: "Kunde inte skapa en ny kommentar. Kontrollera din inmatning", status: "error" });
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
          ? <MutableCommentPanel key={comment.id} comment={comment} city={post.city} setFlash={setFlash} />
          : <CommentPanel key={comment.id} comment={comment} />
      )}
      {loading.value && <Spinner />}
    </div>
  );
}

function MutableCommentPanel({ comment, city, setFlash }: { comment: Comment; city: string; setFlash: (fm: FlashMessage) => void }) {
  const commentSignal = useSignal(comment);
  const [editMode, setEditMode] = useState(false);
  const loading = useSignal(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    loading.value = true;

    fetch(ROUTES.editComment(city, comment.postId, comment.id), {
      method: "post",
      body: formData,
      headers: { ContentType: "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then((json) => {
        target.reset();
        commentSignal.value = json.comment;
        loading.value = false;
        setFlash({ message: "Kommentaren uppdaterades", status: "success" });
        setEditMode(false);
      })
      .catch((err) => {
        loading.value = false;
        setEditMode(false);
        setFlash({ message: "Kunde inte uppdatera din kommentar. Kontrollera inmatningen", status: "error" });
        console.error(err);
      });
  }

  if (editMode) {
    return (
      <CommentForm
        onSubmit={onSubmit}
        initialText={commentSignal.value.text}
        buttonTitle="Spara"
        cancelCallback={() => setEditMode(false)}
        loading={loading.value}
      />
    );
  }

  return (
    <CommentPanel comment={commentSignal.value}>
      <ul class="flex flex-row gap-2">
        <EditButton callback={() => setEditMode(true)} />
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

type CommentFormProps = {
  onSubmit: (e: SubmitEvent) => void;
  loading: boolean;
  initialText?: string;
  cancelCallback?: () => void;
  buttonTitle?: string;
};

function CommentForm({ onSubmit, loading, initialText, cancelCallback, buttonTitle }: CommentFormProps) {
  return (
    <form class="rounded-md border p-4" onSubmit={onSubmit}>
      <AutoSizeTextArea name="text" defaultValue={initialText} placeholder="Lägg till en kommentar" rows={1} />
      <div class="my-1 flex flex-row justify-end gap-2">
        {cancelCallback && <button type="button" onClick={cancelCallback} class="btn btn-outline btn-sm">Avbryt</button>}
        <button disabled={loading} type="submit" tabindex={0} class="btn btn-primary btn-sm">{buttonTitle ?? "Skicka"}</button>
      </div>
      {loading && <Spinner />}
    </form>
  );
}

function EditButton({ callback }: { callback: () => void }) {
  return (
    <li>
      <button onClick={callback}>
        <Pencil class="w-5" />
      </button>
    </li>
  );
}
