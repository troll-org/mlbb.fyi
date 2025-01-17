import getHeroStats from "@/lib/actions/getHeroStats";
import { getOneHero } from "@/lib/actions/getHeroes";
import HeroDetails from "@/app/wiki/heroes/_components/hero-details";
import { getHeroTier } from "@/lib/actions/getHeroTier";
import getEquipmentsByHeroId from "@/lib/actions/getHeroEquipments";
import { redirect } from "next/navigation";
import { Metadata } from "next";

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
  const title = await formatHeroName(params.hero);

  return {
    title,
    description: `Discover detailed statistics, tier information, and other insights about Mobile Legends (MLBB) ${title}`,
    openGraph: {
      title,
      description: `Explore Mobile Legends (MLBB) ${title}'s win rates, pick rates, ban rates, and tier rankings `,
      url: `https://mlbb.fyi/wiki/heroes/${params.hero}`,
    },
    twitter: {
      title: `${title} - mlbb.fyi Hero`,
      description: `Learn more about Mobile Legends (MLBB) ${title}'s performance`,
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
