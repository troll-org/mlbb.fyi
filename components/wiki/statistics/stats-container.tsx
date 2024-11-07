"use client";

import React, { useState } from "react";
import { NewTournamentsData } from "@prisma/client";
import { PickedHero } from "@prisma/client";
import { NewHero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

interface IStats {
  heroes: NewHero[];
  tourneyStats: NewTournamentsData[];
}

function isDataEmpty(statsList: any[]): boolean {
  return (
    statsList.length === 0 ||
    statsList.every((hero) => !hero.stats && !hero.heroPicks)
  );
}

export default function StatsContainer({ heroes, tourneyStats }: IStats) {
  const router = useRouter();
  const allStats = [];
  const mythicStats = [];
  const gloryStats = [];

  for (const hero of heroes) {
    const allStat = { name: hero.heroName, ...hero.stats?.all };
    const mythicStat = { name: hero.heroName, ...hero.stats?.mythic };
    const gloryStat = { name: hero.heroName, ...hero.stats?.mythicalGlory };

    allStats.push(allStat);
    mythicStats.push(mythicStat);
    gloryStats.push(gloryStat);
  }

  const [selectedTourneyIndex, setSelectedTourneyIndex] = useState<number>(-3);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<string>("alphabet");
  const [ascendingOrder, setAscendingOrder] = useState<boolean>(true);

  const handleTourneyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTourneyIndex = Number(event.target.value);
    setSelectedTourneyIndex(selectedTourneyIndex);
  };

  const handleSortingOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSortingOption = event.target.value;
    setSelectedSortingOption(selectedSortingOption);
  };

  const handleReverseList = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const renderList = [
    allStats,
    mythicStats,
    gloryStats,
    ...tourneyStats.map((tourney) => tourney.data),
  ];

  const selectedStatsList = renderList[selectedTourneyIndex + 3] || [];
  const isStatEmpty = isDataEmpty(selectedStatsList);

  let sortedList = [...renderList[selectedTourneyIndex + 3]];

  function isNewHero(item: any): item is NewHero {
    return (
      (item as NewHero).heroName !== undefined &&
      (item as NewHero).stats !== undefined
    );
  }

  function isPickedHero(item: any): item is PickedHero {
    return (item as PickedHero).heroPicks !== undefined;
  }

  switch (selectedSortingOption) {
    case "alphabet":
      sortedList = sortedList.sort((a, b) => {
        const nameA = isNewHero(a)
          ? a.heroName
          : isPickedHero(a)
          ? a.heroName
          : "";
        const nameB = isNewHero(b)
          ? b.heroName
          : isPickedHero(b)
          ? b.heroName
          : "";
        return nameA.localeCompare(nameB);
      });
      break;
    case "pick":
      sortedList = sortedList.sort((a, b) => {
        const valueA = isNewHero(a)
          ? a.stats?.all?.use?.slice(0, -1) || "0"
          : isPickedHero(a)
          ? a.heroPicks?.rate?.toString().slice(0, -1) || "0"
          : "0";
        const valueB = isNewHero(b)
          ? b.stats?.all?.use?.slice(0, -1) || "0"
          : isPickedHero(b)
          ? b.heroPicks?.rate?.toString().slice(0, -1) || "0"
          : "0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
    case "ban":
      sortedList = sortedList.sort((a, b) => {
        const valueA = isNewHero(a)
          ? a.stats?.all?.ban?.slice(0, -1) || "0"
          : isPickedHero(a)
          ? a.heroBans?.rate?.toString().slice(0, -1) || "0"
          : "0";
        const valueB = isNewHero(b)
          ? b.stats?.all?.ban?.slice(0, -1) || "0"
          : isPickedHero(b)
          ? b.heroBans?.rate?.toString().slice(0, -1) || "0"
          : "0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
    case "winrate":
      sortedList = sortedList.sort((a, b) => {
        const valueA = isNewHero(a)
          ? a.stats?.all?.win?.slice(0, -1) || "0.0"
          : isPickedHero(a)
          ? a.heroPicks?.winRate?.toString().slice(0, -1) || "0.0"
          : "0.0";
        const valueB = isNewHero(b)
          ? b.stats?.all?.win?.slice(0, -1) || "0.0"
          : isPickedHero(b)
          ? b.heroPicks?.winRate?.toString().slice(0, -1) || "0.0"
          : "0.0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
  }

  const sortedListCopy = ascendingOrder
    ? [...sortedList]
    : [...sortedList].reverse();

  return (
    <GradiantCard variant="clean">
      <div className="mb-8 flex gap-4">
        <select
          className="h-10 w-1/2 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:outline-none"
          value={selectedTourneyIndex}
          onChange={handleTourneyChange}
        >
          <option value={-3}>All ranks</option>
          <option value={-2}>Mythic</option>
          <option value={-1}>Glory</option>
          {tourneyStats.map((tourney, index) => (
            <option key={tourney.id} value={index}>
              {tourney.tournamentName}
            </option>
          ))}
        </select>
        <select
          className="h-10 w-1/2 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:outline-none"
          value={selectedSortingOption}
          onChange={handleSortingOptionChange}
        >
          <option value="alphabet">Alphabet</option>
          <option value="pick">Pick</option>
          <option value="ban">Ban</option>
          <option value="winrate">Win Rate</option>
        </select>
        <button
          className="flex flex-row items-center transition-all duration-300 hover:text-navy-300"
          onClick={handleReverseList}
        >
          {ascendingOrder ? (
            <ArrowUp className="h-6 w-6" />
          ) : (
            <ArrowDown className="h-6 w-6" />
          )}
        </button>
      </div>

      {isStatEmpty ? (
        <p className="font-heading text-sm md:text-xl">
          There is no data available for this option yet.
        </p>
      ) : sortedListCopy.length !== 0 ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="mb-4 font-heading text-xl">Hero</div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Win (%)
          </div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Pick (%)
          </div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Ban (%)
          </div>

          {sortedListCopy.map((hero, i) => {
            const isHeroNewHero = isNewHero(hero);
            const isHeroPickedHero = isPickedHero(hero);

            return (
              <React.Fragment key={i}>
                <div className="flex flex-row text-start font-sat text-sm md:text-[16px]">
                  {isHeroNewHero || isHeroPickedHero ? (
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_192,w_192,g_north/v1686210606/mlbb.fyi/hero/${(
                        hero as NewHero | PickedHero
                      ).heroName.replace(/[ '\s]/g, "_")}.webp`}
                      alt={(hero as NewHero | PickedHero).heroName}
                      width={48}
                      height={48}
                      className="mr-2 h-[24px] w-[24px] rounded-full md:mr-4 md:h-[48px] md:w-[48px]"
                      loading="lazy"
                    />
                  ) : null}
                  <p
                    className="flex flex-row items-center hover:cursor-pointer hover:underline"
                    onClick={() =>
                      isHeroNewHero || isHeroPickedHero
                        ? router.push(
                            `heroes/${(
                              hero as NewHero | PickedHero
                            ).heroName.toLowerCase()}`
                          )
                        : null
                    }
                  >
                    {isHeroNewHero || isHeroPickedHero
                      ? (hero as NewHero | PickedHero).heroName
                      : ""}
                  </p>
                </div>

                <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                  {isHeroNewHero
                    ? hero.stats?.all?.win?.slice(0, -1) || (0.0).toFixed(2)
                    : isHeroPickedHero
                    ? typeof hero.heroPicks?.winRate === "number"
                      ? (hero.heroPicks?.winRate * 100).toFixed(2)
                      : "0.00"
                    : ""}
                </div>
                <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                  {isHeroNewHero
                    ? hero.stats?.all?.use?.slice(0, -1) || ""
                    : isHeroPickedHero
                    ? (hero.heroPicks?.rate
                        ? (hero.heroPicks?.rate * 100).toFixed(2)
                        : 0.0) || "0.00"
                    : ""}
                </div>
                <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                  {isHeroNewHero
                    ? hero.stats?.all?.ban?.slice(0, -1) || "0.00"
                    : isHeroPickedHero
                    ? (hero.heroBans?.rate * 100).toFixed(2) || "0.00"
                    : ""}
                </div>

                {i + 1 !== sortedListCopy.length && (
                  <div
                    className="inset-x-0 h-0.5 w-full bg-navy-400/30"
                    style={{ gridColumn: "1 / -1" }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <p className="font-heading text-sm md:text-xl">
          There is no such data yet
        </p>
      )}
    </GradiantCard>
  );
}
