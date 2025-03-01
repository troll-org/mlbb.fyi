import { getCurrentUser } from "@/lib/actions/user";
import getUser from "@/lib/actions/user";

import Post from "@/app/explore/_components/post/post";
import { IFullPost } from "@/types";

async function getPost(postId: string) {
  const get = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/info?postId=${postId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return await get.json();
}

export default async function PostPage(props: {
  params: Promise<{ postId: string }>;
}) {
  const params = await props.params;
  const postId = params.postId;
  const post: IFullPost = await getPost(postId);
  const currentUser = await getCurrentUser();

  if (post) {
    const user = await getUser(post.createdBy);
    return <Post currentUser={currentUser} post={post} user={user} />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="mb-48 font-heading text-2xl md:ml-3">
        Post does not exist...
      </p>
    </div>
  );
}
