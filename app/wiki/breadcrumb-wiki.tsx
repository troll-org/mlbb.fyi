"use client";

import { useBreadcrumb } from "@/app/wiki/breadcrumb-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/breadcrumb";
import { BookIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const items = [
  {
    key: "heroes",
    label: "Heroes",
  },
  {
    key: "patches",
    label: "Patches",
  },
  {
    key: "tier-list",
    label: "Tier List",
  },
  {
    key: "statistics",
    label: "Tournament Statistics",
  },
];

function BreadcrumbWiki() {
  const { pageName } = useBreadcrumb();
  const pathname = usePathname();

  const hasParent = (pathname?.split("/").length as number) > 2;

  const isChild = pathname?.split("/").length === 4;
  const parentKey = pathname?.split("/")[2];

  const parentName = items.find((x) => x.key === parentKey);

  return (
    <Breadcrumb className="py-2 pl-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/wiki">
            <BookIcon size={16} aria-hidden="true" />
            <span className="sr-only">Wiki</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {hasParent && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          {!isChild ? (
            parentName?.label
          ) : (
            <BreadcrumbLink href={`/wiki/${parentKey}`}>
              {parentName?.label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {pageName && isChild && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{pageName}</BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbWiki;
