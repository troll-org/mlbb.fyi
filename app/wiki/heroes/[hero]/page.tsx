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

  return {
    title,
    description: `Discover detailed statistics, tier information, and other insights about ${title} in Mobile Legends: Bang Bang`,
    openGraph: {
      title,
      description: `Explore ${title}'s win rates, pick rates, ban rates, and tier rankings in Mobile Legends: Bang Bang`,
      url: `https://mlbb.fyi/wiki/heroes/${params.hero}`,
    },
    twitter: {
      title: `${title} - mlbb.fyi Hero`,
      description: `Learn more about ${title}'s performance in Mobile Legends: Bang Bang`,
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
