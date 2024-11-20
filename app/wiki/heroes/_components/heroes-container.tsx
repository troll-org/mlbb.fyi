"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroCard from "./hero-card";
interface IHeroesContainer {
  heroes: HeroesDocument[];
}

const HeroesContainer = ({ heroes }: IHeroesContainer) => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") || "";
  const type = searchParams?.get("type") || "";
  const lane = searchParams?.get("lane") || "";

  const filteredHeroes = useMemo(() => {
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

  return (
    <div className="w-full">
      {filteredHeroes.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(122px,max-content))] justify-center gap-4 md:justify-start">
          {filteredHeroes.map((hero) => (
            <HeroCard hero={hero} key={hero.heroName} />
          ))}
        </div>
      ) : (
        <p className="text-lg ml-2 mt-4 font-heading md:ml-0 md:text-xl">
          No such hero found
        </p>
      )}
    </div>
  );
};

export default HeroesContainer;
