import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { TabsContent } from "@/components/shared/tabs";

export const metadata: Metadata = {
  title: "Mobile Legends Heroes Tier List | Best Meta MLBB Heroes",
  description:
    "Discover the latest Mobile Legends: Bang Bang (MLBB) Hero Tier List. See top meta heroes, stats, and builds for every role. Updated daily to help you climb ranks!",
  openGraph: {
    title: "Mobile Legends Heroes Tier List | Best Meta MLBB Heroes",
    description:
      "Discover the latest Mobile Legends: Bang Bang (MLBB) Hero Tier List. See top meta heroes, stats, and builds for every role. Updated daily to help you climb ranks!",
    url: "https://mlbb.fyi/wiki/tier-list",
    ...defaultOpenGraphMD,
  },
  category: "Tier List",
  twitter: {
    title: "Mobile Legends Heroes Tier List | Best Meta MLBB Heroes",
    description:
      "Discover the latest Mobile Legends: Bang Bang (MLBB) Hero Tier List. See top meta heroes, stats, and builds for every role. Updated daily to help you climb ranks!",
    ...defaultTwitterMD,
  },
};

async function TierPage({ children }: { children: React.ReactNode }) {
  return (
    <TabsContent
      value="tier-list"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <h1 className="sr-only text-xl font-bold">Mobile Legend Tier List</h1>
      {children}
    </TabsContent>
  );
}

export default TierPage;
