import StatsDetailContent from "@/app/wiki/statistics/[path]/_components/content";
import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import React from "react";

async function TournamentsDetailPage({
  params,
  searchParams,
}: {
  params: {
    path: string;
  };
  searchParams: {
    q?: string;
  };
}) {
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return (
    <StatsDetailContent
      tournamentData={tournamentData}
      query={searchParams.q}
    />
  );
}

export default TournamentsDetailPage;
