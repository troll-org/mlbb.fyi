import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import React from "react";
import { TabsContent } from "@/components/shared/tabs";

export const metadata: Metadata = {
  title: {
    template: "%s - mlbb.fyi",
    default: "mlbb.fyi Heroes",
  },
  description:
    "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends: Bang Bang heroes",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Heroes",
    },
    description:
      "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends: Bang Bang heroes",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Heroes",
    },
    description:
      "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends: Bang Bang heroes",
    ...defaultTwitterMD,
  },
  keywords: [
    "Mobile Legends heroes",
    "MLBB heroes",
    "Mobile Legends hero statistics",
    "MLBB hero statistics",
    "Mobile Legends hero builds",
    "MLBB hero builds",
    "Mobile Legends recommended equipment",
    "MLBB hero equipment",
    "Mobile Legends hero guide",
    "MLBB hero guide",
    "Mobile Legends hero abilities",
    "MLBB hero abilities",
    "Mobile Legends hero roles",
    "MLBB hero roles",
    "Mobile Legends tank heroes",
    "Mobile Legends marksman heroes",
    "Mobile Legends assassin heroes",
    "Mobile Legends mage heroes",
    "Mobile Legends support heroes",
    "Mobile Legends fighter heroes",
    "MLBB hero performance",
    "Mobile Legends hero win rates",
    "MLBB hero win rates",
    "Mobile Legends hero pick rates",
    "MLBB hero pick rates",
    "Mobile Legends hero ban rates",
    "MLBB hero ban rates",
    "Mobile Legends hero rankings",
    "MLBB hero rankings",
    "Mobile Legends hero tier list",
    "MLBB hero tier list",
    "Mobile Legends hero meta",
    "MLBB hero meta",
    "Mobile Legends hero comparisons",
    "MLBB hero comparisons",
    "Mobile Legends hero stats breakdown",
    "MLBB hero stats breakdown",
    "Mobile Legends pro hero builds",
    "MLBB pro hero builds",
    "Mobile Legends hero counters",
    "MLBB hero counters",
    "Mobile Legends hero skills",
    "MLBB hero skills",
    "Mobile Legends hero synergies",
    "MLBB hero synergies",
    "Mobile Legends best heroes",
    "MLBB best heroes",
    "Mobile Legends all heroes",
    "MLBB all heroes",
    "Mobile Legends hero recommendations",
    "MLBB hero recommendations",
    "Mobile Legends hero spotlight",
    "MLBB hero spotlight",
  ],
};

async function HeroesPage({ children }: { children: React.ReactNode }) {
  return (
    <TabsContent
      value="heroes"
      className="flex w-full flex-col gap-4 md:flex-row"
    >
      {children}
    </TabsContent>
  );
}

export default HeroesPage;
