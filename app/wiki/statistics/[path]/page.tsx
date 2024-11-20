import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import StatsDetailContent from "@/app/wiki/statistics/_components/content";
import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";

function formatTitle(slug: string): string {
  return slug.replace(/-/g, " ").toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: { path: string };
}): Promise<Metadata> {
  const title = formatTitle(params.path);

  return {
    title,
    description: `Get the  win rates, pick rates, ban rates of heroes at ${title}`,
    openGraph: {
      title,
      description: `Get the  win rates, pick rates, ban rates of heroes at ${title}`,
      url: `https://mlbb.fyi/wiki/statistics/${params.path}`,
      ...defaultOpenGraphMD,
    },
    twitter: {
      title,
      description: `Get the  win rates, pick rates, ban rates of heroes at ${title}`,
      ...defaultTwitterMD,
    },
  };
}

async function TournamentsDetailPage({
  params,
}: {
  params: {
    path: string;
  };
}) {
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return <StatsDetailContent tournamentData={tournamentData} />;
}

export default TournamentsDetailPage;
