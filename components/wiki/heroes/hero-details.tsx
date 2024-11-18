"use client";

import { HeroesDocument } from "@/lib/mongoose/schema/heroes";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTabStore from "@/lib/state/useTabStore";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Progress } from "@/components/shared/progress";
import Image from "next/image";
import { HeroStatsDocuments } from "@/lib/mongoose/schema/heroes-statistics";
import { Button } from "@/components/shared/button";
import { RefreshCcw } from "lucide-react";
import { tiers } from "@/components/wiki/tier-list/tier-list-container";

interface HeroFyiContainer {
  hero: HeroesDocument;
  heroStats: HeroStatsDocuments;
  heroTier?: string;
}

const getTierColor = (tier?: string) => {
  const foundTier = tiers.find((t) => t.tier === tier);
  return foundTier ? foundTier.color : "#000";
};

function HeroDetails({ hero, heroStats, heroTier }: HeroFyiContainer) {
  const router = useRouter();
  const { selectedTab, setSelectedTab } = useTabStore();
  const [selectedRankState, setSelectedRankState] = useState(0);

  useEffect(() => {
    setSelectedTab("heroes");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroDetails = hero.heroDetails;
  const data = [
    {
      name: "Ability",
      value: heroDetails.heroAbility,
    },
    {
      name: "Offense",
      value: heroDetails.heroOffense,
    },
    {
      name: "Durability",
      value: heroDetails.heroDurability,
    },
    {
      name: "Difficulty",
      value: heroDetails.heroDifficulity,
    },
  ];

  function capitalize(word: String) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function formatWord(word: String) {
    const cleanedWord = word.replace(/lane/i, "");
    return (
      cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1).toLowerCase()
    );
  }

  function formatHeroRoleAndLane(hero: HeroesDocument) {
    if (!hero || !hero.heroRoleType || !hero.heroLaneType) return "";

    const roleType =
      hero.heroRoleType.length > 1
        ? hero.heroRoleType.map((role) => capitalize(role)).join(" / ")
        : capitalize(hero.heroRoleType[0]);

    const laneType =
      hero.heroLaneType.length > 1
        ? hero.heroLaneType
            .map((lane) => capitalize(formatWord(lane)))
            .join(" - ")
        : capitalize(hero.heroLaneType[0]);

    return `${roleType} (${laneType})`;
  }

  function formatRankName(rankName: string) {
    if (rankName.toLowerCase() === "mythicalhonor") {
      return "Honor";
    } else if (rankName.toLowerCase() === "mythicalgloryplus") {
      return "Glory+";
    }
    return formatWord(
      rankName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:gap-x-1.5">
        <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
          <div className="relative flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-4">
            <Image
              src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_800,w_600,g_north/mlbb.fyi/hero/${hero.heroName}.webp`}
              alt={hero.heroName}
              width={600}
              height={800}
              className="z-10 h-[256px] w-[192px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat drop-shadow-md transition-opacity duration-500 ease-in-out sm:h-[293px] sm:w-[244px]"
              priority
            />
            <Image
              src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_1000,w_1200,g_north/mlbb.fyi/hero/${hero.heroName}.webp`}
              alt={hero.heroName}
              width={600}
              height={800}
              className="absolute top-0 -z-10 h-[256px] min-w-full overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat opacity-50 transition-opacity duration-500 ease-in-out sm:opacity-0"
              priority
            />

            <div className="flex w-full flex-col gap-x-1.5 ">
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <p className="font-heading text-xl md:text-3xl">
                    {hero.heroName}
                  </p>
                  {hero.heroLaneType &&
                    hero.heroLaneType.map((lane, i) => (
                      <Image
                        key={i}
                        src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${formatWord(
                          lane
                        )}.webp`}
                        alt={lane || ""}
                        width={25}
                        height={25}
                        className="mb-1 h-[18px] w-[18px] md:h-[25px] md:w-[25px]"
                      />
                    ))}
                </div>
                <div
                  className={`text-md mb-1 rounded-full px-4 font-semibold`}
                  style={{ backgroundColor: getTierColor(heroTier) }}
                >
                  <p>{heroTier || "X"}</p>
                </div>
              </div>
              <div className="mb-1 flex flex-row items-center">
                {hero?.heroRoleType &&
                  hero.heroRoleType.map((role, i) => (
                    <Image
                      key={i}
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${role}.webp`}
                      alt={role}
                      width={20}
                      height={20}
                      className="mr-2 h-[20px] w-[20px]"
                    />
                  ))}

                <p className="text-semibold text-[12px] text-gray-500 sm:text-sm">
                  {formatHeroRoleAndLane(hero)}
                </p>
              </div>

              <div className="my-3 flex flex-row items-center   gap-4 sm:gap-8">
                <div className="flex flex-col">
                  <p className="font-heading text-[12px] sm:text-[16px]">
                    Winrate
                  </p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {`${(
                      heroStats.data[selectedRankState].winRate * 100
                    ).toFixed(2)}%` || "0.00%"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className=" font-heading text-[12px] sm:text-[16px]">
                    Pick
                  </p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {`${(
                      heroStats.data[selectedRankState].pickRate * 100
                    ).toFixed(2)}%` || "0.00%"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-heading text-[12px] sm:text-[16px]">Ban</p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {`${(
                      heroStats.data[selectedRankState].banRate * 100
                    ).toFixed(2)}%` || "0.00%"}
                  </p>
                </div>
                {heroStats.data && heroStats.data.length > 0 && (
                  <Button
                    onClick={() =>
                      setSelectedRankState(
                        (selectedRankState + 1) % heroStats.data.length
                      )
                    }
                    variant="gradiantNavySec"
                    className="self-end rounded-full"
                  >
                    <span className="text-lg mr-2 text-[12px] font-bold sm:text-[16px]">
                      {formatRankName(
                        heroStats.data[selectedRankState].rankName
                      )}
                    </span>{" "}
                    <RefreshCcw size={12} />
                  </Button>
                )}
              </div>

              {data.map((item, i) => (
                <div key={i} className="mt-[6px] sm:mt-2">
                  <div className="flex justify-between">
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                  <Progress value={item.value || 0} max={100} />
                </div>
              ))}
            </div>
          </div>
        </GradiantCard>

        {/* <GradiantCard className="mt-1.5 h-[340px] w-full" variant="clean">
    <p className="font-heading text-xl md:text-3xl">Equipments</p>
    <div className="flex flex-col gap-y-2">
      <p className="text-sm text-gray-500">
        {uniqueSpells.length < 2
          ? "Recommended spell"
          : "Recommended spells"}
      </p>
      <div className="flex flex-row">
        {uniqueSpells.map((spellName, i) => (
          <div key={i} className="mr-2 sm:mr-4">
            <div className="relative">
              <Image
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/spells/${spellName}.webp`}
                alt=""
                width={50}
                height={50}
                className="h-[45px] w-[45px] sm:h-[50px] sm:w-[50px] "
              />
              <div className=" bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                <p className="mt-3">{spellName}</p>
              </div>
            </div>
            <style jsx>{`
              .relative:hover .absolute {
                opacity: 1;
              }
            `}</style>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        {uniqueEmblems.length < 2
          ? "Recommended emblem"
          : "Recommended emblems"}
      </p>
      <div className="flex flex-row">
        {uniqueEmblems.map((emblemName, i) => (
          <div key={i} className="mr-2 sm:mr-4">
            <div className="relative">
              <Image
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/emblems/${emblemName.replace(
                  /[' ]/g,
                  "_"
                )}.webp`}
                alt=""
                width={50}
                height={50}
                className="h-[45px] w-[45px] sm:h-[50px] sm:w-[50px] "
              />
              <div className=" bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                <p className="mt-2">{emblemName}</p>
              </div>
            </div>
            <style jsx>{`
              .relative:hover .absolute {
                opacity: 1;
              }
            `}</style>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <p className="font-heading">mlbb.fyi</p>
        <p className="text-semibold text-sm text-gray-500">
          &apos;s recommended build
        </p>
      </div>
      <div className="flex flex-row">
        {heroBuild?.map((item, i) => (
          <div key={i} className="mr-2 sm:mr-4">
            <div className="relative">
              <Image
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/items/${item?.name.replace(
                  /[' ]/g,
                  "_"
                )}.webp`}
                alt={""}
                width={50}
                height={50}
                className="flex"
              />
              <div className="bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                <p className="mt-2">{item?.name}</p>
              </div>
            </div>
            <style jsx>{`
              .relative:hover .absolute {
                opacity: 1;
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  </GradiantCard> */}
      </div>

      {/* <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
  {heroStrongAgainst.length !== 0 && (
    <>
      <p className="font-heading text-xl md:text-3xl">Strong against</p>
      <div className="my-4">
        <div className="grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {heroStrongAgainst.map((hero, i) => (
            <div
              key={i}
              onClick={() => {
                router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
              }}
              className="mx-auto cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={
                    hero?.img?.split("/image/upload/")[0] +
                    "/image/upload/c_fill,h_220,w_220,g_north/" +
                    hero?.img?.split("/image/upload/")[1]
                  }
                  alt={hero.name}
                  width={110}
                  height={110}
                  className="h-[55px] w-[55px] rounded-full sm:h-[110px] sm:w-[110px]"
                  loading="lazy"
                />

                <div className="bg-opacity/75 absolute bottom-0 left-0 h-[55px] w-[55px] items-center rounded-full bg-black/80 py-1 text-center text-sm font-medium text-white opacity-0 transition-opacity duration-200 sm:h-[110px] sm:w-[110px]"></div>
              </div>
              <style jsx>{`
                .relative:hover .absolute {
                  opacity: 1;
                }
              `}</style>
              <p className="mt-2 text-center text-[10px]  md:text-[14px]">
                {hero?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )}

  <p className="font-heading text-xl md:text-3xl">Weak against</p>
  <div className="my-4">
    <div className="grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {uniqueCounters.map((counter, i) => (
        <div
          key={i}
          onClick={() => {
            router.push(`/wiki/heroes/${counter.name.toLowerCase()}`);
          }}
          className="mx-auto cursor-pointer"
        >
          <div className="relative">
            <Image
              src={
                counter?.img?.split("/image/upload/")[0] +
                "/image/upload/c_fill,h_220,w_220,g_north/" +
                counter?.img?.split("/image/upload/")[1]
              }
              alt={counter.name}
              width={110}
              height={110}
              className="h-[55px] w-[55px] rounded-full sm:h-[110px] sm:w-[110px]"
              loading="lazy"
            />

            <div className="bg-opacity/75 absolute bottom-0 left-0 h-[55px] w-[55px] items-center rounded-full bg-black/80 py-1 text-center text-sm font-medium text-white opacity-0 transition-opacity duration-200 sm:h-[110px] sm:w-[110px]">
               <p className="mt-3 justify-center text-[10px] md:mt-11 md:text-[14px]">
                      {counter?.name}
                    </p>
            </div>
          </div>
          <style jsx>{`
            .relative:hover .absolute {
              opacity: 1;
            }
          `}</style>
          <p className="mt-2 text-center text-[10px]  md:text-[14px]">
            {counter?.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</GradiantCard>*/}

      <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
        <p className="font-heading text-xl md:text-3xl">Passive</p>
        <div className="my-4">
          <div className="flex flex-row gap-2">
            {heroDetails.heroSkill && (
              <>
                <Image
                  src={heroDetails.heroSkill[0].skillIconOriginUrl}
                  alt={heroDetails.heroSkill[0].skillName}
                  width={60}
                  height={60}
                  className="mr-2 h-[60px] w-[60px] justify-start"
                />
                <div className="flex flex-col pr-2">
                  <div className="flex flex-row items-center space-x-1">
                    <p className=" pr-2 font-heading">
                      {heroDetails.heroSkill[0].skillName}
                    </p>
                    {heroDetails.heroSkill[0].skillTag &&
                      heroDetails.heroSkill[0].skillTag.map((tag, i) => (
                        <div key={i}>
                          <div className="mb-1 rounded-full bg-navy-600/50 px-2 py-0.5 text-sm ">
                            {tag.skillTagName.toUpperCase()}
                          </div>
                        </div>
                      ))}
                  </div>
                  <p
                    className="text-justify text-sm text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: heroDetails.heroSkill[0].skillDescription,
                    }}
                  ></p>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="font-heading text-xl md:text-3xl">Skills</p>
        <div className="my-4">
          {heroDetails?.heroSkill
            .slice(1, heroDetails.heroSkill.length + 1)
            .map((skills, i) => {
              return (
                <div key={i} className="mb-8">
                  <div className="flex flex-row gap-2">
                    <Image
                      src={skills.skillIconOriginUrl}
                      alt={skills.skillName}
                      width={60}
                      height={60}
                      className="mr-2 h-[60px] w-[60px] justify-start"
                    />
                    <div className="flex flex-col pr-2">
                      <div className="flex flex-row items-center space-x-1">
                        <p className=" pr-2 font-heading">{skills.skillName}</p>
                        {skills.skillTag &&
                          skills.skillTag.map((tag, i) => (
                            <div key={i}>
                              <div className="mb-1 rounded-full bg-navy-600/50 px-2 py-0.5 text-sm ">
                                {tag.skillTagName.toUpperCase()}
                              </div>
                            </div>
                          ))}
                      </div>
                      <p
                        className="text-justify text-sm text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: skills.skillDescription,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </GradiantCard>
    </div>
  );
}

export default HeroDetails;
