"use client";

import Link from "next/link";
import Image from "next/image";
import { GradiantCard } from "@/components/shared/gradiant-card";

const HomeBento: React.FC = () => {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-4 pb-16 lg:gap-5">
      {/* First row: Two columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <GradiantCard className="relative flex h-[17.708vw] flex-col items-center justify-center overflow-hidden">
          <div className="absolute -left-[20vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 z-20 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
          <Image
            src="/stats.webp"
            alt="Statistics"
            width={265}
            height={208}
            className="z-1 absolute bottom-0 right-0 h-[14.444444444vw] w-[18.402777787vw]"
          />
          <Link
            href="/wiki/statistics"
            className="text-lg z-10 text-left font-semibold"
          >
            Access Most Reliable Statistics
          </Link>
        </GradiantCard>
        <GradiantCard className="flex h-[17.708vw] flex-col items-center justify-center overflow-hidden">
          <div className="absolute -left-[44vw] h-[11.6vw] w-[55.556vw] rotate-[211deg] bg-[#6829A8] opacity-20 blur-3xl"></div>{" "}
          <div className="absolute bottom-0 z-20 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
          <Image
            src="/tier.webp"
            alt="Tier List"
            width={238}
            height={192}
            className="z-1 absolute bottom-0 right-0 h-[13.3333333vw] w-[16.5277778vw]"
          />
          <Link href="#" className="text-lg z-10 font-semibold">
            Tier List
          </Link>
        </GradiantCard>
      </div>

      {/* Second row: Three columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        <GradiantCard className="flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-0 h-[11.6vw] w-[55.556vw] bg-[#6829A8] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 z-20 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
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
            className="z-1 absolute -top-[100] h-[24.09722222vw] w-[23.4722222vw] lg:-top-[120] xl:-top-[160]"
          />
          <Link href="#" className="text-lg z-10 font-semibold">
            Top Forum & Positive Community
          </Link>
        </GradiantCard>
        <div className="flex flex-col gap-4 lg:gap-5">
          <GradiantCard className="flex h-[17.708vw] flex-col items-center justify-center overflow-hidden">
            <div className="absolute -left-[32vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-1 -right-[48vw] h-[11.6vw] w-[55.556vw] -rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 z-20 h-[1vw] w-full bg-[#2B334A] blur-xl"></div>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl">
              mlbb.fyi
            </h1>
          </GradiantCard>
          <GradiantCard className="flex h-[17.708vw] flex-col items-center justify-center overflow-hidden">
            <div className="absolute -right-[32vw] -top-[7.5vw] h-[11.6vw] w-[55.556vw] rotate-[21deg] bg-[#6829A8] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 z-20 h-[2vw] w-full bg-[#2B334A] blur-xl"></div>
            <Image
              src="/profile.webp"
              alt="Profile"
              width={1282}
              height={786}
              className="z-1 absolute -left-16 bottom-0 h-[13.64583333vw] w-[22.3263889vw]"
            />
            <Link href="#" className="text-lg z-10 font-semibold">
              Conquer & Be Unstoppable
            </Link>
          </GradiantCard>
        </div>
        <GradiantCard className="flex flex-col items-center justify-center overflow-hidden">
          <div className="degree absolute -bottom-12 z-20 h-[8vw] w-full -rotate-[5deg] bg-[#2B334A] blur-xl"></div>
          <Image
            src="/mathilda.webp"
            alt="Mathilda"
            width={639}
            height={426}
            className="z-1 absolute -bottom-40 lg:-bottom-56"
          />
          <Link href="#" className="text-lg z-10 font-semibold">
            Top Forum & Positive Community
          </Link>
        </GradiantCard>
      </div>
    </div>
  );
};

export default HomeBento;
