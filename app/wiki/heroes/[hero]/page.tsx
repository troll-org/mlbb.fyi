import getHeroStats from "@/lib/actions/getHeroStats";
import { getOneHero } from "@/lib/actions/getHeroes";
import HeroDetails from "@/app/wiki/heroes/_components/hero-details";
import { getHeroTier } from "@/lib/actions/getHeroTier";
import getEquipmentsByHeroId from "@/lib/actions/getHeroEquipments";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { defaultOpenGraphMD } from "@/lib/configs/metadata";

async function formatHeroName(slug: string): Promise<string> {
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata(props: {
  params: Promise<{ hero: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const heroName = await formatHeroName(params.hero);

  const title = `${heroName} - Mobile Legends: Bang Bang (MLBB) Heroes`;

  return {
    title,
    description: `Get the latest MLBB ${heroName} stats! Discover win rates, tier rankings, optimal builds, and counter strategies. Master ${heroName} now!`,
    openGraph: {
      title,
      description: `Get the latest MLBB ${heroName} stats! Discover win rates, tier rankings, optimal builds, and counter strategies. Master ${heroName} now!`,
      url: `https://mlbb.fyi/wiki/heroes/${params.hero}`,
      ...defaultOpenGraphMD,
    },
    twitter: {
      title,
      description: `Get the latest MLBB ${heroName} stats! Discover win rates, tier rankings, optimal builds, and counter strategies. Master ${heroName} now!`,
      ...defaultOpenGraphMD,
    },
  };
}

export default async function HeroPage(props: {
  params: Promise<{ hero: string }>;
}) {
  const params = await props.params;
  const hero = await getOneHero(params?.hero);

  if (!hero) {
    redirect("/not-found");
  }

  const heroStats = await getHeroStats(hero?._id.toString());
  const heroTier = await getHeroTier(hero?._id.toString());
  const heroEquipment = await getEquipmentsByHeroId(hero?._id.toString());

  return (
    <HeroDetails
      hero={hero}
      heroStats={heroStats}
      heroTier={heroTier}
      heroEquipment={heroEquipment}
    />
  );
}
