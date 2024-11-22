import { getCurrentUser } from "@/lib/actions/user";
import getUser from "@/lib/actions/user";
import { getMlbbData, isUserBound } from "@/lib/actions/user";

import { notFound } from "next/navigation";
import { TabsContent } from "@/components/shared/tabs";

import Statistics from "@/app/profile/_components/profile-stats/statistics";
import ProfileList from "@/app/profile/_components/profile-list";
import { Link2 } from "lucide-react";

async function SubProfilePage(props: {
  params: Promise<{ username: string; subProfile: string }>;
}) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const profileUsername = params.username;
  const isExistingUser = await getUser(profileUsername);

  let isBoundProfile = await isUserBound(profileUsername);
  let dataAcc;
  if (!isBoundProfile) {
    isBoundProfile = null;
  } else {
    dataAcc = await getMlbbData(isBoundProfile.accId);
  }
  const isOwnProfile = currentUser?.username === isExistingUser?.username;
  const hasPosts = isExistingUser?.posts.length !== 0;
  const hasFavs = isExistingUser?.favourite.length !== 0;

  if (
    params.subProfile !== "statistics" &&
    params.subProfile !== "posts" &&
    params.subProfile !== "favourites"
  ) {
    notFound();
  }

  return (
    <TabsContent
      value={params.subProfile}
      className="flex w-full flex-col justify-center gap-1.5 md:flex-row"
    >
      {params.subProfile === "statistics" && (
        <div className="flex w-full flex-col gap-1.5">
          {isBoundProfile ? (
            <Statistics
              viewMatchPlayed={dataAcc?.matchPlayed}
              viewOwnedHero={dataAcc?.heroOwned}
              isBound={isBoundProfile ? true : false}
            />
          ) : (
            <div className="mt-4 flex flex-col items-center justify-center md:mt-40">
              <Link2 className="h-10 w-10 md:h-16 md:w-16" />
              <p className="text-md text-center font-heading md:text-2xl">
                Mobile Legends account hasn&apos;t been bound yet
              </p>
            </div>
          )}
        </div>
      )}

      {params.subProfile === "posts" && (
        <ProfileList
          username={params.username}
          type="post"
          isOwnProfile={isOwnProfile}
          hasPosts={hasPosts}
          currentUser={currentUser}
        />
      )}

      {params.subProfile === "favourites" && (
        <ProfileList
          username={params.username}
          type="favourite"
          isOwnProfile={isOwnProfile}
          hasPosts={hasFavs}
          currentUser={currentUser}
        />
      )}
    </TabsContent>
  );
}

export default SubProfilePage;
