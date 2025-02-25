"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/shared/button";
import { cn } from "../../lib/utils";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="flex h-[72vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-4xl">Not Found</h1>
      <p className="mb-4 font-semibold">Ooops, this page cannot be found</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "gradiantNavySec" }),
          "w-52 rounded-2xl"
        )}
      >
        Back to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
