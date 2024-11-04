import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export const defaultOpenGraphMD: OpenGraph = {
  siteName: "mlbb.fyi",
  images: [
    {
      url: "/og.jpg",
      width: 1260,
      height: 600,
    },
  ],
  locale: "en-US",
  type: "website",
};

export const defaultTwitterMD: Twitter = {
  images: ["/og.jpg"],
  card: "summary_large_image",
};
