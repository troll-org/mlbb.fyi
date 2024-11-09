import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import React from "react";

async function TournamentsDetailPage({
  params,
}: {
  params: {
    path: string;
  };
}) {
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return <div>TournamentsDetailPage: {tournamentData.tournamentName}</div>;
}

export default TournamentsDetailPage;
