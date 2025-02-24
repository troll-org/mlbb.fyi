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
    <div className="mt-60 flex flex-col items-center justify-center">
      <h1 className="font-heading text-4xl">Not Found</h1>
      <p className="mb-4 font-semibold">Oopps, this page cannot be found</p>
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
