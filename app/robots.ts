import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/wiki/", "/profile/"],
      disallow: ["/explore/"],
    },
    sitemap: "https://mlbb.fyi/sitemap.xml",
  };
}
