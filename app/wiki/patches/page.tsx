import getPatches from "@/lib/actions/patches";

import { Patch } from "@prisma/client";
import { Metadata } from "next";

import { TabsContent } from "@/components/shared/tabs";
import PatchesContainer from "@/app/wiki/patches/_components/patches-container";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Patches",
  description: "List of all Mobile Legends (MLBB) patches",
  openGraph: {
    title: "Patches",
    description: "List of all Mobile Legends (MLBB) patches",
    url: "https://mlbb.fyi/wiki/patches",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Patches",
    description: "List of all Mobile Legends (MLBB) patches",
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
