import prisma from "@/lib/prismadb";

export default async function getPatches() {
  try {
    const patches = await prisma.patch.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return patches;
  } catch (error) {
    return null;
  }
}
