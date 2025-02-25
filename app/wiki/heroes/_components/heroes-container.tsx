"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import HeroCard from "./hero-card";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroFilter from "@/app/wiki/heroes/_components/hero-filter";
import HeroSearch from "@/app/wiki/heroes/_components/hero-search";

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
    <div className="flex flex-col gap-1.5">
      <h1 className="pb-4 pl-2 font-heading text-3xl font-bold">
        Mobile Legend Heroes
      </h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <GradiantCard
          className="flex h-fit w-full flex-col-reverse gap-4 px-6 md:sticky md:top-20 md:w-[220px] md:flex-col"
          variant="clean"
        >
          <HeroSearch />
          <HeroFilter orientation="vertical" />
        </GradiantCard>
        <div className="w-full">
          {filteredHeroes.length > 0 ? (
            <div className="hero-grid-container grid justify-center gap-4 md:justify-start">
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
      </div>
    </div>
  );
};

export default HeroesContainer;
