"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeroRole, HeroType } from "@/lib/types";
import { Label } from "@/components/shared/label";

interface HeroFilterProps {
  orientation?: "horizontal" | "vertical";
}

const HeroFilter: React.FC<HeroFilterProps> = ({
  orientation = "horizontal",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTypeClick = (type: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    const types = newSearchParams.get("type")
      ? newSearchParams.get("type")!.split(",")
      : [];
    if (types.includes(type.toLowerCase())) {
      newSearchParams.set(
        "type",
        types.filter((t) => t !== type.toLowerCase()).join(",")
      );
    } else {
      types.push(type.toLowerCase());
      newSearchParams.set("type", types.join(","));
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleRoleClick = (lane: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    const lanes = newSearchParams.get("lane")
      ? newSearchParams.get("lane")!.split(",")
      : [];
    if (lanes.includes(lane.toLowerCase())) {
      newSearchParams.set(
        "lane",
        lanes.filter((r) => r !== lane.toLowerCase()).join(",")
      );
    } else {
      lanes.push(lane.toLowerCase());
      newSearchParams.set("lane", lanes.join(","));
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div
      className={`flex items-center gap-8 ${
        orientation === "horizontal"
          ? "flex-row"
          : "mt-4 flex-row gap-24 md:mt-0 md:flex-col md:items-start md:gap-4"
      }`}
    >
      <ul className="flex flex-col gap-2">
        <p
          className={`text-medium text-sm ${
            orientation === "horizontal" ? "mt-1" : "md:mt-0"
          }`}
        >
          Type
        </p>
        <div
          className={`flex gap-2 ${
            orientation === "horizontal" ? "flex-row" : "flex-row md:flex-col"
          }`}
        >
          {HeroType.map(({ name: type }, i) => (
            <React.Fragment key={i}>
              <li
                className={`flex cursor-pointer items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                  searchParams
                    ?.get("type")
                    ?.split(",")
                    .includes(type.toLowerCase())
                    ? "opacity-100"
                    : "opacity-40"
                }`}
                onClick={() => handleTypeClick(type)}
              >
                <div className="flex items-center gap-1.5">
                  <Image
                    src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${type}.webp`}
                    alt={type}
                    width={36}
                    height={36}
                  />
                </div>
                {orientation === "vertical" && (
                  <Label className="ml-2 hidden cursor-pointer md:block">
                    {type}
                  </Label>
                )}
              </li>
            </React.Fragment>
          ))}
        </div>
      </ul>

      <ul className="flex flex-col gap-2">
        <p className="text-medium text-sm">Role</p>
        <div
          className={`flex gap-2 ${
            orientation === "horizontal" ? "flex-row" : "flex-row md:flex-col"
          }`}
        >
          {HeroRole.map(({ name: lane }, i) => (
            <React.Fragment key={i}>
              <li
                className={`flex cursor-pointer items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                  searchParams
                    ?.get("lane")
                    ?.split(",")
                    .includes(lane.toLowerCase())
                    ? "opacity-100"
                    : "opacity-40"
                }`}
                onClick={() => handleRoleClick(lane)}
              >
                <div className="flex items-center gap-1.5 ">
                  <Image
                    src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroRole/${lane}.webp`}
                    alt={lane}
                    width={36}
                    height={36}
                  />
                </div>
                {orientation === "vertical" && (
                  <Label className="ml-2 hidden cursor-pointer md:block">
                    {lane}
                  </Label>
                )}
              </li>
            </React.Fragment>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default HeroFilter;
