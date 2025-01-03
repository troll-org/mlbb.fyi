import { getCurrentUser } from "@/lib/actions/user";
import prisma from "@/lib/prismadb";

import RandomUserContainer from "@/app/explore/_components/random-user-container";
import PostListContainer from "@/app/explore/_components/post-list-container";

export const metadata = {
  metadataBase: new URL("https://mlbb.fyi"),
  title: "Explore",
  description:
    "Access hero statistics, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "Explore - mlbb.fyi",
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
    title: "Explore - mlbb.fyi",
    description:
      "Access hero statistics, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

async function getInitialRandomUsers() {
  const currentUser = await getCurrentUser();
  const productsCount = await prisma.user.count();
  const skip = Math.floor((Math.random() * productsCount) / 2) + 1;

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: {
          in: [
            ...(currentUser?.id ? [currentUser.id] : []),
            ...(currentUser?.following || []),
          ],
        },
      },
      username: {
        not: null,
      },
    },
    take: 10,
    skip: skip,
    orderBy: {
      name: "desc",
    },
  });

  return users;
}

export default async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const randomUsers = await getInitialRandomUsers();

  return (
    <div className="relative flex w-full gap-1.5">
      <PostListContainer currentUser={currentUser} />
      <RandomUserContainer randomUsers={randomUsers} />
    </div>
  );
}
