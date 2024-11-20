import getHeroStats from "@/lib/actions/getHeroStats";
import { getOneHero } from "@/lib/actions/getHeroes";
import HeroDetails from "@/app/wiki/heroes/_components/hero-details";
import { getHeroTier } from "@/lib/actions/getHeroTier";
import { redirect } from "next/navigation";
import { Metadata } from "next";

async function formatHeroName(slug: string): Promise<string> {
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { hero: string };
}): Promise<Metadata> {
  const title = await formatHeroName(params.hero);

  const dynamicKeywords = [
    `${title} hero statistics`,
    `${title} Mobile Legends guide`,
    `${title} MLBB guide`,
    `${title} hero builds`,
    `${title} recommended equipment`,
    `${title} hero abilities`,
    `${title} hero role`,
    `${title} hero counters`,
    `${title} hero synergies`,
    `${title} win rates`,
    `${title} pick rates`,
    `${title} ban rates`,
    `${title} performance analysis`,
    `${title} pro builds`,
    `${title} tier ranking`,
    `${title} gameplay tips`,
    `${title} hero spotlight`,
    `How to play ${title}`,
    `${title} Mobile Legends stats`,
    `${title} MLBB hero tier`,
    `${title} Mobile Legends gameplay`,
    `${title} hero combos`,
    `Best items for ${title}`,
    `${title} Mobile Legends hero`,
    `Meta analysis for ${title}`,
    `Counters for ${title}`,
    `Best matchups for ${title}`,
    `Builds to dominate with ${title}`,
    `Optimal equipment for ${title}`,
    `Skill breakdown for ${title}`,
    `${title} tier list placement`,
    `Pro tips for ${title}`,
    `${title} Mobile Legends strategies`,
    `Advanced strategies for ${title}`,
    `Playstyle tips for ${title}`,
    `${title} MLBB win conditions`,
    `Effective team comps with ${title}`,
    `${title} Mobile Legends nerfs`,
    `${title} hero buffs`,
    `Patch updates for ${title}`,
    `${title} MLBB item builds`,
    `Effective counters to ${title}`,
    `Best roles for ${title}`,
    `${title} match performance`,
    `${title} hero strengths`,
    `${title} hero weaknesses`,
    `${title} Mobile Legends tips and tricks`,
    `${title} hero mastery`,
    `${title} Mobile Legends esports insights`,
    `${title} gameplay adjustments`,
  ];

  return {
    title,
    description: `Discover detailed statistics, tier information, and other insights about ${title} in Mobile Legends: Bang Bang.`,
    keywords: [
      "Mobile Legends heroes",
      "MLBB heroes",
      "Mobile Legends hero guides",
      ...dynamicKeywords,
    ],
    openGraph: {
      title,
      description: `Explore ${title}'s win rates, pick rates, ban rates, and tier rankings in Mobile Legends: Bang Bang.`,
      url: `https://mlbb.fyi/wiki/heroes/${params.hero}`,
    },
    twitter: {
      title: `${title} - mlbb.fyi Hero`,
      description: `Learn more about ${title}'s performance in Mobile Legends: Bang Bang.`,
    },
  };
}

export default async function HeroPage({
  params,
}: {
  params: { hero: string };
}) {
  const hero = await getOneHero(params?.hero);

  if (!hero) {
    redirect("/not-found");
  }

  const heroStats = await getHeroStats(hero?._id.toString());
  const heroTier = await getHeroTier(hero?._id.toString());

  return <HeroDetails hero={hero} heroStats={heroStats} heroTier={heroTier} />;
}
