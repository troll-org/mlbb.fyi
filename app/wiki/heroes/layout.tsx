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
    "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends (MLBB) heroes",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Heroes",
    },
    description:
      "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends (MLBB) heroes",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi Heroes",
    },
    description:
      "Discover comprehensive statistics, detailed information, and recommended equipment for all Mobile Legends (MLBB) heroes",
    ...defaultTwitterMD,
  },
};

async function HeroesPage({ children }: { children: React.ReactNode }) {
  return (
    <TabsContent value="heroes">
      <h1 className="sr-only text-xl font-bold">Mobile Legend Heroes</h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">{children}</div>
    </TabsContent>
  );
}

export default HeroesPage;
