"use client";

import { SafeUser } from "@/types";
import { IFullPost } from "@/types";
import { User } from "@prisma/client";

import PostContent from "@/app/explore/_components/post/post-content";
import CommentList from "../comment/comment-list";
import CommentForm from "../comment/comment-form";

interface PostProps {
  currentUser: SafeUser | null;
  post: IFullPost;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <PostContent
        post={post}
        user={user}
        currUser={currentUser}
        comments={post?.comments}
      />
      {currentUser && (
        <CommentForm postId={post?.id || ""} img={currentUser?.image || ""} />
      )}
      <CommentList
        postId={post?.id || ""}
        userId={currentUser?.id}
        comments={post?.comments}
      />
    </div>
  );
};

export default Post;
