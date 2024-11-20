"use client";

import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const HeroCard = ({ hero }: { hero: HeroesDocument }) => {
  return (
    <Link
      className={cn("w-fit cursor-pointer rounded-lg")}
      href={`/wiki/heroes/${hero.heroPath}`}
      prefetch={false}
    >
      <div className="relative h-[162px] w-[122px] overflow-hidden rounded-lg">
        <Image
          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_162,w_122,g_north/mlbb.fyi/hero/${hero.heroName}.webp`}
          alt={hero.heroName}
          width={122}
          height={162}
          className="h-[162px] w-[122px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="relative w-full">
        <div
          className={cn(
            "absolute inset-x-0 top-[-26px] mx-1 block rounded-md bg-ocean/60 p-0.5"
          )}
        >
          <p className="text-center text-sm font-medium">{hero.heroName}</p>
        </div>

        <div
          className={cn(
            "absolute top-[-52px] mx-1 rounded-md bg-ocean/60 p-1",
            "flex items-center gap-0.5"
          )}
        >
          {hero.heroRoleType.map((role) => (
            <Image
              key={role}
              src={`https://res.cloudinary.com/dvm5vog2j/image/upload/mlbb.fyi/heroType/${role}.webp`}
              alt={"type"}
              className="h-3.5 w-3.5"
              width={14}
              height={14}
            />
          ))}
          {hero.heroLaneType.map((lane) => (
            <Image
              key={lane}
              src={`https://res.cloudinary.com/dvm5vog2j/image/upload/mlbb.fyi/heroRole/${lane}.webp`}
              alt={"type"}
              className="h-3.5 w-3.5"
              width={14}
              height={14}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
