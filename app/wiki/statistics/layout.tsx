import { Metadata } from "next";

import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

import { TabsContent } from "@/components/shared/tabs";
import TournamentsPopover from "@/app/wiki/statistics/_components/tournaments-popover";
import { getAllTournamentsName } from "@/lib/actions/tournaments";

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
      <TournamentsPopover tourNames={tourNames}>{children}</TournamentsPopover>
    </TabsContent>
  );
}

export default StatisticsPage;
