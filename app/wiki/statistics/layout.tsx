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
    "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Statistics",
    },
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
    url: "https://mlbb.fyi/wiki/statistics",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Statistics",
    },
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
    ...defaultTwitterMD,
  },
  keywords: [
    "Mobile Legends statistics",
    "Mobile Legends Bang Bang statistics",
    "MLBB statistics",
    "Mobile Legends hero statistics",
    "MLBB hero statistics",
    "Mobile Legends win rates",
    "MLBB win rates",
    "Mobile Legends pick rates",
    "MLBB pick rates",
    "Mobile Legends ban rates",
    "MLBB ban rates",
    "Mobile Legends tournament stats",
    "MLBB tournament stats",
    "Mobile Legends hero analytics",
    "Mobile Legends hero performance",
    "MLBB hero analysis",
    "Mobile Legends esports stats",
    "MLBB esports statistics",
    "Mobile Legends pro player stats",
    "MLBB pro player analytics",
    "Mobile Legends draft statistics",
    "MLBB draft analytics",
    "Mobile Legends hero picks and bans",
    "MLBB hero picks and bans",
    "Mobile Legends team statistics",
    "MLBB team performance",
    "Mobile Legends global statistics",
    "MLBB global analytics",
    "Mobile Legends tournament win rates",
    "MLBB tournament pick rates",
    "MLBB tournament ban rates",
    "Mobile Legends meta statistics",
    "MLBB meta trends",
    "Mobile Legends competitive stats",
    "MLBB competitive statistics",
    "Mobile Legends championship statistics",
    "MLBB championship analytics",
    "Mobile Legends hero rankings",
    "MLBB hero rankings",
    "Mobile Legends live tournament data",
    "MLBB live tournament stats",
    "Mobile Legends player statistics",
    "MLBB player performance",
    "Mobile Legends hero power rankings",
    "MLBB hero power analytics",
    "Mobile Legends latest statistics",
    "MLBB stats updates",
    "Mobile Legends ranked analytics",
    "MLBB ranked performance",
    "Mobile Legends esport statistics",
    "MLBB esport analytics",
    "Mobile Legends tournament data",
    "MLBB tournament data insights",
    "Mobile Legends match statistics",
    "MLBB match analysis",
    "Mobile Legends game statistics",
    "MLBB game analytics",
    "Mobile Legends team win rates",
    "MLBB team pick rates",
    "Mobile Legends skill stats",
    "MLBB skill performance",
    "Mobile Legends player stats leaderboard",
    "MLBB hero pick rate trends",
    "Mobile Legends esport win rates",
    "MLBB esports pick and ban statistics",
    "Mobile Legends performance insights",
    "MLBB hero effectiveness data",
    "Mobile Legends top hero stats",
    "MLBB hero tier statistics",
    "Mobile Legends MVP stats",
    "MLBB major tournament statistics",
    "Mobile Legends player metrics",
    "MLBB player analytics",
  ],
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
