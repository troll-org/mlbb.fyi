"use client";

import Link from "next/link";
import Image from "next/image";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { ChevronRight } from "lucide-react";

const HomeBento: React.FC = () => {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-4 lg:gap-5">
      {/* First row: Two columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <GradiantCard className="relative flex h-[17.708vw] flex-col justify-start overflow-hidden px-6 py-5 lg:px-10 lg:py-7">
          <div className="absolute -left-[20vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 z-10 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
          <Image
            src="/stats.webp"
            alt="Statistics"
            width={265}
            height={208}
            className="z-1 absolute bottom-0 right-0 h-[14.444444444vw] w-[18.402777787vw]"
          />
          <div className="z-10 flex h-full flex-col justify-between text-left">
            <div className="text-lg font-heading lg:text-xl xl:text-2xl">
              Access Most Reliable Statistics
            </div>
            <div className="flex flex-col gap-2 text-sm lg:gap-4 xl:text-xl">
              <p className="text-[#A1ACBE]">
                Leverage live stats for smarter, <br /> and winning decision
              </p>
              <Link
                href="/wiki/statistics"
                className="z-20 flex flex-row items-center font-heading"
              >
                Live stats here{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
        <GradiantCard className="flex h-[17.708vw] flex-col justify-start overflow-hidden px-6 py-5 lg:px-10 lg:py-7">
          <div className="absolute -left-[44vw] h-[11.6vw] w-[55.556vw] rotate-[211deg] bg-[#6829A8] opacity-20 blur-3xl"></div>{" "}
          <div className="absolute bottom-0 z-10 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
          <Image
            src="/tier.webp"
            alt="Tier List"
            width={238}
            height={192}
            className="z-1 absolute bottom-0 right-0 h-[13.3333333vw] w-[16.5277778vw]"
          />
          <div className="z-10 flex h-full flex-col justify-between text-left">
            <div className="text-lg font-heading lg:text-xl xl:text-2xl">
              Up-to-date Tier List
            </div>
            <div className="flex flex-col gap-2 text-sm lg:gap-4 xl:text-xl">
              <p className="text-[#A1ACBE]">
                Identify top-tier heroes <br /> to dominate matches
              </p>
              <Link
                href="/wiki/tier-list"
                className="z-20 flex flex-row items-center font-heading"
              >
                Your hero's tier here{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
      </div>

      {/* Second row: Three columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        <GradiantCard className="flex flex-col items-center justify-center overflow-hidden px-6 py-5 lg:px-10 lg:py-7">
          <div className="absolute top-0 h-[11.6vw] w-[55.556vw] bg-[#6829A8] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 z-10 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
          <Image
            src="/dawn.webp"
            alt="Dawn"
            layout="fill"
            className="z-1 absolute opacity-25"
          />
          <Image
            src="/circle.webp"
            alt="Cricle"
            width={338}
            height={347}
            className="z-1 absolute -top-[100px] h-[24.09722222vw] w-[23.4722222vw] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]"
          />
          <div className="z-10 mt-40 flex flex-col items-center justify-center text-center">
            <div className="text-lg p-2 font-heading lg:text-xl xl:text-2xl">
              Top Forum & Positive Community
            </div>
            <div className="flex flex-col gap-14  text-sm xl:text-xl">
              <p className="max-w-[20vw] text-[#A1ACBE]">
                Connect with top players and engage in positive, active
                discussions
              </p>
              <Link
                href="/explore"
                className="text-lg z-20 mx-auto flex flex-row items-center font-heading lg:text-xl xl:text-2xl"
              >
                Get Involved{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
        <div className="flex flex-col gap-4 lg:gap-5">
          <GradiantCard className="flex h-[33vw] shrink-0 flex-col items-center justify-center overflow-hidden lg:h-[32vw] xl:h-[17.708vw]">
            <div className="absolute -left-[32vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-1 -right-[48vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 z-20 h-[1vw] w-full bg-[#2B334A] blur-xl"></div>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl">
              mlbb.fyi
            </h1>
          </GradiantCard>
          <GradiantCard className="flex shrink-0 flex-col justify-start overflow-hidden px-6 py-5 lg:h-[20vw] lg:px-10 lg:py-7 xl:h-[17.708vw]">
            <div className="absolute -right-[32vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 z-10 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
            <Image
              src="/profile.webp"
              alt="Profile"
              width={1282}
              height={786}
              className="z-1 absolute -left-16 bottom-0 h-[13.64583333vw] w-[22.3263889vw] opacity-80"
            />
            <div className="z-10 flex h-full flex-col justify-between gap-8 text-left lg:gap-0 ">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Conquer & Be Unstoppable
              </div>
              <div className="flex flex-col items-center gap-4 text-xl">
                <Link
                  href="/settings"
                  className=" z-20 flex flex-row items-center self-end font-heading  text-sm xl:text-xl"
                >
                  Track your stats now{" "}
                  <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
                </Link>
              </div>
            </div>
          </GradiantCard>
        </div>
        <GradiantCard className="flex flex-col justify-start overflow-hidden px-10 py-7">
          <div className="degree absolute -bottom-12 z-10 h-[6vw] w-[50vw] -rotate-[5deg] bg-[#2B334A] blur-xl"></div>
          <Image
            src="/mathilda.webp"
            alt="Mathilda"
            width={639}
            height={426}
            className="z-1 xl:-bottom- absolute -bottom-40 left-0 xl:-bottom-[304px] 2xl:-bottom-60"
          />
          <div className="z-10 flex flex-col items-center justify-center text-center">
            <div className="text-lg p-2 font-heading lg:text-xl xl:text-2xl">
              Hero Wiki
            </div>
            <div className="flex flex-col gap-4 text-sm xl:text-xl 2xl:gap-6">
              <p className="max-w-[20vw] text-[#A1ACBE]">
                Detailed equipment, skills, and info for every hero
              </p>
              <Link
                href="/wiki/heroes"
                className="text-lg z-20 mx-auto flex flex-row items-center font-heading lg:text-xl xl:text-2xl"
              >
                Master your hero{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
      </div>
    </div>
  );
};

export default HomeBento;
