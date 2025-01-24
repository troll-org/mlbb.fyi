import getHeroes from "@/lib/actions/getHeroes";
import HeroesContainer from "@/app/wiki/heroes/_components/heroes-container";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Heroes",
  description: "List of all Mobile Legends (MLBB) heroes",
  openGraph: {
    title: "Heroes",
    description: "List of all Mobile Legends (MLBB) heroes",
    url: "https://mlbb.fyi/wiki/heroes",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Heroes",
    description: "List of all Mobile Legends (MLBB) heroes",
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
