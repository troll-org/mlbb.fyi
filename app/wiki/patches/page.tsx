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
    <TabsContent value="patches">
      <h1 className="pb-4 pl-2 font-heading text-3xl font-bold">
        Mobile Legend Patches
      </h1>

      <PatchesContainer patches={patches} />
    </TabsContent>
  );
}

export default PatchesPage;
