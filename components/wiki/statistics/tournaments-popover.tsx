"use client";

import React, { useEffect, useState } from "react";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/shared/input";
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
                      (tourney) => tourney.tournamentPath === selectedTournament
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

      {children}
    </GradiantCard>
  );
}
