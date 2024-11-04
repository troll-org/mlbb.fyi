import { Metadata } from "next";

import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import ContentLayout from "./content-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://mlbb.fyi"),
  title: {
    template: "%s - mlbb.fyi wiki",
    default: "mlbb.fyi wiki",
  },
  description:
    "Wiki, your latest and greatest Mobile Legends information in one place.",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "Wiki, your latest and greatest Mobile Legends information in one place.",
    url: "https://mlbb.fyi",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "Wiki, your latest and greatest Mobile Legends information in one place.",
    ...defaultTwitterMD,
  },
};

export interface LayoutWikiProps {
  children: React.ReactNode;
}

export default function LayoutWiki({ children }: LayoutWikiProps) {
  return (
    <main>
      <h1 className="ml-3 max-w-4xl font-heading text-2xl leading-10 md:text-4xl">
        mlbb.fyi wiki, your latest and greatest Mobile Legends information in
        one place
      </h1>

      <ContentLayout>{children}</ContentLayout>
    </main>
  );
}
