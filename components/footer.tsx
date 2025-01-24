"use client";

import { cardVariants } from "@/components/shared/gradiant-card";
import NavLogo from "@/components/shared/navbar/navbar-logo";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className={cardVariants({ variant: "default" })}>
      <div className="mx-auto max-w-[1080px] py-16 font-sat">
        <div className="flex justify-between">
          <NavLogo />
          <div className="flex flex-wrap gap-16">
            {Array.from({ length: 1 }).map((x, i) => (
              <div className="space-y-3">
                <p>Mlbb.fyi</p>
                <div className="flex flex-col gap-2.5">
                  {Array.from({ length: 4 }).map((x, i) => {
                    return <Link href="#">About Mlbb.fyi</Link>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 border-cloud/10" />

        <div className="flex justify-between">
          <p>© 2024 copyright mlbb.fyi all rights reserved</p>
          <p className="text-end">
            Data sourced from the official Mobile Legends Bang Bang website
            <br />
            This site is not affiliated with or endorsed by Moonton
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
