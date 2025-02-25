import { Metadata } from "next";
import { getCurrentUser } from "@/lib/actions/user";
import getUser from "@/lib/actions/user";
import { isUserBound } from "@/lib/actions/user";
import { NextResponse } from "next/server";
import ProfileBio from "@/app/profile/_components/profile-bio/bio";
import ProfileTab from "@/app/profile/_components/profile-tab";

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return {
    alternates: {
      canonical: "https://mlbb.fyi/profile/" + params.username,
    },
    metadataBase: new URL("https://mlbb.fyi"),
    title: `@${params.username}`,
    description:
      "Access hero statistics, optimal builds, and connect with a community of expert players.",
    openGraph: {
      title: `@${params.username}`,
      description:
        "Access hero statistics, optimal builds, and connect with a community of expert players.",
      url: "https://mlbb.fyi",
      siteName: "mlbb.fyi",
      images: [
        {
          url: "/og.jpg",
          width: 1260,
          height: 600,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `@${params.username} - mlbb.fyi`,
      description:
        "Access hero statistics, optimal builds, and connect with a community of expert players.",
      images: ["/og.jpg"],
    },
  };
}

const ProfileTabList = [
  {
    name: "Statistics",
    href: "/statistics",
  },
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Favourites",
    href: "/favourites",
  },
];

export interface LayoutProfileProps {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}

export default async function LayoutProfile(props: LayoutProfileProps) {
  const params = await props.params;

  const { children } = props;

  const { username } = params;

  const currentUser = await getCurrentUser();

  if (currentUser && !currentUser.username) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/settings`)
    );
  }

  const isExistingUser = await getUser(username);

  let isBoundProfile = await isUserBound(username);
  if (!isBoundProfile) {
    isBoundProfile = null;
  }

  const isOwnProfile = currentUser?.username === isExistingUser?.username;
  if (!isExistingUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 font-heading text-2xl md:ml-3">
          Profile does not exist...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-[1280px] pt-0 md:pt-24 xl:mx-auto">
      <div className="flex flex-col gap-1.5 md:flex-row">
        <ProfileBio
          currentUser={currentUser}
          user={isExistingUser}
          mlbbAcc={isBoundProfile}
          isOwnProfile={isOwnProfile}
        />

        <ProfileTab
          ProfileTabList={ProfileTabList}
          isExistingUser={isExistingUser}
        >
          {children}
        </ProfileTab>
      </div>
    </main>
  );
}
