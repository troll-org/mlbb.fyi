import { GradiantCard } from "@/components/shared/gradiant-card";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import {
  ArrowRightIcon,
  MedalIcon,
  PersonStandingIcon,
  TrophyIcon,
  WrenchIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const ICON_SIZE = 40;

export const metadata: Metadata = {
  title: "Mobile Legends Wiki | Best MLBB Wiki",
  description:
    "All in Mobile Legends: Bang Bang (MLBB) Wiki to elevate your skills. Check our website now.",
  openGraph: {
    title: "Mobile Legends Wiki | Best MLBB Wiki",
    description:
      "All in Mobile Legends: Bang Bang (MLBB) Wiki to elevate your skills. Check our website now.",
    url: "https://mlbb.fyi/wiki",
    ...defaultOpenGraphMD,
  },
  category: "Tier List",
  twitter: {
    title: "Mobile Legends Wiki | Best MLBB Wiki",
    description:
      "All in Mobile Legends: Bang Bang (MLBB) Wiki to elevate your skills. Check our website now.",
    ...defaultTwitterMD,
  },
};

export default async function WikiPage() {
  return (
    <div>
      <h1 className="pl-2 font-heading text-3xl font-bold">
        Mobile Legends Wiki
      </h1>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:gap-5">
        <Link href="/wiki/heroes">
          <GradiantCard className="group relative flex h-[37.57vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-full md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

            <PersonStandingIcon size={ICON_SIZE} />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-heading lg:text-xl xl:text-2xl">
                Heroes
              </span>

              <button
                className="opacity-0 duration-200 group-hover:opacity-100"
                type="button"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/tier-list">
          <GradiantCard className="group relative flex h-[37.57vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-full md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

            <MedalIcon size={ICON_SIZE} />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-heading lg:text-xl xl:text-2xl">
                Tier List
              </span>

              <button
                className="opacity-0 duration-200 group-hover:opacity-100"
                type="button"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/statistics">
          <GradiantCard className="group relative flex h-[37.57vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-full md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

            <TrophyIcon size={ICON_SIZE} />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-heading lg:text-xl xl:text-2xl">
                Tournament Statistics
              </span>

              <button
                className="opacity-0 duration-200 group-hover:opacity-100"
                type="button"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/patches">
          <GradiantCard className="group relative flex h-[37.57vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-full md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

            <WrenchIcon size={ICON_SIZE} />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-heading lg:text-xl xl:text-2xl">
                Patches
              </span>

              <button
                className="opacity-0 duration-200 group-hover:opacity-100"
                type="button"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </GradiantCard>
        </Link>
      </div>
    </div>
  );
}
