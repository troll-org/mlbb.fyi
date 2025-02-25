import { Button } from "@/components/shared/button";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import {
  ArrowRightIcon,
  ChevronRightIcon,
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

const quickLinks = [
  {
    icon: <PersonStandingIcon size={ICON_SIZE} />,
    label: "Heroes",
    link: "/wiki/heroes",
  },
  {
    icon: <MedalIcon size={ICON_SIZE} />,
    label: "Tier List",
    link: "/wiki/tier-list",
  },
  {
    icon: <TrophyIcon size={ICON_SIZE} />,
    label: "Tournament Statistics",
    link: "/wiki/statistics",
  },
  {
    icon: <WrenchIcon size={ICON_SIZE} />,
    label: "Patches",
    link: "/wiki/patches",
  },
];

export default async function WikiPage() {
  return (
    <div>
      <h1 className="pl-2 font-heading text-3xl font-bold">
        Mobile Legends Wiki
      </h1>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:gap-5">
        {quickLinks.map((item) => (
          <Link href={item.link} key={item.link}>
            <GradiantCard className="group relative flex w-[93.3333vw] h-[37.57vw] flex-col justify-start overflow-hidden p-7 md:w-full md:h-full md:px-6 md:py-5 lg:px-10 lg:py-7">
              {/* <div className="absolute -left-8 -top-[4vw] h-[24vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-2xl md:-left-[20vw] md:-top-[7.5vw] md:h-[11.6vw] md:blur-3xl"></div> */}
              <div className="absolute bottom-0 left-0 z-[-1] h-[6vw] w-[100vw] bg-[#2B334A] blur-xl md:h-[2vw] md:w-full"></div>

              {item.icon}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-heading lg:text-xl xl:text-2xl ">
                  {item.label}
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
        ))}
      </div>
    </div>
  );
}
