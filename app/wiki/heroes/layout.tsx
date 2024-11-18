import React from "react";
import { TabsContent } from "@/components/shared/tabs";

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
