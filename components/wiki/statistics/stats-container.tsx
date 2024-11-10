"use client";

import React, { useState } from "react";
import { GradiantCard } from "@/components/shared/gradiant-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
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

interface IStats {
  // heroes: NewHero[];
  // tourneyStats: NewTournamentsData[];
  children: React.ReactNode;
  tourNames: TournamentsDocument[];
}

function isDataEmpty(statsList: any[]): boolean {
  return (
    statsList.length === 0 ||
    statsList.every((hero) => !hero.stats && !hero.heroPicks)
  );
}

export default function StatsContainer({
  // heroes,
  // tourneyStats,
  children,
  tourNames,
}: IStats) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTournament, setSelectedTournament] = useState(
    pathname?.split("/")[3]
  );

  return (
    <GradiantCard variant="clean" className="min-h-screen">
      <div className="mb-8 flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full max-w-md justify-between"
              // aria-expanded={!!selectedTournament}
            >
              {selectedTournament
                ? tourNames.find(
                    (tourney) => tourney.tournamentPath === selectedTournament
                  )?.tournamentName
                : "Select a tournament..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-md p-0">
            <Command>
              <CommandInput placeholder="Search tournament..." />
              <CommandList>
                <CommandEmpty>No tournament found.</CommandEmpty>
                <CommandGroup>
                  {tourNames.map((tourney) => (
                    <CommandItem
                      key={tourney.tournamentPath}
                      value={tourney.tournamentPath}
                      onSelect={(currentValue) => {
                        setSelectedTournament(currentValue);
                        router.push(`/wiki/statistics/${currentValue}`);
                      }}
                    >
                      {tourney.tournamentName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {children}
    </GradiantCard>
  );
}
