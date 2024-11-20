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
  keywords: [
    "Mobile Legends hero tier list",
    "Best Mobile Legends heroes",
    "Mobile Legends tier list",
    "Meta heroes Mobile Legends",
    "S-tier heroes Mobile Legends",
    "Mobile Legends hero rankings",
    "Strongest heroes in Mobile Legends",
    "Updated Mobile Legends tier list",
    "Mobile Legends A-tier heroes",
    "Top Mobile Legends characters",
    "Mobile Legends hero tier list 2024",
    "Best heroes for climbing rank in Mobile Legends",
    "How to choose heroes in Mobile Legends ranked mode",
    "S and A-tier Mobile Legends heroes explained",
    "Which Mobile Legends heroes are best for beginners?",
    "Mobile Legends strongest heroes for ranked",
    "Mobile Legends tier list for ranked gameplay",
    "Current Mobile Legends meta",
    "Best heroes for each role in Mobile Legends",
    "Mobile Legends heroes for high ELO",
    "Mobile Legends fighter tier list",
    "Mobile Legends tank tier list",
    "Best Mobile Legends mage heroes",
    "Mobile Legends assassin tier list",
    "Top Mobile Legends marksmen for ranked",
    "mlbb tier list",
    "mlbb hero rankings",
    "mlbb meta heroes",
    "Mobile Legends best support heroes",
    "Mobile Legends overpowered heroes",
    "Best jungle heroes in Mobile Legends",
    "mlbb best heroes 2024",
    "Mobile Legends top picks for tournaments",
    "Mobile Legends new hero rankings",
    "Best heroes to master in Mobile Legends",
    "mlbb S-tier and A-tier heroes",
    "Mobile Legends counter picks tier list",
  ],
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
