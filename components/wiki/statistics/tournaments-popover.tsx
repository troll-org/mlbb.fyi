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
      <div className="mb-8 flex gap-4">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full max-w-md justify-between border-navy-700 font-semibold data-[state=open]:bg-white/10"
              // aria-expanded={!!selectedTournament}
            >
              {selectedTournament
                ? tourNames.find(
                    (tourney) => tourney.tournamentPath === selectedTournament
                  )?.tournamentName
                : "Select a tournament..."}
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
      </div>

      {children}
    </GradiantCard>
  );
}
