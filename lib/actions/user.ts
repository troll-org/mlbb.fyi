import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function getUser(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: true,
    },
  });
}

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString(),
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}

export async function getMlbbAcc(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findMlbbAcc = await prisma.mlbbAcc.findFirst({
      where: {
        userId: findUser?.id,
      },
    });

    return findMlbbAcc;
  } catch (error) {
    return null;
  }
}

export async function getMlbbData(accId: string | null) {
  try {
    const get = await fetch(
      `${process.env.BE_API_URL}/data?accId=${accId}&cmp=119`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BE_API_SECRET}`,
        },
      }
    );
    const res = await get.json();
    return res;
  } catch (error) {
    return null;
  }
}

export async function isUserBound(username: string) {
  try {
    const get = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    const mlbbAcc = await getMlbbAcc(get?.email || "");
    return mlbbAcc;
  } catch (error) {
    return null;
  }
}
