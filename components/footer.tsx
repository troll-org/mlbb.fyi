"use client";

import { cardVariants } from "@/components/shared/gradiant-card";
import NavLogo from "@/components/shared/navbar/navbar-logo";
import Link from "next/link";
import React from "react";
import footerConfig from "@/lib/configs/footer";

function Footer() {
  return (
    <div
      className={`${cardVariants({
        variant: "default",
      })} mx-auto max-w-[1440px] `}
    >
      <div className="mx-auto max-w-[1080px] py-16 font-sat">
        <div className="flex justify-between">
          <NavLogo />
          <div className="flex flex-wrap gap-16">
            {footerConfig.map((section, index) => (
              <div key={index} className="space-y-3">
                <div className="flex flex-col gap-2.5 md:flex-row md:gap-8">
                  {section.links.map((link, i) => (
                    <Link key={i} href={link.href} className="hover:underline">
                      {link.name}
                    </Link>
                  ))}
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
