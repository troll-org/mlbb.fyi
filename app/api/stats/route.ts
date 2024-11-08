import getHeroStats from "@/lib/actions/getHeroStats";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  return NextResponse.json(await getHeroStats("672cf067011940fcc7cc0c57"), {
    status: 200,
  });
}
