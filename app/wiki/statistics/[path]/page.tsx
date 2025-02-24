import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import StatsDetailContent from "@/app/wiki/statistics/_components/content";
import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";

function formatTitle(slug: string): string {
  return slug.replace(/-/g, " ").toUpperCase();
}

export async function generateMetadata(props: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tourName = formatTitle(decodeURIComponent(params.path));
  const title = `${tourName} - Tournament MLBB`;

  return {
    title,
    description: `Analyze Mobile Legends: Bang Bang (MLBB) tournament hero stats from ${tourName}. Get detailed win rates, pick rates, and ban rates. See which heroes dominated the pro scene. Gain competitive insights.`,
    openGraph: {
      title,
      description: `Analyze Mobile Legends: Bang Bang (MLBB) tournament hero stats from ${tourName}. Get detailed win rates, pick rates, and ban rates. See which heroes dominated the pro scene. Gain competitive insights.`,
      url: `https://mlbb.fyi/wiki/statistics/${params.path}`,
      ...defaultOpenGraphMD,
    },
    twitter: {
      title,
      description: `Analyze Mobile Legends: Bang Bang (MLBB) tournament hero stats from ${tourName}. Get detailed win rates, pick rates, and ban rates. See which heroes dominated the pro scene. Gain competitive insights.`,
      ...defaultTwitterMD,
    },
  };
}

async function TournamentsDetailPage(props: {
  params: Promise<{
    path: string;
  }>;
}) {
  const params = await props.params;
  params.path = decodeURIComponent(params.path);
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return <StatsDetailContent tournamentData={tournamentData} />;
}

export default TournamentsDetailPage;
