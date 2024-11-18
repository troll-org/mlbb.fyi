"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeroTierDocument } from "@/lib/mongoose/schema/heroes-tier";
import { Query } from "@/lib/types";

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

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4">
        {tiers.map((item, i) => {
          const tierHeroes = filteredHeroes?.filter((hero) =>
            hero.tier === "S" ? item.tier === "S" : hero.tier === item.tier
          );

          return (
            <div
              key={i}
              className="flex w-full flex-row items-center rounded-xl pl-4"
              style={{ background: item.color }}
            >
              <p className="w-3 text-center font-heading sm:w-6">{item.tier}</p>
              <div className="ml-4 h-fit w-full rounded-r-lg bg-black py-8">
                <div className="mx-4 grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                  {tierHeroes?.map((hero, j) => (
                    <div
                      key={j}
                      onClick={() => {
                        router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                      }}
                      className="relative mx-auto cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-full">
                        <Image
                          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_220,w_220,g_north/mlbb.fyi/hero/${hero.name}.webp`}
                          alt={hero.name}
                          width={110}
                          height={110}
                          className="h-[55px] w-[55px] bg-cover bg-top bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110 sm:h-[110px] sm:w-[110px]"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-2 text-center text-[10px] font-semibold md:text-[14px]">
                        {hero?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-lg ml-2 text-gray-400">
        mlbb.fyi tier list is updated daily based on the win, pick and ban rate
        of each hero in major Mobile Legends tournament
      </p>
    </div>
  );
}
