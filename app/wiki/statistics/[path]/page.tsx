import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import StatsDetailContent from "@/app/wiki/statistics/_components/content";
import { getAllHeroStatsByTournamentPath } from "@/lib/actions/tournaments";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";

function formatTitle(slug: string): string {
  return slug.replace(/-/g, " ").toUpperCase();
}

export async function generateMetadata(
  props: {
    params: Promise<{ path: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const title = formatTitle(params.path);
  const dynamicKeywords = [
    `${title} tournament statistics`,
    `${title} hero statistics`,
    `${title} win rates`,
    `${title} pick rates`,
    `${title} ban rates`,
    `Hero performance analysis at ${title}`,
    `Detailed hero stats for ${title}`,
    `Pick and ban trends at ${title}`,
    `Meta trends and analysis at ${title}`,
    `Team performance rankings at ${title}`,
    `Player performance stats for ${title}`,
    `Hero rankings and performance at ${title}`,
    `Competitive insights for ${title}`,
    `Pro player data from ${title}`,
    `Draft analysis for ${title}`,
    `Patch impact on ${title} statistics`,
    `${title} esports insights`,
    `Power rankings after ${title}`,
    `${title} competitive hero picks`,
    `Win rate breakdown for ${title}`,
    `Performance insights for teams at ${title}`,
    `${title} detailed match data`,
    `${title} esports trends`,
    `Hero draft data from ${title}`,
    `${title} hero tier lists`,
    `${title} live match statistics`,
    `${title} hero usage analytics`,
    `Player win rates at ${title}`,
    `Esports trends for ${title}`,
    `${title} match analytics`,
    `${title} tournament MVP statistics`,
    `${title} esports meta shifts`,
    `${title} competitive hero usage`,
    `Top-performing heroes at ${title}`,
  ];

  return {
    title,
    description: `Get the win rates, pick rates, ban rates of heroes at ${title}`,
    keywords: [
      "Mobile Legends statistics",
      "MLBB statistics",
      "Mobile Legends tournament stats",
      "Mobile Legends hero stats",
      ...dynamicKeywords,
    ],
    openGraph: {
      title,
      description: `Get the win rates, pick rates, ban rates of heroes at ${title}`,
      url: `https://mlbb.fyi/wiki/statistics/${params.path}`,
      ...defaultOpenGraphMD,
    },
    twitter: {
      title,
      description: `Get the win rates, pick rates, ban rates of heroes at ${title}`,
      ...defaultTwitterMD,
    },
  };
}

async function TournamentsDetailPage(
  props: {
    params: Promise<{
      path: string;
    }>;
  }
) {
  const params = await props.params;
  const tournamentData: TournamentsDocument =
    await getAllHeroStatsByTournamentPath(params.path);

  return <StatsDetailContent tournamentData={tournamentData} />;
}

export default TournamentsDetailPage;
