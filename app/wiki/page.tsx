import { GradiantCard } from "@/components/shared/gradiant-card";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import {
  ArrowRightIcon,
  ChevronRight,
  PersonStandingIcon,
  TrophyIcon,
  WrenchIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <Link href="/wiki/heroes">
          <GradiantCard className="group relative flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[44vw] md:h-[11.6vw] md:rotate-[211deg] md:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

            <Image
              src="/hero-mask.webp"
              alt="Hero-mask"
              width={848}
              height={510}
              className="z-1 absolute bottom-0 right-0 opacity-50 md:h-[17.70833333vw] md:w-[29.4444444vw]"
            />
            <Image
              src="/ixia-suyou.webp"
              alt="ixia-suyou"
              width={355}
              height={255}
              className="z-1 absolute bottom-0 right-0 transition-all duration-500 ease-in-out md:h-[17.70833333vw] md:w-[24.5vw] md:saturate-50 md:group-hover:saturate-100"
            />
            <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Heroes
              </div>

              <button className="z-20 flex flex-row items-center font-heading">
                Master your heroes
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/tier-list">
          <GradiantCard className="group relative flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[44vw] md:h-[11.6vw] md:rotate-[211deg] md:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
            <Image
              src="/tier-list.webp"
              alt="Tier List"
              width={387.31}
              height={263}
              className="z-1 absolute -bottom-6 right-0 md:h-[18.263888887vw] md:w-[26.89652778vw]"
            />
            <Image
              src="/mythic.webp"
              alt="Mythic"
              width={572.5}
              height={562.82}
              className="z-1 absolute -right-[5vw] bottom-0 h-[70vw] w-[75vw] transition-all duration-500 ease-in-out md:right-0 md:h-[19.5423611111vw] md:w-[19.878472222vw] md:rotate-[17deg] md:saturate-50 md:group-hover:rotate-0 md:group-hover:saturate-100"
            />
            <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Tier List
              </div>

              <button className="z-20 flex flex-row items-center font-heading">
                Your hero&apos;s tier here{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/statistics">
          <GradiantCard className="group relative flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[44vw] md:h-[11.6vw] md:rotate-[211deg] md:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
            <Image
              src="/mpl.webp"
              alt="MPL"
              width={387.31}
              height={263}
              className="z-1 absolute -bottom-6 right-0 md:h-[18.263888887vw] md:w-[25.89652778vw]"
            />
            <Image
              src="/rrq.webp"
              alt="RRQ"
              width={400}
              height={323}
              className="z-1 absolute right-[8vw] top-20 h-[50vw] w-[60vw]  rotate-[6deg] transition-all duration-500 ease-in-out md:top-2 md:h-[11.21527778vw] md:w-[13.88888vw] md:saturate-50 md:group-hover:-rotate-[6deg] md:group-hover:saturate-100"
            />
            <Image
              src="/evos.webp"
              alt="Evos"
              width={366}
              height={354}
              className="z-1 absolute bottom-0 right-0 h-[50vw]  w-[50vw] -rotate-[8deg] transition-all duration-500 ease-in-out md:h-[12.29166667vw] md:w-[12.70833333vw] md:saturate-50 md:group-hover:rotate-0 md:group-hover:saturate-100"
            />
            <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Tournament Statistics
              </div>

              <button className="z-20 flex flex-row items-center font-heading">
                Check out the latest statistics{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </button>
            </div>
          </GradiantCard>
        </Link>

        <Link href="/wiki/patches">
          <GradiantCard className="group relative flex h-[100vw] w-[93.3333vw] flex-col justify-start overflow-hidden p-7 md:h-[17.708vw] md:w-full md:px-6 md:py-5 lg:px-10 lg:py-7">
            <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[44vw] md:h-[11.6vw] md:rotate-[211deg] md:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>
            <Image
              src="/lukas-mask.webp"
              alt="Lukas-mask"
              width={384}
              height={255}
              className="z-1 absolute bottom-0 right-0 opacity-0 md:h-[17.70833333vw] md:w-[26.666667vw] md:opacity-100"
            />
            <Image
              src="/lukas.webp"
              alt="lukas"
              width={355}
              height={255}
              className="z-1 absolute bottom-0 right-0 transition-all duration-500 ease-in-out md:h-[17.70833333vw] md:w-[24.6527777778vw] md:saturate-50 md:group-hover:saturate-100"
            />
            <div className="z-10 flex h-full flex-col gap-4 text-left md:justify-between md:gap-0">
              <div className="text-lg font-heading lg:text-xl xl:text-2xl">
                Patches
              </div>

              <button className="z-20 flex flex-row items-center font-heading">
                Check out the latest patch{" "}
                <ChevronRight className="ml-0.5 h-4 w-4 xl:h-6 xl:w-6" />
              </button>
            </div>
          </GradiantCard>
        </Link>
      </div>
    </div>
  );
}
