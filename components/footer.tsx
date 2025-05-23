"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cardVariants } from "@/components/shared/gradiant-card";
import NavLogo from "@/components/shared/navbar/navbar-logo";
import Link from "next/link";
import React from "react";
import footerConfig from "@/lib/configs/footer";

function Footer() {
  const pathname = usePathname();
  const hideFooterRoutes = [
    "/auth/signin",
    "/settings",
    "/not-found",
    "/profile",
  ];
  const [shouldHideFooter, setShouldHideFooter] = useState(false);

  useEffect(() => {
    if (pathname) {
      setShouldHideFooter(
        hideFooterRoutes.some((route) => pathname.startsWith(route))
      );
    }
  }, [pathname]);

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="layout-container">
      <div
        className={`${cardVariants({
          variant: "default",
        })} mx-auto mt-4 !max-w-[1280px] lg:mt-5`}
      >
        <div className="mx-auto px-6 py-8 font-sat md:px-6">
          <div className="flex justify-between gap-8">
            <NavLogo />
            <div className="flex flex-wrap gap-8 md:gap-16">
              {footerConfig.map((section, index) => (
                <div key={index} className="space-y-3">
                  <strong className="font-bold">{section.title}</strong>

                  <div className="flex flex-col gap-2 font-medium">
                    {section.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="hover:underline"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-8 border-cloud/10" />

          <div className="flex justify-between text-[10px] md:text-sm">
            <p>© 2025 copyright mlbb.fyi all rights reserved</p>
            <p className="max-w-[200px] text-end  md:max-w-[400px]">
              Data sourced from the official Mobile Legends Bang Bang website.
              This site is not affiliated with or endorsed by Moonton
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
