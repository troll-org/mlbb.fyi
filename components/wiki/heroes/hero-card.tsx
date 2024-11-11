"use client";

import { HeroesDocument } from "@/lib/mongoose/schema/heroes";
import { NewHero } from "@prisma/client";
import Image from "next/image";

const HeroCard = ({
  hero,
  onClick,
}: {
  hero: HeroesDocument;
  onClick: () => void;
}) => {
  return (
    <div className="w-fit cursor-pointer p-1.5 " onClick={onClick}>
      <div className="relative h-32 w-24 overflow-hidden rounded-lg">
        <Image
          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_256,w_192,g_north/mlbb.fyi/hero/${hero.heroName}.webp`}
          alt={hero.heroName}
          width={96}
          height={128}
          className="h-[128px] w-[96px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="relative w-full">
        <p className="absolute inset-x-0 top-[-28px] mx-1  mt-[6px] rounded-md bg-navy-900/60 p-0.5 text-center text-[10px] font-medium shadow-inner shadow-navy-500/40">
          {hero.heroName}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;
