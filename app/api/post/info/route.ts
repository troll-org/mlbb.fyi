import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = req.url as string;
  try {
    const postId = url.split("?postId=")[1];
    if (!postId) {
      return NextResponse.json(
        {
          message: "There is no such post",
        },
        {
          status: 400,
        }
      );
    }

    const postInfo = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            replies: true,
          },
        },
      },
    });

    if (!postInfo) {
      return NextResponse.json(
        {
          message: "Unable to retrieve post info",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(postInfo);
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      {
        status: 400,
      }
    );
  }
}
