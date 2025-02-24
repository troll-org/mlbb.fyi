import TierContainer from "@/app/wiki/tier-list/(static)/[path]/_components/tier-list-container";
import { pageList } from "@/app/wiki/tier-list/(static)/[path]/config";
import { getHeroTierWithNames } from "@/lib/actions/getHeroTier";
import { defaultOpenGraphMD } from "@/lib/configs/metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata(props: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const pagePath = (await props.params).path;

  const isIn = pageList.map((x) => x.path).includes(pagePath);
  if (!isIn) return notFound();

  const pageConfig = pageList.find((x) => x.path === pagePath);
  if (!pageConfig) return notFound();

  const title = pageConfig.title;

  return {
    title,
    description: `Stay ahead of the meta! Get the latest and most accurate ${pageConfig.name} tier list for Mobile Legends: Bang Bang (MLBB) 2025. Discover the top heroes and strategies.`,
    openGraph: {
      title,
      description: `Stay ahead of the meta! Get the latest and most accurate ${pageConfig.name} tier list for Mobile Legends: Bang Bang (MLBB) 2025. Discover the top heroes and strategies.`,
      url: `https://mlbb.fyi/wiki/tier-list/${params.path}`,
      ...defaultOpenGraphMD,
    },
    twitter: {
      title,
      description: `Stay ahead of the meta! Get the latest and most accurate ${pageConfig.name} tier list for Mobile Legends: Bang Bang (MLBB) 2025. Discover the top heroes and strategies.`,
      ...defaultOpenGraphMD,
    },
    keywords: pageConfig.keywords,
  };
}

async function BestExpLane(props: { params: Promise<{ path: string }> }) {
  const pagePath = (await props.params).path;

  const isIn = pageList.map((x) => x.path).includes(pagePath);
  if (!isIn) return notFound();

  const pageConfig = pageList.find((x) => x.path === pagePath);
  if (!pageConfig) return notFound();

  const heroes = await getHeroTierWithNames({
    select:
      "-_id -combinedScore -currentMetaScore -currentMetaStats -tournamentScore -tournamentStats -updatedAt",
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <TierContainer heroes={heroes} laneType={pageConfig.laneType} />
    </div>
  );
}

export default BestExpLane;
