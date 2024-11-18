"use client";

import React, { useState } from "react";
import { Label } from "@/components/shared/label";
import { HeroType } from "@/lib/hero-type";
import useHeroFilter from "@/lib/state/useHeroFilter";
import { HeroRole } from "@/lib/hero-role";
import Image from "next/image";

const HeroesFilter = () => {
  const [query, setQuery] = useState("");
  const heroFilter = useHeroFilter();

  const addOrRemove = (value: string, filterKey: "type" | "role") => {
    const filterIndex = heroFilter[filterKey].indexOf(value);
    if (filterIndex === -1) {
      heroFilter.change({
        ...heroFilter,
        [filterKey]: [...heroFilter[filterKey], value],
      });
    } else {
      const updatedFilters = heroFilter[filterKey].filter(
        (filter) => filter !== value
      );
      heroFilter.change({ ...heroFilter, [filterKey]: updatedFilters });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <form action="">
        <h3 className="mt-2.5 font-semibold">Filter by</h3>

        <div className="flex flex-row md:flex-col">
          <ul className="flex w-full flex-col gap-2 md:mt-2.5">
            <p className="text-medium mt-1 text-sm">Type</p>
            {HeroType.map((type, i) => (
              <React.Fragment key={i}>
                <li
                  className="flex w-full cursor-pointer items-center gap-1 "
                  onClick={() =>
                    addOrRemove(
                      type.name.toLowerCase().replace(" ", ""),
                      "type"
                    )
                  }
                >
                  <div
                    className={`flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                      heroFilter.type.includes(
                        type.name.toLowerCase().replace(" ", "")
                      )
                        ? "opacity-100"
                        : "opacity-20"
                    }`}
                  >
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${type.name}.webp`}
                      alt={type.name}
                      width={24}
                      height={24}
                    />
                    <Label className="cursor-pointer">{type.name}</Label>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
          <ul className="flex w-full flex-col gap-2 md:mt-2.5">
            <p className="text-medium mt-1 text-sm">Role</p>
            {HeroRole.map((role, i) => (
              <React.Fragment key={i}>
                <li
                  className="flex w-full cursor-pointer items-center gap-1"
                  onClick={() =>
                    addOrRemove(
                      role.name.toLowerCase().replace(" ", ""),
                      "role"
                    )
                  }
                >
                  <div
                    className={`flex  items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                      heroFilter.role.includes(
                        role.name.toLowerCase().replace(" ", "")
                      )
                        ? "opacity-100"
                        : "opacity-20"
                    }`}
                  >
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroRole/${role.name}.webp`}
                      alt={role.name}
                      width={24}
                      height={24}
                    />
                    <Label className="cursor-pointer">{role.name}</Label>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
};

export default HeroesFilter;
