import getHeroStats from "@/lib/actions/getHeroStats";
import {
  getAllHeroStatsByTournamentPath,
  getAllHeroTournaments,
  getAllTournamentsName,
} from "@/lib/actions/tournaments";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const data = await getAllHeroStatsByTournamentPath(
    "672d7fc56903402ff502cb02"
  );

  return NextResponse.json(data, {
    status: 200,
  });
}
