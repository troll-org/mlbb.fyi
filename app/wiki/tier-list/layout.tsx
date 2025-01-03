import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { TabsContent } from "@/components/shared/tabs";

export const metadata: Metadata = {
  title: "Hero Tier List | Best Meta MLBB Heroes",
  description:
    "Uncover the definitive Mobile Legends: Bang Bang (MLBB) hero tier list. Get insights on top-performing heroes for every role, regularly updated with current meta trends. Access stats, builds, and expert tips to enhance your gameplay and rise through the ranks.",
  openGraph: {
    title: "Hero Tier List | Best Meta MLBB Heroes",
    description:
      "Uncover the definitive Mobile Legends: Bang Bang (MLBB) hero tier list. Get insights on top-performing heroes for every role, regularly updated with current meta trends. Access stats, builds, and expert tips to enhance your gameplay and rise through the ranks.",
    url: "https://mlbb.fyi/wiki/tier-list",
    ...defaultOpenGraphMD,
  },
  category: "Tier List",
  twitter: {
    title: "Hero Tier List | Best Meta MLBB Heroes",
    description:
      "Uncover the definitive Mobile Legends: Bang Bang (MLBB) hero tier list. Get insights on top-performing heroes for every role, regularly updated with current meta trends. Access stats, builds, and expert tips to enhance your gameplay and rise through the ranks.",
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
