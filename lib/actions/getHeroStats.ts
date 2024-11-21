import clientPromise from "@/lib/mongoose";
import HeroStats from "@/lib/mongoose/schema/heroes-statistics";
import { Types } from "mongoose";

export default async function getHeroStats(heroId: string) {
  try {
    await clientPromise("game-core");
    const heroStatsData = await HeroStats.aggregate([
      {
        $match: {
          heroId: new Types.ObjectId(heroId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: "$_id",
          data: {
            $map: {
              input: "$data",
              as: "item",
              in: {
                rankName: "$$item.rankName",
                pickRate: "$$item.pickRate",
                banRate: "$$item.banRate",
                winRate: "$$item.winRate",
              },
            },
          },
        },
      },
    ]);

    return {
      ...heroStatsData[0],
      _id: heroStatsData[0]._id.toString(),
    };
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed to fetch hero stats");
  }
}
