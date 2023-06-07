import getCurrentUser from "@/lib/actions/getCurrentUser";
import Image from "next/image";
import getUser from "@/lib/actions/getUser";
import Link from "next/link";
import FolDialog from "@/components/fol-dialog";
import getCurrentPost from "@/lib/actions/getCurrentPost";
import PostForm from "@/components/explore/post-form";
import { Edit3, Trash2 } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getCurrentPost(params.postId);
  const currUser = await getCurrentUser();

  if (post) {
    const user = await getUser(post.createdBy);
    return (
      <div>
        <p className="text-4xl font-bold">{post?.title}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="mb-3 mt-8 flex flex-row items-center">
            <Image
              src={
                user?.image?.split("/image/upload/")[0] +
                  "/image/upload/c_fill,h_150,w_150/" +
                  user?.image?.split("/image/upload/")[1] || "/nana.jpg"
              }
              alt=""
              width={40}
              height={40}
              className="mr-4 object-none object-left"
              placeholder="blur"
              blurDataURL={
                user?.image?.split("/image/upload/")[0] +
                "/image/upload/e_blur:400,h_100,w_100/" +
                user?.image?.split("/image/upload/")[1]
              }
            />
            <Link href={`/profile/${post.createdBy}/statistics`}>
              <p className="font-semibold">{post?.createdBy}</p>
            </Link>
          </div>
          {currUser?.username === user?.username && (
            <div className="flex flex-row">
              <FolDialog title="Edit" triggerChild={<Edit3 className="mr-5" />}>
                Test
              </FolDialog>
              <Trash2 />
            </div>
          )}
        </div>
        <div className="divide-y divide-gray-100/50">
          <div className="mb-8 ml-14">
            <p>{post?.body}</p>
          </div>
          <p className="text-xl">Comments:</p>
        </div>
      </div>
    );
  }

  return <div>Post does not exist</div>;
}