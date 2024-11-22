// @ts-nocheck
"use client";

import { useEffect } from "react";
import useSWR from "swr";

import { postFetcher } from "@/lib/utils";
import { Post } from "@prisma/client";

import PostBox from "../../explore/_components/post/post-box";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { MessagesSquare, Star } from "lucide-react";
import { SafeUser } from "@/types";

interface ProfileListProps {
  username: string;
  type: string;
  isOwnProfile: boolean;
  hasPosts: boolean;
  currentUser: SafeUser | null;
}

const ProfileList: React.FC<ProfileListProps> = ({
  username,
  type,
  isOwnProfile,
  hasPosts,
  currentUser,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: posts } = useSWR(
    [`/profile/api/${type}`, username],
    postFetcher
  );

  if (hasPosts) {
    return (
      <>
        {posts && posts.length > 0 && (
          <GradiantCard variant="clean">
            {posts?.map((post: Post, index: number) => (
              <PostBox
                post={post}
                posts={posts}
                index={index}
                currUser={currentUser}
                key={post.id}
              />
            ))}
          </GradiantCard>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {type === "post" && (
        <MessagesSquare className="mt-4 h-10 w-10 md:mt-40 md:h-16 md:w-16" />
      )}
      {type === "favourite" && (
        <Star className="mt-4 h-10 w-10 md:mt-40 md:h-16 md:w-16" />
      )}
      <p className="text-md text-center font-heading md:text-2xl">
        {isOwnProfile && type === "post"
          ? "You have yet to post something"
          : isOwnProfile && type === "favourite"
          ? "You have yet to star anything"
          : type === "post"
          ? "This user has no posts"
          : "This user has no favourite posts"}
      </p>
    </div>
  );
};

export default ProfileList;
