"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/shared/button";
import { cn } from "../../lib/utils";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-heading text-4xl">Ooops...</h1>
      <h2 className="mb-4 font-semibold">This page cannot be found</h2>
      <Button>
        <Link
          href="/"
          className={cn(
            "w-52 rounded-2xl",
            buttonVariants({ variant: "gradiantNavySec" })
          )}
        >
          Back to homepage
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
