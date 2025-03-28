"use client";

import React, { useState, useEffect } from "react";
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
import HeroFilter from "@/app/wiki/heroes/_components/hero-filter";
import HeroSearch from "@/app/wiki/heroes/_components/hero-search";
import { cn } from "@/lib/utils";
import { useBreadcrumb } from "@/app/wiki/breadcrumb-context";

interface IStats {
  children: React.ReactNode;
  tourNames: TournamentsDocument[];
}

export default function StatsContainer({ children, tourNames }: IStats) {
  const router = useRouter();
  const pathname = usePathname();
  const { setPageName } = useBreadcrumb();
  const [selectedTournament, setSelectedTournament] = useState(
    decodeURIComponent(pathname?.split("/")[3] || "")
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const tournament = tourNames.find(
      (tourney) => tourney.tournamentPath === selectedTournament
    );
    if (tournament) {
      setPageName(tournament.tournamentName);
    }
  }, [selectedTournament, tourNames, setPageName]);
  
  return (
    <GradiantCard variant="clean" className="min-h-screen">
      <div className="flex flex-col gap-4">
        <HeroFilter />
        <div className="mb-8 flex gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className="flex h-10 w-full max-w-md justify-start rounded-lg border border-cloud/10  bg-cloud/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cloud/30 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-cloud/5 data-[state=open]:ring-1  data-[state=open]:ring-cloud/30">
                <span
                  className={cn(
                    "block overflow-hidden whitespace-nowrap font-medium",
                    selectedTournament ? "text-cloud" : "text-cloud/80"
                  )}
                >
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
                  className="p-0 font-semibold"
                />
                <CommandList>
                  <CommandEmpty className="p-4 text-sm font-semibold text-cloud">
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
                        className="cursor-pointer font-semibold text-cloud transition-all duration-300 ease-in-out hover:bg-white/10"
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
