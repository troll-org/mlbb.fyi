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
        <Select
          value={selectedTournament}
          onValueChange={(value) => {
            setSelectedTournament(value);
            router.push(`/wiki/statistics/${value}`);
          }}
        >
          <SelectTrigger className="w-full max-w-md">
            <SelectValue
              placeholder={
                selectedTournament ? selectedTournament : "Select a tournament"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {tourNames.map((tourney) => (
              <SelectItem
                key={tourney.tournamentPath}
                value={tourney.tournamentPath}
              >
                {tourney.tournamentName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {children}
    </GradiantCard>
  );
}
