import { Metadata } from "next";

import getHeroes from "@/lib/actions/getHeroes";
import { Hero } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import TierContainer from "@/components/wiki/tier-list/tier-list-container";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Tier List",
  description: "Tier List of all heroes in Mobile Legends: Bang Bang",
  openGraph: {
    title: "Tier List",
    description: "Tier List of all heroes in Mobile Legends: Bang Bang",
    url: "https://mlbb.fyi/wiki/tier-list",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Tier List",
    description: "Tier List of all heroes in Mobile Legends: Bang Bang",
    ...defaultTwitterMD,
  },
};

async function TierListPage() {
  const heroes: Hero[] | null = await getHeroes();
  return (
    <TabsContent
      value="tier-list"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <TierContainer heroes={heroes} />
    </TabsContent>
  );
}

export default TierListPage;
