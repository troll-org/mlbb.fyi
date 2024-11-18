"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/shared/input";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timer: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
};

const HeroSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const query = useMemo(
    () => new URLSearchParams(searchParams?.toString()),
    [searchParams]
  );

  useEffect(() => {
    const qParam = query.get("q") || "";
    setSearchTerm(qParam);
  }, [query]);

  const debouncedUpdateQuery = useMemo(
    () =>
      debounce((newSearchTerm: string) => {
        if (newSearchTerm) {
          query.set("q", newSearchTerm);
        } else {
          query.delete("q");
        }
        router.replace(`${pathname}?${query.toString()}`);
        setIsLoading(false);
      }, 300),
    [query, pathname, router]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setIsLoading(true);
    debouncedUpdateQuery(newSearchTerm);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search heroes..."
        value={searchTerm}
        onChange={handleSearch}
        // className="rounded-lg border-cloud py-4"
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            fill="none"
            className="h-8 w-8 animate-spin text-pwhite "
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
              stroke="4"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HeroSearch;
