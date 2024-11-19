"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroCard from "./hero-card";
import { Query } from "@/lib/types";
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
    <>
      {filteredHeroes.length > 0 ? (
        <div className="grid h-auto max-h-32 auto-rows-auto grid-cols-3 items-start gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {filteredHeroes.map((hero) => (
            <HeroCard
              key={hero.heroName}
              hero={hero}
              onClick={() => {
                router.push(`/wiki/heroes/${hero.heroPath}`);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg ml-2 mt-4 font-heading md:ml-0 md:text-xl">
          No such hero found
        </p>
      )}
    </>
  );
};

export default HeroesContainer;
