import getHeroes from "@/lib/actions/getHeroes";

import { NewHero } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Heroes",
  description: "List of all heroes in Mobile Legends: Bang Bang",
  openGraph: {
    title: "Heroes",
    description: "List of all heroes in Mobile Legends: Bang Bang",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Heroes",
    description: "List of all heroes in Mobile Legends: Bang Bang",
    ...defaultTwitterMD,
  },
};

async function HeroesPage() {
  const heroes = await getHeroes({
    select: "-heroDetails -heroImageOriginUrl",
  });

  return (
    <TabsContent
      value="heroes"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <HeroesContainer heroes={heroes} />
    </TabsContent>
  );
}

export default HeroesPage;
