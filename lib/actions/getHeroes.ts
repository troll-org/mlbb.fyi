import clientPromise from "@/lib/mongoose";
import Heroes from "@/lib/mongoose/schema/heroes";

export default async function getHeroes({ select }: { select?: string }) {
  try {
    await clientPromise("game-core");
    const heroesData = await Heroes.find()
      .select(select || "")
      .lean();

    return heroesData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch heroes");
  }
}

export async function getOneHero(heroPath?: string) {
  try {
    await clientPromise("game-core");
    const heroData = await Heroes.findOne({
      heroPath: heroPath,
    }).lean();

    return JSON.parse(JSON.stringify(heroData));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch heroes");
  }
}
