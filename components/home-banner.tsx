"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HomeBanner: React.FC = () => {
  return (
    <header>
      <style jsx global>{`
        .layout-container {
          max-width: 100% !important;
        }
      `}</style>
      <div className="absolute inset-0">
        <Image
          src="/dawn.webp"
          alt="Background"
          fill
          className="disable-height hidden w-screen opacity-0 transition-opacity duration-1000 ease-in-out md:block"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.classList.remove("opacity-0");
            target.classList.add("opacity-20");
          }}
        />
      </div>
      <div className="flex h-[60vh] items-center justify-center px-8 sm:px-4">
        <main className="flex h-full items-center justify-center">
          <div className="relative flex max-w-xl flex-col items-center text-center">
            <h1 className="font-heading text-[44px] font-bold leading-10 md:text-[60px] md:leading-[56px]">
              Elevate Your Mobile <br className="hidden md:block" /> Legends
              Game
            </h1>
            <p className="mt-6 max-w-[320px] text-[14px] leading-tight text-gray-100 md:max-w-[400px] md:text-[18px]">
              Access hero statistics, optimal builds, and connect with a
              community of expert players
            </p>

            <Link
              href="/wiki/tier-list"
              className="mx-auto mt-8 h-10 w-fit rounded-3xl bg-cloud px-4 py-2 font-semibold text-black transition-all duration-300 ease-in-out hover:opacity-80"
            >
              Get Started
            </Link>
          </div>
        </main>
      </div>
    </header>
  );
};

export default HomeBanner;
