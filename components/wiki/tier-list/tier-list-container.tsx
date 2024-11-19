"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeroTierDocument } from "@/lib/mongoose/schema/heroes-tier";
import { Query } from "@/types";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroCard from "@/components/wiki/heroes/hero-card";
import html2canvas from "html2canvas";
import { Button } from "@/components/shared/button";

export const tiers = [
  { tier: "S", color: "#3652ba" },
  { tier: "A", color: "#059669" },
  { tier: "B", color: "#fde047" },
  { tier: "C", color: "#FFA500" },
  { tier: "D", color: "#FF6347" },
];

interface TierListProps {
  heroes: HeroTierDocument[];
  query: Query;
}

export default function TierContainer({ heroes, query }: TierListProps) {
  const router = useRouter();
  const filteredHeroes = React.useMemo(() => {
    if (!query) return heroes;

    const { q, type, lane } = query;

    return heroes.filter((hero) => {
      const matchesQuery =
        !q || hero.name.toLowerCase().includes(q.toLowerCase());

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
  }, [query, heroes]);

  const container = useRef<HTMLDivElement>(null);

  const captureComponent = async () => {
    if (container.current) {
      const canvas = await html2canvas(container.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#030F1C",
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "tier-list.png";
      link.click();
    }
  };

  return (
    <>
      <Button variant="default" type="button" onClick={captureComponent}>
        Download
      </Button>

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
                className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-lg text-center font-heading"
                style={{ background: item.color }}
              >
                {item.tier}
              </p>

              <div className="ml-16 mr-4 grid grid-cols-[repeat(auto-fill,minmax(122px,1fr))] gap-4">
                {tierHeroes?.map((hero, j) => (
                  <div
                    key={j}
                    onClick={() => {
                      router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                    }}
                    className="relative mx-auto cursor-pointer"
                  >
                    <HeroCard
                      hero={
                        {
                          heroName: hero.name,
                          heroPath: hero.name.toLowerCase(),
                          heroRoleType: hero.heroRoleType,
                          heroLaneType: hero.heroLaneType,
                        } as any
                      }
                    />
                    {/* <div className="overflow-hidden rounded-xl">
                      <Image
                        src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_220,w_220,g_north/mlbb.fyi/hero/${hero.name}.webp`}
                        alt={hero.name}
                        width={110}
                        height={110}
                        className="h-[55px] w-[55px] bg-cover bg-top bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110 sm:h-[110px] sm:w-[110px]"
                        loading="lazy"
                      />
                    </div> */}
                    {/* <p className="mt-2 text-center text-[10px] font-semibold md:text-[14px]">
                      {hero?.name}
                    </p> */}
                  </div>
                ))}
              </div>
            </GradiantCard>
          );
        })}
      </div>
      <p className="text-lg ml-2 text-gray-400">
        mlbb.fyi tier list is updated daily based on the win, pick and ban rate
        of each hero in major Mobile Legends tournament
      </p>
    </>
  );
}
