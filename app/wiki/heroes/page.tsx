import getHeroes from "@/lib/actions/getHeroes";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroFilter from "@/components/hero-filter";
import HeroSearch from "@/components/hero-search";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Heroes",
  description: "List of all heroes in Mobile Legends: Bang Bang",
  openGraph: {
    title: "Heroes",
    description: "List of all heroes in Mobile Legends: Bang Bang",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Heroes",
    description: "List of all heroes in Mobile Legends: Bang Bang",
    ...defaultTwitterMD,
  },
};

async function HeroesPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    type?: string;
    lane?: string;
  };
}) {
  const heroes = await getHeroes({
    select: "-heroDetails -heroImageOriginUrl -_id",
  });

  return (
    <>
      <GradiantCard
        className="flex h-fit w-full flex-col-reverse gap-4 px-6 md:sticky md:top-20 md:w-[220px] md:flex-col"
        variant="clean"
      >
        <HeroSearch />
        <HeroFilter orientation="vertical" />
      </GradiantCard>
      <HeroesContainer heroes={heroes} query={searchParams} />
    </>
  );
}

export default HeroesPage;
