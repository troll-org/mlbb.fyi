"use client";

import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { HeroTierDocument } from "@/lib/mongoose/schema/heroes-tier";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroCard from "@/app/wiki/heroes/_components/hero-card";
import html2canvas from "html2canvas";
import { Button } from "@/components/shared/button";
import HeroFilter from "@/app/wiki/heroes/_components/hero-filter";
import HeroSearch from "@/app/wiki/heroes/_components/hero-search";

export const tiers = [
  { tier: "S", color: "#3652ba" },
  { tier: "A", color: "#059669" },
  { tier: "B", color: "#fde047" },
  { tier: "C", color: "#FFA500" },
  { tier: "D", color: "#FF6347" },
];

interface TierListProps {
  heroes: HeroTierDocument[];
}

export default function TierContainer({ heroes }: TierListProps) {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") || "";
  const type = searchParams?.get("type") || "";
  const lane = searchParams?.get("lane") || "";

  const filteredHeroes = React.useMemo(() => {
    return heroes.filter((hero) => {
      const matchesQuery =
        !q || hero.heroName.toLowerCase().includes(q.toLowerCase());

      const matchesType =
        !type ||
        type
          .split(",")
          .every((typeFilter) =>
            hero.heroRoleType.some((roleType) =>
              roleType.toLowerCase().includes(typeFilter.toLowerCase())
            )
          );

      const matchesLane =
        !lane ||
        lane
          .split(",")
          .every((laneFilter) =>
            hero.heroLaneType.some((laneType) =>
              laneType.toLowerCase().includes(laneFilter.toLowerCase())
            )
          );

      return matchesQuery && matchesType && matchesLane;
    });
  }, [q, type, lane, heroes]);

  const container = useRef<HTMLDivElement>(null);

  const captureComponent = async () => {
    if (container.current) {
      const wrapper = document.createElement("div");
      wrapper.style.padding = "20px";
      wrapper.style.backgroundColor = "#030F1C";
      wrapper.style.display = "block";

      const title = document.createElement("div");
      title.innerText = "mlbb.fyi ; Mobile Legend Bang Bang Hero Tier List";
      title.style.fontSize = "24px";
      title.style.color = "#FFFFFF";
      title.style.fontWeight = "bold";
      title.style.textAlign = "center";
      title.style.marginBottom = "10px";

      const details = document.createElement("div");
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const heroLane = lane ? `Lane: ${lane}` : "Lane: All";
      const heroType = type ? `Type: ${type}` : "Type: All";
      details.innerText = `${currentDate} | ${heroLane} | ${heroType}`;
      details.style.fontSize = "16px";
      details.style.color = "#FFFFFF";
      details.style.textAlign = "center";
      details.style.marginBottom = "20px";

      const clonedContainer = container.current.cloneNode(true);
      wrapper.appendChild(title);
      wrapper.appendChild(details);
      wrapper.appendChild(clonedContainer);

      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      });

      document.body.removeChild(wrapper);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "tier-list.png";
      link.click();
    }
  };

  return (
    <>
      <GradiantCard
        className="flex h-fit w-full flex-col gap-4 px-6"
        variant="clean"
      >
        <HeroFilter />
        <div className="flex flex-row space-x-4">
          <HeroSearch />
          <Button
            variant="default"
            type="button"
            onClick={captureComponent}
            className="hidden md:block"
          >
            Download
          </Button>
        </div>
      </GradiantCard>

      <div ref={container} className="flex w-full flex-col gap-4">
        {tiers.map((item, i) => {
          const tierHeroes = filteredHeroes?.filter(
            (hero) => hero.tier === item.tier
          );

          return (
            <GradiantCard
              key={i}
              className="relative w-full rounded-lg border file:h-fit"
            >
              <p
                className="absolute left-0 top-0 flex w-full items-center justify-center  rounded-t-lg text-center font-heading sm:h-full sm:w-12 sm:rounded-l-lg sm:rounded-tr-none"
                style={{ background: item.color }}
              >
                {item.tier}
              </p>

              <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(122px,1fr))] gap-4 sm:ml-16 sm:mt-0">
                {tierHeroes?.map((hero, j) => (
                  <div key={j} className="relative mx-auto cursor-pointer">
                    <HeroCard
                      hero={
                        {
                          heroName: hero.heroName,
                          heroPath: hero.heroPath,
                          heroRoleType: hero.heroRoleType,
                          heroLaneType: hero.heroLaneType,
                        } as any
                      }
                    />
                  </div>
                ))}
              </div>
            </GradiantCard>
          );
        })}
      </div>
    </>
  );
}
