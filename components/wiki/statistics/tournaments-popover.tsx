"use client";

import React, { useState } from "react";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import { usePathname, useRouter } from "next/navigation";
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
import HeroFilter from "@/components/hero-filter";
import HeroSearch from "@/components/hero-search";

interface IStats {
  children: React.ReactNode;
  tourNames: TournamentsDocument[];
}

export default function StatsContainer({ children, tourNames }: IStats) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTournament, setSelectedTournament] = useState(
    pathname?.split("/")[3]
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <GradiantCard variant="clean" className="min-h-screen">
      <div className="flex flex-col gap-4">
        <HeroFilter />
        <div className="mb-8 flex gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex h-10 w-full max-w-md justify-start rounded-lg border border-cloud/10 bg-cloud/5 px-3 py-2 text-sm backdrop-blur-lg focus:outline-none focus:ring-1 focus:ring-cloud/30 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-cloud/10"
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
            <PopoverContent className="w-full max-w-md p-0">
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
          <HeroSearch />
        </div>
      </div>

      {children}
    </GradiantCard>
  );
}
