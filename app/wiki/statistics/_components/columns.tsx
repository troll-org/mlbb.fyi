"use client";

import { Button } from "@/components/shared/button";
import { HeroData } from "@/lib/mongoose/schema/tournaments";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<HeroData>[] = [
  {
    accessorKey: "heroName",
    header: () => {
      return (
        <p className="text-lg  text-start font-heading md:mb-4 md:text-xl">
          Hero
        </p>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-row text-start font-sat text-sm md:text-[16px]">
        <Image
          src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_192,w_192,g_north/mlbb.fyi/heroBase/${(
            row.getValue("heroName") as string
          )
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "_")}.webp`}
          alt={row.getValue("heroName")}
          width={48}
          height={48}
          className="mr-2 h-[24px] w-[24px] rounded-full md:mr-4 md:h-[48px] md:w-[48px]"
          loading="lazy"
        />
        <Link
          href={`/wiki/heroes/${(row.getValue("heroName") as string)
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "_")}`}
          className="flex flex-row items-center hover:cursor-pointer hover:underline sm:font-semibold"
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
          className="text-lg flex justify-self-end pr-0 text-end font-heading sm:mb-4 sm:pr-4 md:text-xl"
        >
          Win
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <p className="flex items-center justify-end font-sat text-sm sm:font-semibold md:text-[16px]">
          {(cell.row.original.heroPicks.winRate * 100).toFixed(2)}%
        </p>
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
          className="text-lg flex justify-self-end pr-0 text-end font-heading sm:mb-4 sm:pr-4 md:text-xl"
        >
          Pick
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <p className="flex items-center justify-end font-sat text-sm sm:font-semibold md:text-[16px]">
          {(cell.row.original.heroPicks.rate * 100).toFixed(2)}%
        </p>
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
          className="text-lg flex justify-self-end pr-0 text-end font-heading sm:mb-4 sm:pr-4 md:text-xl"
        >
          Ban
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <p className="flex items-center justify-end font-sat text-sm sm:font-semibold md:text-[16px]">
          {(cell.row.original.heroBans.rate * 100).toFixed(2)}%
        </p>
      );
    },
  },
];
