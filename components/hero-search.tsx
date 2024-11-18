"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/shared/input";

const HeroSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const qParam = searchParams?.get("q") || "";
    setSearchTerm(qParam);
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const query = new URLSearchParams(searchParams?.toString());
    if (newSearchTerm) {
      query.set("q", newSearchTerm);
    } else {
      query.delete("q");
    }

    router.replace(`${pathname}?${query.toString()}`);
  };

  return (
    <Input
      type="text"
      placeholder="Search heroes..."
      value={searchTerm}
      onChange={handleSearch}
      // className="rounded-lg border-cloud py-4"
    />
  );
};

export default HeroSearch;
