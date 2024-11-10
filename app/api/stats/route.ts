import getHeroStats from "@/lib/actions/getHeroStats";
import {
  getAllHeroStatsByTournamentPath,
  getAllHeroTournaments,
  getAllTournamentsName,
} from "@/lib/actions/tournaments";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
