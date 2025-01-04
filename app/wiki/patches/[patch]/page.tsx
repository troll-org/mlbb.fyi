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
export async function generateMetadata(props: {
  params: Promise<{ patch: string }>;
}): Promise<Metadata> {
  const params = await props.params;
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
    description: `Explore the details, updates, and changes in Mobile Legends (MLBB) patch ${formattedVersion}`,
    openGraph: {
      title: `Patch ${formattedVersion}`,
      description: `Dive into the Mobile Legends (MLBB) patch ${formattedVersion} updates, including hero balances, item adjustments, and bug fixes.`,
      url: `https://mlbb.fyi/wiki/patches/${patchVersion}`,
    },
    twitter: {
      title: `Patch ${formattedVersion}`,
      description: `Learn more about Mobile Legends (MLBB) patch ${formattedVersion} updates and changes`,
    },
  };
}

export default async function PatchPage(props: {
  params: Promise<{ patch: string }>;
}) {
  const params = await props.params;
  const patchVersion = params.patch;
  const isValidPatch = await getPatch(patchVersion);
  if (!isValidPatch) {
    redirect("/not-found");
  }
  const patches = await getPathes();
  return <PatchFyi patch={isValidPatch} patches={patches} />;
}
