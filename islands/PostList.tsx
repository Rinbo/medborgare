import { useSignal } from "@preact/signals";
import { Post } from "kv/posts.ts";
import PostPreview from "components/posts/PostPreview.tsx";

type Props = { initialPosts: Post[]; cursor: string };

export default function PostList({ initialPosts }: Props) {
  const posts = useSignal(initialPosts);

  function addToList() {
    const length = posts.value.length;
    posts.value = [{
      title: "Added Title " + posts.value.length,
      body: "Some more body text",
      updatedAt: "",
      createdAt: "2024",
      userId: "123",
      userName: "Ghost user",
      city: "arboga",
      id: "id-" + length,
    }, ...posts.value];
  }

  return (
    <div>
      <button onClick={addToList} class="btn btn-primary my-4 w-full">Add something to list</button>
      {posts.value.map((post) => <PostPreview post={post} />)}
    </div>
  );
}
