import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { TabsContent } from "@/components/shared/tabs";
import TournamentsPopover from "@/app/wiki/statistics/_components/tournaments-popover";
import { getAllTournamentsName } from "@/lib/actions/tournaments";

export const metadata: Metadata = {
  title: {
    template: "%s - mlbb.fyi",
    default: "mlbb.fyi Statistics",
  },
  description:
    "Get the latest Mobile Legends (MLBB) statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Statistics",
    },
    description:
      "Get the latest Mobile Legends (MLBB) statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
    url: "https://mlbb.fyi/wiki/statistics",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Statistics",
    },
    description:
      "Get the latest Mobile Legends (MLBB) statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
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
