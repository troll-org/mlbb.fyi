import { pageList } from "@/app/wiki/tier-list/(static)/[path]/config";
import getHeroes from "@/lib/actions/getHeroes";
import { getAllTournamentsName } from "@/lib/actions/tournaments";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const heroes = await getHeroes({
    select: "heroPath",
  });

  const stats = await getAllTournamentsName();

  const dsa = pageList.map((p) => ({
    url: `${url}/wiki/tier-list/${p.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${url}/wiki/heroes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...heroes.map((hero) => ({
      url: `${url}/wiki/heroes/${hero.heroPath}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as "weekly",
      priority: 0.9,
    })),
    {
      url: `${url}/wiki/tier-list`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...pageList.map((hero) => ({
      url: `${url}/wiki/tier-list/${hero.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as "weekly",
      priority: 0.9,
    })),
    {
      url: `${url}/wiki/statistics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // ...stats.map((stat) => ({
    //   url: `${url}/wiki/statistics/${encodeURIComponent(stat.tournamentPath)}`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly" as "weekly",
    //   priority: 0.9,
    // })),
    {
      url: `${url}/wiki/patches`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/explore`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
