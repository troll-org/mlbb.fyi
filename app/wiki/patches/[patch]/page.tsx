import PatchFyi from "@/app/wiki/patches/_components/patch-info";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: { patch: string };
}): Promise<Metadata> {
  const patchVersion = params.patch;
  const patch = await getPatch(patchVersion);

  if (!patch) {
    return {
      title: "Patch Not Found",
      description: "The requested patch version does not exist",
    };
  }

  const formattedVersion = patchVersion.replace(/-/g, ".");
  return {
    title: `Patch ${formattedVersion}`,
    description: `Explore the details, updates, and changes in patch ${formattedVersion} for Mobile Legends: Bang Bang.`,
    openGraph: {
      title: `Patch ${formattedVersion}`,
      description: `Dive into the patch ${formattedVersion} updates, including hero balances, item adjustments, and bug fixes.`,
      url: `https://mlbb.fyi/wiki/patches/${patchVersion}`,
    },
    twitter: {
      title: `Patch ${formattedVersion}`,
      description: `Learn more about patch ${formattedVersion} updates and changes for Mobile Legends: Bang Bang.`,
    },
  };
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
