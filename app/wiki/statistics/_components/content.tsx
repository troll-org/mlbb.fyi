"use client";

import { TournamentsDocument } from "@/lib/mongoose/schema/tournaments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table";

import React from "react";
import { useSearchParams } from "next/navigation";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "@/app/wiki/statistics/_components/columns";

function StatsDetailContent({
  tournamentData,
}: {
  tournamentData: TournamentsDocument;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") || "";
  const type = searchParams?.get("type") || "";
  const lane = searchParams?.get("lane") || "";

  const filteredData = React.useMemo(() => {
    return tournamentData.data.filter((row) => {
      const matchesQuery =
        !q ||
        (typeof q === "string" &&
          row.heroName.toLowerCase().includes(q.toLowerCase()));

      const matchesType =
        !type ||
        (typeof type === "string" &&
          type
            .split(",")
            .every((typeFilter) =>
              row.heroRoleType?.some((roleType) =>
                roleType.toLowerCase().includes(typeFilter.toLowerCase())
              )
            ));

      const matchesRole =
        !lane ||
        (typeof lane === "string" &&
          lane
            .split(",")
            .every((laneFilter) =>
              row.heroLaneType?.some((laneType) =>
                laneType.toLowerCase().includes(laneFilter.toLowerCase())
              )
            ));

      return matchesQuery && matchesType && matchesRole;
    });
  }, [q, type, lane, tournamentData.data]);

  const table = useReactTable({
    data: filteredData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-b border-ocean">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="px-0">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="border-b border-ocean"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-0 py-2 sm:p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-lg font-heading md:text-xl"
            >
              There is currently no results for this tournament
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default StatsDetailContent;
