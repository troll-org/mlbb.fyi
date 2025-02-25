"use client";

import React, { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import useTabStore from "@/lib/state/useTabStore";
import Link from "next/link";
import { LayoutWikiProps } from "./layout";

const WikiTabList = [
  {
    name: "Heroes",
    href: "/wiki/heroes",
  },
  {
    name: "Tier List",
    href: "/wiki/tier-list",
  },
  {
    name: "Statistics",
    href: "/wiki/statistics",
  },
  {
    name: "Patches",
    href: "/wiki/patches",
  },
];

function ContentLayout({ children }: LayoutWikiProps) {
  const pathname = usePathname();
  const active = pathname?.split("/")[2] || "";
  const { selectedTab, setSelectedTab } = useTabStore();

  useEffect(() => {
    setSelectedTab(active);
  }, [active, setSelectedTab]);

  return (
    <>
      <Tabs value={selectedTab} defaultValue="heroes" asChild>
        <section>
          {/* <nav className="mt-4 w-full md:pl-0">
            <div className="no-scrollbar h-[52px] overflow-x-scroll">
              <TabsList className="flex shrink-0 space-x-1">
                {WikiTabList.map((item, i) => (
                  <Link href={item.href} key={i} scroll={false}>
                    <TabsTrigger
                      value={item.href.split("/")[2]}
                      onClick={() => setSelectedTab(item.href.split("/")[2])}
                    >
                      {item.name}
                    </TabsTrigger>
                  </Link>
                ))}
              </TabsList>
            </div>
          </nav> */}
          <article>{children}</article>
        </section>
      </Tabs>
    </>
  );
}

export default ContentLayout;
