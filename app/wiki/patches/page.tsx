import getPatches from "@/lib/actions/patches";

import { Patch } from "@prisma/client";
import { Metadata } from "next";

import { TabsContent } from "@/components/shared/tabs";
import PatchesContainer from "@/components/wiki/patches/patches-container";
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
