import { getCurrentUser } from "@/lib/actions/user";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const {
    username,
    description,
    links,
  }: { username: string; description: string; links: string[] } =
    await req.json();

  const findUsername = await prisma.user.findFirst({
    where: {
      username: username.toLowerCase(),
    },
  });

  if (findUsername && findUsername?.id !== currentUser?.id) {
    return NextResponse.json(
      {
        message: "Username already exists",
      },
      {
        status: 400,
      }
    );
  }

  const uniqueLinks = new Set(links.filter((link) => link !== ""));
  if (
    uniqueLinks.size !==
    links.length - links.filter((link) => link === "").length
  ) {
    return NextResponse.json(
      {
        message: "Duplicated URLs detected",
      },
      {
        status: 400,
      }
    );
  }

  const isValidUrl = (url: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlPattern.test(url);
  };

  for (let i = 0; i < links.length; i++) {
    if (links[i] !== "" && !isValidUrl(links[i])) {
      return NextResponse.json(
        {
          message: "Invalid URL detected",
        },
        {
          status: 400,
        }
      );
    }
  }

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      username: username.toLowerCase(),
      desc: description,
      links: links,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error setting new updates",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successful, kindly wait before making more updates",
    },
    {
      status: 200,
    }
  );
}
