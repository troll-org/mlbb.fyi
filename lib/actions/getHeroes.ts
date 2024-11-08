import clientPromise from "@/lib/mongoose";
import Heroes from "@/lib/mongoose/schema/heroes";

export default async function getHeroes({ select }: { select?: string }) {
  try {
    await clientPromise("game-core");
    const heroesData = await Heroes.find().select(select || "");

    return heroesData;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch heroes");
  }
}
