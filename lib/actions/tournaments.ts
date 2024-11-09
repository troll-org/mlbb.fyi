import clientPromise from "@/lib/mongoose";
import Tournaments from "@/lib/mongoose/schema/tournaments";
import { Types } from "mongoose";

export async function getAllHeroTournaments() {
  try {
    await clientPromise("game-core");
    const heroData = await Tournaments.aggregate([
      { $unwind: "$data" },
      {
        $group: {
          _id: "$data.heroName", // Group by heroId
          heroName: { $first: "$data.heroName" },
          tournaments: {
            $push: {
              tournamentName: "$tournamentName",
              tournamentDates: "$tournamentDates",
              heroPicks: "$data.heroPicks",
              // blueSidePicks: "$data.blueSidePicks",
              // redSidePicks: "$data.redSidePicks",
              heroBans: "$data.heroBans",
              // pickAndBans: "$data.pickAndBans",
              // heroTopPlayedWith: "$data.heroTopPlayedWith",
              // heroTopPlayedVs: "$data.heroTopPlayedVs",
            },
          },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(heroData));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch heroes");
  }
}

export async function getAllTournamentsName() {
  try {
    await clientPromise("game-core");
    const heroData = await Tournaments.find({}).select("tournamentName");

    return JSON.parse(JSON.stringify(heroData));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch heroes");
  }
}

export async function getAllHeroStatsByTournamentID(tournamentId: string) {
  try {
    await clientPromise("game-core");
    const heroDataForTournament = await Tournaments.aggregate([
      {
        $match: { _id: new Types.ObjectId(tournamentId) },
      },
      {
        $project: {
          data: {
            // heroId: 1,
            heroName: 1,
            heroPicks: 1,
            heroBans: 1,
            // pickAndBans: 1,
            // heroTopPlayedWith: 1,
            // heroTopPlayedVs: 1,
            // Exclude blueSidePicks and redSidePicks
          },
          // dataSourceUrl: 1,
          // scrapedAt: 1,
          tournamentDates: 1,
          tournamentName: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(heroDataForTournament));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch heroes");
  }
}
