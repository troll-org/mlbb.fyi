import getHeroBuild from "@/lib/actions/getHeroBuild";
import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";

async function getHero(name: string) {
  try {
    const hero = await prisma?.hero.findFirst({
      where: {
        name: name,
      },
      include: {
        details: true,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
}

export default async function HeroPage({
  params,
}: {
  params: { subWiki: string; hero: string };
}) {
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));
  const parseHero = decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  const isExistingHero = await getHero(parseHero);

  if (params.subWiki !== "heroes" || !isExistingHero) {
    notFound();
  }

  const heroBuild = await getHeroBuild(isExistingHero.id);
  console.log(heroBuild);
  console.log(typeof heroBuild);

  return (
    <>
      <HeroFyi hero={isExistingHero}></HeroFyi>
    </>
  );
}
