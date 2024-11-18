"use client";

import React, { useEffect, useState } from "react";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/shared/input";
import { HeroRole } from "@/lib/hero-role";
import { HeroType } from "@/lib/hero-type";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shared/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import { Button } from "@/components/shared/button";

interface IStats {
  children: React.ReactNode;
  tourNames: TournamentsDocument[];
}

export default function StatsContainer({ children, tourNames }: IStats) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedTournament, setSelectedTournament] = useState(
    pathname?.split("/")[3]
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const qParam = searchParams?.get("q") || "";
    setSearchTerm(qParam);
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const query = new URLSearchParams();
    if (newSearchTerm) {
      query.set("q", newSearchTerm);
    }
    router.replace(`${pathname}?${query.toString()}`);
  };

  return (
    <GradiantCard variant="clean" className="min-h-screen">
      <div className="flex flex-col gap-4">
        <form action="">
          <div className="flex flex-row items-center gap-8">
            <ul className="flex flex-col gap-2">
              <p className="text-medium mt-1 text-sm">Type</p>
              <div className="flex flex-row gap-2">
                {HeroType.map(({ name: type }, i) => (
                  <React.Fragment key={i}>
                    <li
                      className="flex cursor-pointer items-center gap-1"
                      onClick={() => {
                        const newSearchParams = new URLSearchParams(
                          searchParams?.toString()
                        );
                        const types = newSearchParams.get("type")
                          ? newSearchParams.get("type")!.split(",")
                          : [];
                        if (types.includes(type.toLowerCase())) {
                          newSearchParams.set(
                            "type",
                            types
                              .filter((t) => t !== type.toLowerCase())
                              .join(",")
                          );
                        } else {
                          types.push(type.toLowerCase());
                          newSearchParams.set("type", types.join(","));
                        }
                        router.replace(
                          `${pathname}?${newSearchParams.toString()}`
                        );
                      }}
                    >
                      <div
                        className={`flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                          searchParams
                            ?.get("type")
                            ?.split(",")
                            .includes(type.toLowerCase())
                            ? "opacity-100"
                            : "opacity-20"
                        }`}
                      >
                        <Image
                          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${type}.webp`}
                          alt={type}
                          width={36}
                          height={36}
                        />
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </div>
            </ul>

            <ul className="flex flex-col gap-2">
              <p className="text-medium text-sm">Role</p>
              <div className="flex flex-row gap-2">
                {HeroRole.map(({ name: lane }, i) => (
                  <React.Fragment key={i}>
                    <li
                      className="flex cursor-pointer items-center gap-1"
                      onClick={() => {
                        const newSearchParams = new URLSearchParams(
                          searchParams?.toString()
                        );
                        const lanes = newSearchParams.get("lane")
                          ? newSearchParams.get("lane")!.split(",")
                          : [];
                        if (lanes.includes(lane.toLowerCase())) {
                          newSearchParams.set(
                            "lane",
                            lanes
                              .filter((r) => r !== lane.toLowerCase())
                              .join(",")
                          );
                        } else {
                          lanes.push(lane.toLowerCase());
                          newSearchParams.set("lane", lanes.join(","));
                        }
                        router.replace(
                          `${pathname}?${newSearchParams.toString()}`
                        );
                      }}
                    >
                      <div
                        className={`flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:opacity-100 ${
                          searchParams
                            ?.get("lane")
                            ?.split(",")
                            .includes(lane.toLowerCase())
                            ? "opacity-100"
                            : "opacity-20"
                        }`}
                      >
                        <Image
                          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroRole/${lane}.webp`}
                          alt={lane}
                          width={36}
                          height={36}
                        />
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </div>
            </ul>
          </div>
        </form>
        <div className="mb-8 flex gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full max-w-md justify-start overflow-hidden text-ellipsis whitespace-nowrap border-navy-700 text-sm font-semibold data-[state=open]:bg-white/5"
              >
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedTournament
                    ? tourNames.find(
                        (tourney) =>
                          tourney.tournamentPath === selectedTournament
                      )?.tournamentName
                    : "Select tournament..."}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-md border-navy-700 p-0">
              <Command>
                <CommandInput
                  placeholder="Search tournament..."
                  className=" p-0 font-semibold"
                />
                <CommandList>
                  <CommandEmpty className="p-4 text-sm font-semibold">
                    No tournament found
                  </CommandEmpty>
                  <CommandGroup>
                    {tourNames.map((tourney) => (
                      <CommandItem
                        key={tourney.tournamentPath}
                        value={tourney.tournamentPath}
                        onSelect={(currentValue) => {
                          setSelectedTournament(currentValue);
                          router.push(`/wiki/statistics/${currentValue}`);
                          setPopoverOpen(false);
                        }}
                        className="cursor-pointer font-semibold transition-all duration-300 ease-in-out hover:bg-white/10"
                      >
                        {tourney.tournamentName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            placeholder="Search heroes..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-lg border-navy-700 py-4"
          />
        </div>
      </div>

      {children}
    </GradiantCard>
  );
}
