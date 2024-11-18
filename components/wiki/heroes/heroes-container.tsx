"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroFilter from "@/components/hero-filter";
import HeroSearch from "@/components/hero-search";
import HeroCard from "./hero-card";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Query } from "@/lib/types";

interface IHeroesContainer {
  heroes: HeroesDocument[];
  query: Query;
}

const HeroesContainer = ({ heroes, query }: IHeroesContainer) => {
  const router = useRouter();
  const [filteredHeroes, setFilteredHeroes] =
    useState<HeroesDocument[]>(heroes);

  const applyFilters = (query: Query) => {
    const { q, type, lane } = query;

    const filtered = heroes.filter((hero) => {
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

    setFilteredHeroes(filtered);
  };

  useEffect(() => {
    applyFilters(query); // Apply filters initially based on the passed query
  }, [query, heroes]);

  return (
    <>
      <GradiantCard className="h-fit w-full px-6 md:w-[200px]" variant="clean">
        <HeroSearch />

        <HeroFilter orientation="vertical" />
      </GradiantCard>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {filteredHeroes.map((hero) => (
          <div key={hero.heroName} className="mx-auto">
            <HeroCard
              hero={hero}
              onClick={() => {
                router.push(`/wiki/heroes/${hero.heroPath}`);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroesContainer;
