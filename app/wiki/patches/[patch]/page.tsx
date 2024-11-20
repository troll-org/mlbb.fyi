import PatchFyi from "@/app/wiki/patches/_components/patch-info";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

async function getPatch(version: string) {
  try {
    const patch = await prisma.patch.findFirst({
      where: {
        version: version,
      },
    });
    return patch;
  } catch (error) {
    return null;
  }
}

async function getPathes() {
  try {
    const patches = await prisma.patch.findMany();
    return patches;
  } catch (error) {
    return null;
  }
}

export default async function PatchPage({
  params,
}: {
  params: { patch: string };
}) {
  const patchVersion = params.patch;
  const isValidPatch = await getPatch(patchVersion);
  if (!isValidPatch) {
    redirect("/not-found");
  }
  const patches = await getPathes();
  return <PatchFyi patch={isValidPatch} patches={patches} />;
}
