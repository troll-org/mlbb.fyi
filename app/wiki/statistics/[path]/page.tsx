import StatsDetailContent from "@/app/wiki/statistics/_components/content";
import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";

async function TournamentsDetailPage({
  params,
  searchParams,
}: {
  params: {
    path: string;
  };
  searchParams: {
    q?: string;
    type?: string;
    lane?: string;
  };
}) {
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return (
    <StatsDetailContent tournamentData={tournamentData} query={searchParams} />
  );
}

export default TournamentsDetailPage;
