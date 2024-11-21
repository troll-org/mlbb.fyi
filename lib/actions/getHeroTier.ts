import clientPromise from "@/lib/mongoose";
import HeroTier from "@/lib/mongoose/schema/heroes-tier";
import { Types } from "mongoose";

export async function getHeroTier(id: string) {
  try {
    await clientPromise("game-core");

    const heroTier = await HeroTier.aggregate([
      {
        $match: {
          heroId: new Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 0,
          tier: 1,
        },
      },
    ]);

    return heroTier[0].tier;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch hero tier");
  }
}

export async function getHeroTierWithNames({ select }: { select?: string }) {
  try {
    await clientPromise("game-core");

    const heroesData = await HeroTier.aggregate([
      {
        $sort: { updatedAt: -1 },
      },
      {
        $group: {
          _id: "$heroId",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
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
          _id: "$_id",
          tier: 1,
          heroName: "$hero.heroName",
          heroLaneType: "$hero.heroLaneType",
          heroRoleType: "$hero.heroRoleType",
          heroPath: "$hero.heroPath",
          updatedAt: 1,
          ...(select ? { [select]: 1 } : {}),
        },
      },
    ]);
    return heroesData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch hero tiers with names");
  }
}
