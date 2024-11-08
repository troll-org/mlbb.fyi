import { Metadata } from "next";

import getHeroes from "@/lib/actions/getHeroes";
import { Hero } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import TierContainer from "@/components/wiki/tier-list/tier-list-container";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Tier List",
  description:
    "Discover the tier list of heroes in Mobile Legends based on win, pick, and ban rates from major tournaments. Access hero stats, builds, and join a community of expert players.",
  openGraph: {
    title: "Tier List",
    description:
      "Discover the tier list of heroes in Mobile Legends based on win, pick, and ban rates from major tournaments. Access hero stats, builds, and join a community of expert players.",
    url: "https://mlbb.fyi/wiki/tier-list",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Tier List",
    description:
      "Discover the tier list of heroes in Mobile Legends based on win, pick, and ban rates from major tournaments. Access hero stats, builds, and join a community of expert players.",
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
