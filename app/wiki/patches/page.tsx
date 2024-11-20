import getPatches from "@/lib/actions/patches";

import { Patch } from "@prisma/client";
import { Metadata } from "next";

import { TabsContent } from "@/components/shared/tabs";
import PatchesContainer from "@/app/wiki/patches/_components/patches-container";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Patches",
  description: "List of all patches in Mobile Legends: Bang Bang",
  openGraph: {
    title: "Patches",
    description: "List of all patches in Mobile Legends: Bang Bang",
    url: "https://mlbb.fyi/wiki/patches",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Patches",
    description: "List of all patches in Mobile Legends: Bang Bang",
    ...defaultTwitterMD,
  },
  keywords: [
    "Mobile Legends patches",
    "MLBB patches",
    "Mobile Legends patch notes",
    "MLBB patch updates",
    "Mobile Legends patch history",
    "MLBB patch list",
    "Mobile Legends update notes",
    "Mobile Legends version updates",
    "MLBB latest patch",
    "Mobile Legends balance changes",
    "MLBB hero adjustments",
    "Mobile Legends patch schedule",
    "Mobile Legends patch breakdown",
    "MLBB patch analysis",
    "Mobile Legends bug fixes",
    "MLBB new features",
    "Mobile Legends hero nerfs",
    "Mobile Legends hero buffs",
    "MLBB hero rework",
    "Mobile Legends update details",
    "Mobile Legends patch highlights",
    "MLBB system updates",
    "Mobile Legends item changes",
    "Mobile Legends patch overview",
    "MLBB meta changes",
    "Mobile Legends patch versions",
    "MLBB gameplay adjustments",
    "Mobile Legends update logs",
    "Mobile Legends balance updates",
    "MLBB latest version notes",
    "Mobile Legends event updates",
    "MLBB patch release dates",
    "Mobile Legends version history",
    "Mobile Legends patch comparisons",
    "MLBB patch content",
    "Mobile Legends update features",
    "MLBB hero tweaks",
    "Mobile Legends game updates",
    "Mobile Legends patch insights",
    "MLBB patch reviews",
    "Mobile Legends item updates",
    "Mobile Legends hero balance",
    "Mobile Legends game improvements",
    "MLBB patch timelines",
    "Mobile Legends official patch notes",
    "MLBB patch cycle",
    "Mobile Legends update roadmap",
    "Mobile Legends hero skill adjustments",
    "MLBB gameplay tweaks",
    "Mobile Legends patch overview",
    "MLBB hero stat changes",
    "Mobile Legends equipment updates",
    "MLBB map updates",
    "Mobile Legends season updates",
    "MLBB official updates",
    "Mobile Legends rebalancing patches",
    "MLBB hotfix updates",
    "Mobile Legends patch logs",
    "Mobile Legends feature additions",
    "MLBB hero nerfs and buffs",
    "Mobile Legends patch cycle details",
    "MLBB patch optimization",
    "Mobile Legends skill reworks",
    "MLBB new content in patches",
    "Mobile Legends hero fixes",
    "MLBB seasonal patch updates",
    "Mobile Legends system improvements",
    "MLBB latest hero adjustments",
    "Mobile Legends update changes",
    "MLBB hero roles rebalancing",
    "Mobile Legends patch note analysis",
    "MLBB version tracking",
    "Mobile Legends patch summary",
    "MLBB official changelog",
    "Mobile Legends meta shifts",
    "MLBB patch evolution",
    "Mobile Legends patch impact",
    "MLBB competitive patch changes",
    "Mobile Legends patch tweaks",
    "Mobile Legends patch exploration",
    "MLBB major updates",
    "Mobile Legends game patches",
  ],
};

async function PatchesPage() {
  const patches: Patch[] | null = await getPatches();

  return (
    <TabsContent
      value="patches"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <PatchesContainer patches={patches} />
    </TabsContent>
  );
}

export default PatchesPage;
