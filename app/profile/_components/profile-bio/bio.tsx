"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";

import { SafeUser } from "@/types";
import { MlbbAcc } from "@prisma/client";
import { User } from "@prisma/client";
import { getFetcher } from "@/lib/utils";

import { GradiantCard } from "../../../../components/shared/gradiant-card";
import { Button } from "../../../../components/shared/button";
import LoadingDots from "../../../../components/shared/icons/loading-dots";
import ProfileDesc from "./description";
import FollowingCount from "./following-count";
import IdentityHolder from "./identity";

interface ProfileBioProps {
  currentUser?: SafeUser | null;
  user: User | null;
  mlbbAcc?: MlbbAcc | null;
  isOwnProfile: boolean;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  currentUser,
  user,
  mlbbAcc,
  isOwnProfile,
}) => {
  const params = useParams();
  const { data: baseInfo, mutate } = useSWR<{
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  }>(`/profile/api/basic-info?username=${params?.username}`, getFetcher);

  const username = user?.username;
  const isCurrUserFollowing = currentUser?.following.includes(
    user?.id as string
  );

  const [isFollowing, setIsFollowing] = useState(isCurrUserFollowing);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <div className="flex h-full flex-grow flex-col md:sticky md:top-20 md:h-[560px]">
      <GradiantCard
        className="flex flex-col md:mx-0 md:max-w-[16rem]"
        variant="clean"
      >
        <IdentityHolder user={user} baseInfo={baseInfo} />
        {!isOwnProfile && !isFollowing && (
          <Button
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            variant="gradiantNavySec"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              setButtonDisabled(true);
              const set = await fetch(`/profile/api/follow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(true);
                setButtonDisabled(false);
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Follow"
            )}
          </Button>
        )}
        {!isOwnProfile && isFollowing && (
          <Button
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            onClick={async (e) => {
              e.preventDefault();
              setButtonDisabled(true);
              setLoading(true);
              const set = await fetch(`/profile/api/unfollow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(false);
                setButtonDisabled(false);
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Unfollow"
            )}
          </Button>
        )}
        <FollowingCount baseInfo={baseInfo} currentUser={currentUser} />
        {!mlbbAcc && isOwnProfile && (
          <Button
            className="mt-4 h-8 w-full rounded-2xl px-[10px] py-2"
            variant="gradiantNavySec"
          >
            <Link href="/settings/bind" className="text-[12px]">
              Bind account
            </Link>
          </Button>
        )}
      </GradiantCard>

      <ProfileDesc user={user} mlbbAcc={mlbbAcc} />
    </div>
  );
};

export default ProfileBio;
