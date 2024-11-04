import { Metadata } from "next";

import getTournamentStats from "@/lib/actions/getTournamentStats";
import getHeroes from "@/lib/actions/getHeroes";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Get the latest statistics of win rates, pick rates, ban rates of heroes in Mobile Legends: Bang Bang",
  openGraph: {
    title: "Statistics",
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes in Mobile Legends: Bang Bang",
    url: "https://mlbb.fyi/wiki/patches",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Statistics",
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes in Mobile Legends: Bang Bang",
    ...defaultTwitterMD,
  },
};

async function StatisticsPage() {
  const heroes = await getHeroes();
  const tourneyStats = await getTournamentStats();

  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer heroes={heroes} tourneyStats={tourneyStats} />
    </TabsContent>
  );
}

export default StatisticsPage;
