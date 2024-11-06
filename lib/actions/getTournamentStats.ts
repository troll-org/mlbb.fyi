import prisma from "@/lib/prismadb";

export default async function getTournamentStats() {
  try {
    const tourneyStats = await prisma.newTournamentsData.findMany();
    return tourneyStats;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch stats");
  }
}
