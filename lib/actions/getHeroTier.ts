import clientPromise from "@/lib/mongoose";
import HeroTier from "@/lib/mongoose/schema/heroes-tier";

export async function getHeroTier({ select }: { select?: string }) {
  try {
    await clientPromise("game-core");
    const heroesData = await HeroTier.find()
      .select(select || "")
      .lean();

    return heroesData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch hero tiers");
  }
}

export async function getHeroTierWithNames({ select }: { select?: string }) {
  try {
    await clientPromise("game-core");

    const heroesData = await HeroTier.aggregate([
      {
        $lookup: {
          from: "Heroes",
          localField: "heroId",
          foreignField: "_id",
          as: "hero",
        },
      },
      {
        $unwind: "$hero",
      },
      {
        $project: {
          _id: 0,
          tier: 1,
          name: "$hero.heroName",
          ...(select ? { [select]: 1 } : {}),
        },
      },
    ]);
    console.log(heroesData);
    return heroesData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch hero tiers with names");
  }
}
