import getHeroStats from "@/lib/actions/getHeroStats";
import { getOneHero } from "@/lib/actions/getHeroes";
import HeroDetails from "@/app/wiki/heroes/_components/hero-details";
import { getHeroTier } from "@/lib/actions/getHeroTier";
import { redirect } from "next/navigation";

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
