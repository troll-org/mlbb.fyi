import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { TabsContent } from "@/components/shared/tabs";

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

async function TierPage({ children }: { children: React.ReactNode }) {
  return (
    <TabsContent
      value="tier-list"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      {children}
    </TabsContent>
  );
}

export default TierPage;
