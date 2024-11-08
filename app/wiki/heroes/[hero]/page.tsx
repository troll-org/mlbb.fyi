import getHeroBuild from "@/lib/actions/getHeroBuild";
import getHeroSpell from "@/lib/actions/getHeroSpell";
import getHeroEmblem from "@/lib/actions/getHeroEmblem";
import getHeroCounter from "@/lib/actions/getHeroCounter";
import getHeroCorr from "@/lib/actions/getHeroCorr";

import prisma from "@/lib/prismadb";
import Redirect from "@/components/redirect";
import getHeroStats from "@/lib/actions/getHeroStats";
import { getOneHero } from "@/lib/actions/getHeroes";
import HeroDetails from "@/components/wiki/heroes/hero-details";

async function findIndexById(arr: any[], targetId: string): Promise<number> {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
      return i;
    }
  }
  return -1;
}

export default async function HeroPage({
  params,
}: {
  params: { hero: string };
}) {
  const hero = await getOneHero(params?.hero);

  if (!hero) {
    return <Redirect destination="not-found" />;
  }

  const heroStats = await getHeroStats(hero?._id.toString());

  // const [heroBuild, heroSpell, heroEmblem, heroCounter, heroCorr] =
  //   await Promise.all([
  //     getHeroBuild(isExistingHero.id),
  //     getHeroSpell(isExistingHero.id),
  //     getHeroEmblem(isExistingHero.id),
  //     getHeroCounter(isExistingHero.id),
  //     getHeroCorr(isExistingHero.id),
  //   ]);

  // const strongAgainst = heroCorr.data?.map((item: any) => item.heroId) || [];

  return (
    <>
      <HeroDetails
        hero={hero}
        heroStats={heroStats[0]}
        // hero={hero}
        // heroBuild={heroBuild.data?.items || []}
        // heroSpell={heroSpell.data?.spells || []}
        // heroEmblem={heroEmblem.data?.emblems || []}
        // heroWeakAgainst={heroCounter.data?.counters || []}
        // heroBuild={[]}
        // heroSpell={[]}
        // heroEmblem={[]}
        // heroWeakAgainst={[]}
        // heroStrongAgainst={strongAgainst}
      />
    </>
  );
}
