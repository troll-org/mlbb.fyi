"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroCard from "./hero-card";
import { Query } from "@/types";
interface IHeroesContainer {
  heroes: HeroesDocument[];
  query: Query;
}

const HeroesContainer = ({ heroes, query }: IHeroesContainer) => {
  const router = useRouter();

  const filteredHeroes = React.useMemo(() => {
    if (!query) return heroes;

    const { q, type, lane } = query;

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
  }, [query, heroes]);

  return (
    <div className="w-full">
      {filteredHeroes.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(122px,1fr))] gap-4">
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
