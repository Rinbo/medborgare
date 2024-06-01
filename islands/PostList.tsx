import { useSignal } from "@preact/signals";
import { Post } from "kv/posts.ts";
import PostPreview from "components/posts/PostPreview.tsx";
import { useEffect } from "preact/hooks";
import { ROUTES } from "route-utils";
import Spinner from "components/Spinner.tsx";

const SCROLL_TRIGGER_OFFSET = 800;

type Props = { initialPosts: Post[]; initialCursor: string; city: string };

export default function PostList({ initialPosts, initialCursor, city }: Props) {
  const posts = useSignal(initialPosts);
  const cursor = useSignal(initialCursor);
  const wait = useSignal(false);

  useEffect(() => {
    globalThis.addEventListener("scroll", onScroll);
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    (globalThis.scrollY > scrollThreshold()) && !wait.value && cursor.value && fetchMore();
  }

  function scrollThreshold() {
    return document.body.scrollHeight - globalThis.innerHeight - SCROLL_TRIGGER_OFFSET;
  }

  function fetchMore() {
    wait.value = true;
    fetch(ROUTES.fetchMorePosts(city, cursor.value), { headers: { ContentType: "application/json" } })
      .then((res) => res.json())
      .then((json) => {
        const data = json.data;
        cursor.value = data.cursor;
        posts.value = [...posts.value, ...data.posts];
        wait.value = false;
      })
      .catch((err) => {
        console.error(err);
        wait.value = false;
      });
  }

  return (
    <div>
      {wait.value && <Spinner />}
      {posts.value.map((post) => <PostPreview post={post} />)}
    </div>
  );
}
