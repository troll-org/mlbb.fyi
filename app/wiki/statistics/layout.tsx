import { Metadata } from "next";

import getTournamentStats from "@/lib/actions/getTournamentStats";
import getHeroes from "@/lib/actions/getHeroes";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";
import { getAllTournamentsName } from "@/lib/actions/tournaments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { redirect } from "next/navigation";

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

async function StatisticsPage({ children }: { children: React.ReactNode }) {
  const tourNames = await getAllTournamentsName();

  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer tourNames={tourNames}> {children} </StatsContainer>
    </TabsContent>
  );
}

export default StatisticsPage;
