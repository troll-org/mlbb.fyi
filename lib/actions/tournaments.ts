import clientPromise from "@/lib/mongoose";
import Tournaments, {
  TournamentsDocument,
} from "@/lib/mongoose/schema/tournaments";

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
              tournamentPath: "$tournamentPath",
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
    throw new Error("Failed to fetch tournaments");
  }
}

export async function getAllTournamentsName(): Promise<TournamentsDocument[]> {
  try {
    await clientPromise("game-core");
    const heroData: TournamentsDocument[] = await Tournaments.find({}).select(
      "tournamentName tournamentPath"
    );

    return JSON.parse(JSON.stringify(heroData));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tournaments");
  }
}

export async function getAllHeroStatsByTournamentPath(tournamentPath: string) {
  try {
    await clientPromise("game-core");
    const heroDataForTournament = await Tournaments.aggregate([
      {
        $match: { tournamentPath: tournamentPath },
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
          tournamentPath: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(heroDataForTournament[0]));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tournaments");
  }
}
