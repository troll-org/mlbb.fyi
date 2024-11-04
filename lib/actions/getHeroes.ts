import prisma from "@/lib/prismadb";

export default async function getHeroes() {
  try {
    const heroes = await prisma.newHero.findMany();
    return heroes;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch heroes");
  }
}
