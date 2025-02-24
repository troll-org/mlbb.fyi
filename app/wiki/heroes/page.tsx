import getHeroes from "@/lib/actions/getHeroes";
import HeroesContainer from "@/app/wiki/heroes/_components/heroes-container";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Heroes",
  description:
    "Explore the complete and up-to-date list of all Mobile Legends: Bang Bang (MLBB) heroes! Discover their roles, abilities, and lore. Find your perfect hero and dominate the Land of Dawn.",
  openGraph: {
    title: "Heroes",
    description:
      "Explore the complete and up-to-date list of all Mobile Legends: Bang Bang (MLBB) heroes! Discover their roles, abilities, and lore. Find your perfect hero and dominate the Land of Dawn.",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Heroes",
    description:
      "Explore the complete and up-to-date list of all Mobile Legends: Bang Bang (MLBB) heroes! Discover their roles, abilities, and lore. Find your perfect hero and dominate the Land of Dawn.",
    ...defaultTwitterMD,
  },
};

async function HeroesPage() {
  const heroes = await getHeroes({
    select: "-heroDetails -heroImageOriginUrl -_id",
  });

  return <HeroesContainer heroes={heroes} />;
}

export default HeroesPage;
