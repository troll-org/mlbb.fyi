"use client";

import { Button } from "@/components/shared/button";
import {
  HeroData,
  TournamentsDocument,
} from "@/lib/mongoose/schema/tournaments";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<HeroData>[] = [
  {
    accessorKey: "heroName",
    header: "Hero",
    cell: ({ row }) => (
      <div className="flex flex-row text-start font-sat text-sm md:text-[16px]">
        <Image
          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_192,w_192,g_north/mlbb.fyi/hero/${row.getValue(
            "heroName"
          )}.webp`}
          alt={row.getValue("heroName")}
          width={48}
          height={48}
          className="mr-2 h-[24px] w-[24px] rounded-full md:mr-4 md:h-[48px] md:w-[48px]"
          loading="lazy"
        />
        <Link
          href={`/heroes/${(row.getValue("heroName") as string).toLowerCase()}`}
          className="flex flex-row items-center hover:cursor-pointer hover:underline"
        >
          {row.getValue("heroName")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "heroPicks.winRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Win (%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "heroPicks.totalpicks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Pick
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "heroBans.rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ban (%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
