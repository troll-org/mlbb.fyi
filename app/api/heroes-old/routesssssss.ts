import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getHeroes from "../../../lib/actions/getHeroes";

export async function GET(request: Request) {
  const heroesOld = await prisma.hero.findMany({});

  for (const old of heroesOld) {
    try {
      await prisma.newHero.update({
        where: {
          heroId: old.heroId,
        },
        data: {
          heroImg: old.img,
        },
      });
    } catch (error) {
      console.error(`Failed to update hero with ID ${old.heroId}:`, error);
      continue;
    }
  }

  return NextResponse.json(
    { ok: true },
    {
      status: 200,
    }
  );
}
