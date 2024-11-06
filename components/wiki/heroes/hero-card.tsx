"use client";

import { NewHero } from "@prisma/client";
import Image from "next/image";

const HeroCard = ({
  hero,
  onClick,
}: {
  hero: NewHero;
  onClick: () => void;
}) => {
  return (
    <div className="w-fit cursor-pointer p-1.5 " onClick={onClick}>
      <div className="relative h-32 w-24 overflow-hidden rounded-lg">
        <Image
          src={
            hero.heroImg.includes("/image/upload")
              ? hero.heroImg.split("/image/upload")[0] +
                "/image/upload/c_fill,h_256,w_192,g_north" +
                hero.heroImg.split("/image/upload")[1]
              : hero.heroImg
          }
          alt={hero.heroName}
          width={96}
          height={128}
          className="h-[128px] w-[96px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat ease-in-out hover:opacity-50 hover:duration-300"
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
