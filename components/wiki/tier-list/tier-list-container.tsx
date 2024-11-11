"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@prisma/client";

const tiers = [
  { tier: "OP", color: "#3652ba" },
  { tier: "S", color: "#4ade80" },
  { tier: "A", color: "#fde047" },
  { tier: "B", color: "#FFA500" },
  { tier: "C", color: "#FF6347" },
  { tier: "D", color: "#FF4500" },
];

interface TierListProps {
  heroes: Hero[] | null;
}

export default function TierContainer({ heroes }: TierListProps) {
  const router = useRouter();
  const filteredHeroes = heroes?.filter((hero) =>
    tiers.some((tier) => {
      if (tier.tier === "OP" && hero.tier === "SS") {
        return true;
      }
      return tier.tier === hero.tier;
    })
  );
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <p className="text-lg ml-2 text-gray-400">
        mlbb.fyi tier list is updated daily based on the win, pick and ban rate
        of each hero in major Mobile Legends tournament
      </p>
      <div className="flex w-full flex-col gap-4">
        {tiers.map((item, i) => {
          const filteredHeroes = heroes?.filter((hero) =>
            hero.tier === "SS" ? item.tier === "OP" : hero.tier === item.tier
          );

          return (
            <div
              key={i}
              className="flex w-full flex-row items-center rounded-xl pl-4"
              style={{ background: item.color }}
            >
              <p className="w-6 text-center font-heading">{item.tier}</p>
              <div className="ml-4 h-fit w-full rounded-r-lg bg-black py-8">
                <div className="mx-4 grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                  {filteredHeroes?.map((hero, j) => (
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
    </div>
  );
}
