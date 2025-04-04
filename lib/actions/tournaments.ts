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

    tournamentPath = decodeURIComponent(tournamentPath);

    const heroDataForTournament = await Tournaments.aggregate([
      {
        $match: { tournamentPath: tournamentPath },
      },
      {
        $unwind: "$data",
      },
      {
        $lookup: {
          from: "Heroes",
          localField: "data.heroId",
          foreignField: "_id",
          as: "heroDetails",
        },
      },
      {
        $unwind: {
          path: "$heroDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          data: {
            heroId: "$data.heroId",
            heroName: "$data.heroName",
            heroPicks: "$data.heroPicks",
            heroBans: "$data.heroBans",
            heroLaneType: "$heroDetails.heroLaneType",
            heroRoleType: "$heroDetails.heroRoleType",
          },
          tournamentDates: 1,
          tournamentName: 1,
          tournamentPath: 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          data: { $push: "$data" },
          tournamentDates: { $first: "$tournamentDates" },
          tournamentName: { $first: "$tournamentName" },
          tournamentPath: { $first: "$tournamentPath" },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(heroDataForTournament[0]));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tournaments");
  }
}
