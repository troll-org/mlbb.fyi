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
import { tiers } from "@/app/wiki/tier-list/_components/tier-list-container";
import HeroEquipment, {
  RecommendedDocument,
} from "@/lib/mongoose/schema/heroes-equipment";

interface HeroFyiContainer {
  hero: HeroesDocument;
  heroStats: HeroStatsDocuments;
  heroTier?: string;
  heroEquipment: RecommendedDocument;
}

const getTierColor = (tier?: string) => {
  const foundTier = tiers.find((t) => t.tier === tier);
  return foundTier ? foundTier.color : "#000";
};

function HeroDetails({
  hero,
  heroStats,
  heroTier,
  heroEquipment,
}: HeroFyiContainer) {
  const router = useRouter();
  const { selectedTab, setSelectedTab } = useTabStore();
  const [selectedRankState, setSelectedRankState] = useState(0);

  useEffect(() => {
    setSelectedTab("heroes");
  }, [setSelectedTab]);

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
    <div className="flex flex-col gap-1.5">
      <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
        <div className="relative flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-4">
          <Image
            src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_800,w_600,g_north/mlbb.fyi/heroBase/${hero.heroPath}.webp`}
            alt={hero.heroName}
            width={600}
            height={800}
            className="z-10 h-[256px] w-[192px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat drop-shadow-md transition-opacity duration-500 ease-in-out sm:h-[293px] sm:w-[270px]"
            priority
          />
          <Image
            src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_1000,w_1200,g_north/mlbb.fyi/heroBase/${hero.heroPath}.webp`}
            alt={hero.heroName}
            width={600}
            height={800}
            className="absolute top-0 -z-10 h-[256px] min-w-full overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat opacity-50 blur-xl transition-opacity duration-500 ease-in-out sm:opacity-0"
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
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${lane}.webp`}
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
                  {`${(heroStats.data[selectedRankState].winRate * 100).toFixed(
                    2
                  )}%` || "0.00%"}
                </p>
              </div>
              <div className="flex flex-col">
                <p className=" font-heading text-[12px] sm:text-[16px]">Pick</p>
                <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                  {`${(
                    heroStats.data[selectedRankState].pickRate * 100
                  ).toFixed(2)}%` || "0.00%"}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-heading text-[12px] sm:text-[16px]">Ban</p>
                <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                  {`${(heroStats.data[selectedRankState].banRate * 100).toFixed(
                    2
                  )}%` || "0.00%"}
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
                    {formatRankName(heroStats.data[selectedRankState].rankName)}
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

      <GradiantCard className="h-fit w-full" variant="clean">
        <p className="font-heading text-xl md:text-3xl">Equipment</p>
        <div className="mt-4 flex flex-col items-center justify-start gap-4 md:flex-row md:flex-wrap lg:gap-12">
          <div className="flex flex-row gap-4">
            <Image
              src={heroEquipment.authorOriginImgUrl}
              alt={heroEquipment.authorName}
              width={40}
              height={40}
              className="h-[40px] w-[40px] justify-start rounded-full bg-aqua/70 object-none [object-position:65%_60%]"
            />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="font-heading">{heroEquipment.authorName}</p>
                <p className="text-sm">
                  {heroEquipment.authorTitle.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Build</p>
              <div className="flex flex-row gap-2">
                {heroEquipment.equipmentDetails.map((equipment, i) => (
                  <Image
                    key={i}
                    src={equipment.equipIconOriginUrl}
                    alt={equipment.equipName}
                    width={60}
                    height={60}
                    className="w-[10.6667vw] h-[10.6667vw] md:h-[60px] md:w-[60px] justify-start rounded-full object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="hidden h-[92px] w-[1px] bg-sea lg:block"></div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Emblem</p>
              <div className="flex flex-row gap-2">
                {heroEquipment.emblems.map((emblem, i) => (
                  <Image
                    key={i}
                    src={emblem.emblemSkills.skillIconOriginUrl}
                    alt={emblem.emblemSkills.skillname}
                    width={60}
                    height={60}
                    className="w-[10.6667vw] h-[10.6667vw] md:h-[60px] md:w-[60px] justify-start rounded-full object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="hidden h-[92px] w-[1px] bg-sea lg:block"></div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Spell</p>
              <Image
                src={heroEquipment.skill[0].skillIconOriginUrl}
                alt={heroEquipment.skill[0].skillName}
                width={60}
                height={60}
                className="w-[10.6667vw] h-[10.6667vw] md:h-[60px] md:w-[60px] justify-start rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </GradiantCard>

      <GradiantCard className="h-fit w-full" variant="clean">
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
                          <div className="mb-1 rounded-full bg-ocean px-2 py-0.5 text-sm ">
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
                              <div className="mb-1 rounded-full bg-ocean px-2 py-0.5 text-sm ">
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
