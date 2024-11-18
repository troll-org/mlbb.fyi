"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroFilter from "@/components/hero-filter";
import HeroSearch from "@/components/hero-search";
import HeroCard from "./hero-card";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Query } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IHeroesContainer {
  heroes: HeroesDocument[];
  query: Query;
}

const HeroesContainer = ({ heroes, query }: IHeroesContainer) => {
  const router = useRouter();

  const filteredHeroes = useMemo(() => {
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
      <div className="space-y-4 md:w-[200px]">
        <HeroSearch />
        <GradiantCard
          variant="default"
          className={cn(
            "w-full p-2"
            // "border border-cloud/10 bg-cloud/5"
          )}
        >
          <HeroFilter orientation="vertical" />
        </GradiantCard>
      </div>

      {filteredHeroes.length > 0 ? (
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
      ) : (
        <p className="text-lg ml-2 mt-4 font-heading md:ml-0 md:text-xl">
          No such hero found
        </p>
      )}
    </>
  );
};

export default HeroesContainer;
