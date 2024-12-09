"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HomeBanner: React.FC = () => {
  return (
    <>
      <style jsx global>{`
        .layout-container {
          max-width: 100% !important;
        }
      `}</style>
      <div className="absolute inset-0">
        <Image
          src="/dawn.webp"
          alt="Background"
          layout="fill"
          className="w-screen opacity-0 transition-opacity duration-1000 ease-in-out"
          onLoadingComplete={(img) => {
            img.classList.remove("opacity-0");
            img.classList.add("opacity-20");
          }}
        />
      </div>
      <div className="flex h-[84vh] items-center justify-center px-8 sm:px-4">
        <main className="flex h-full items-center justify-center">
          <div className="relative flex max-w-xl flex-col items-center text-center">
            <h1 className="font-heading text-[44px] font-bold leading-10 md:text-[60px] md:leading-[56px]">
              Elevate Your Mobile <br className="hidden md:block" /> Legends
              Game
            </h1>
            <p className="pt-3 text-[14px] leading-tight text-gray-100 md:text-[18px]">
              Access hero statistics, optimal builds, and connect
              <br className="hidden md:block" /> with a community of expert
              players.
            </p>

            <Link
              href="/explore"
              className={cn(
                buttonVariants({ variant: "gradiantNavySec" }),
                "mx-auto mt-4 w-fit rounded-3xl"
              )}
            >
              Get Started
            </Link>

            <div className="flex flex-col items-center justify-center pt-[100px]">
              <div className="flex items-end justify-center">
                <p className="text-center text-[12px] text-neutral-500">
                  mlbb.fyi was made as part of 2023 Orbital project, and is not
                  endorsed by Moonton or Mobile Legends: Bang Bang. mlbb.fyi
                  does not reflect the views or opinions of Moonton or anyone
                  officially involved in producing or managing Mobile Legends.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeBanner;
