"use client";

import Link from "next/link";
import Image from "next/image";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { ChevronRight } from "lucide-react";

const HomeBento: React.FC = () => {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-4 pt-16 md:pt-0 lg:gap-5">
      {/* First row: Two columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <GradiantCard className="relative flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
          <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[20vw] md:-top-[7.5vw] md:h-[11.6vw] md:blur-3xl"></div>
          <div className="absolute bottom-0 left-0 z-10 h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
          <Image
            src="/stats.webp"
            alt="Statistics"
            width={265}
            height={208}
            className="z-1 absolute bottom-0 right-0 h-[59.2vw] w-[75vw] md:h-[14.444444444vw] md:w-[18.402777787vw]"
          />
          <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
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
        <GradiantCard className="flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
          <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[44vw] md:h-[11.6vw] md:rotate-[211deg] md:blur-3xl"></div>{" "}
          <div className="absolute bottom-0 left-0 z-10 h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
          <Image
            src="/tier.webp"
            alt="Tier List"
            width={238}
            height={192}
            className="z-1 absolute bottom-0 right-0 h-[59.2vw] w-[75vw] md:h-[13.3333333vw] md:w-[16.5277778vw]"
          />
          <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
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
        <GradiantCard className="flex h-[100vw] w-[93.3333vw] flex-col items-start justify-center overflow-hidden p-7 md:h-full md:w-full md:items-center md:px-6  md:py-5 lg:px-10 lg:py-7">
          <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:top-0 md:h-[11.6vw] md:rotate-0 md:blur-3xl"></div>
          <div className="absolute bottom-0 left-0 z-10 h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
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
            className="z-1 absolute  -top-[180px] h-[90vw] w-[90.133vw] self-center md:-top-[100px] md:h-[24.09722222vw] md:w-[23.4722222vw] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]"
          />
          <div className="z-10 mt-auto flex flex-col items-start gap-4 text-center md:items-center md:justify-center md:gap-0">
            <div className="text-lg font-heading sm:mt-48 md:mt-0 md:p-2 lg:text-xl xl:text-2xl">
              Top Forum & Positive Community
            </div>
            <div className="flex flex-col gap-2 text-sm  md:gap-14 xl:text-xl">
              <p className="text-start text-[#A1ACBE] md:max-w-[20vw] md:text-center">
                Connect with top players and engage in positive, active
                discussions
              </p>
              <Link
                href="/explore"
                className="text-lg z-20 flex flex-row items-start font-heading md:mx-auto md:items-center lg:text-xl xl:text-2xl"
              >
                Get Involved{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 self-center xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
        <div className="flex flex-col gap-4 lg:gap-5">
          <GradiantCard className="hidden h-[33vw] shrink-0 flex-col items-center justify-center overflow-hidden md:flex lg:h-[32vw] xl:h-[17.708vw]">
            <div className="absolute -left-[32vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-1 -right-[48vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 z-20 h-[1vw] w-full bg-[#2B334A] blur-xl"></div>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl">
              mlbb.fyi
            </h1>
          </GradiantCard>
          <GradiantCard className="flex h-[100vw] w-[93.3333vw] shrink-0 flex-col justify-start overflow-hidden p-7 md:h-[20vw] md:px-6 md:py-5 lg:h-[20vw] lg:px-10 lg:py-7 xl:h-[17.708vw]">
            <div className="absolute -left-8 -right-[32vw] -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-top-[7.5vw] md:h-[11.6vw] md:rotate-[21deg] md:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 z-10 h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
            <Image
              src="/profile.webp"
              alt="Profile"
              width={1282}
              height={786}
              className="z-1 absolute -left-8 bottom-0 h-[56vw] w-[100vw] opacity-80 md:-left-16 md:h-[13.64583333vw] md:w-[22.3263889vw]"
            />
            <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between lg:gap-0 ">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Conquer & Be Unstoppable
              </div>
              <div className="flex flex-col items-start gap-2 text-sm  md:items-center md:gap-0 xl:text-xl">
                <p className="text-[#A1ACBE] md:hidden md:max-w-[20vw]">
                  Track your MLBB analytics
                </p>
                <Link
                  href="/settings"
                  className=" z-20 flex flex-row items-center self-start font-heading text-sm  md:self-end xl:text-xl"
                >
                  Track your stats now{" "}
                  <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
                </Link>
              </div>
            </div>
          </GradiantCard>
        </div>
        <GradiantCard className="flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden px-7 py-7 md:h-full  md:w-full md:px-10">
          <div className="absolute -left-8 -right-[32vw] -top-[4vw] block h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:hidden "></div>
          <div className="degree absolute bottom-0 left-0 z-10 h-[6vw] w-[100vw] -rotate-[5deg] bg-[#2B334A] blur-xl md:-bottom-12 md:w-[50vw]"></div>
          <Image
            src="/mathilda.webp"
            alt="Mathilda"
            width={639}
            height={426}
            className="z-1 absolute -bottom-[72vw] left-0 w-[93.3333vw] sm:-bottom-[64vw] md:-bottom-40 md:w-full xl:-bottom-[304px] 2xl:-bottom-60"
          />
          <div className="z-10 flex flex-col items-start justify-center gap-4 text-center md:items-center md:gap-0">
            <div className="text-lg p-0 font-heading md:p-2 lg:text-xl xl:text-2xl">
              Hero Wiki
            </div>
            <div className="flex flex-col gap-2 text-sm xl:text-xl 2xl:gap-6">
              <p className="text-left text-[#A1ACBE] md:max-w-[20vw] md:text-center">
                Detailed equipment, skills, and info for every hero
              </p>
              <Link
                href="/wiki/heroes"
                className="text-lg z-20 flex flex-row items-start font-heading md:mx-auto md:items-center lg:text-xl xl:text-2xl"
              >
                Master your hero{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 self-center xl:h-6 xl:w-6" />
              </Link>
            </div>
          </div>
        </GradiantCard>
      </div>
    </div>
  );
};

export default HomeBento;
