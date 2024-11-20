import { Metadata } from "next";

import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import ContentLayout from "./content-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://mlbb.fyi"),
  title: {
    template: "%s - mlbb.fyi",
    default: "mlbb.fyi",
  },
  description:
    "mlbb.fyi wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in one place.",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "mlbb.fyi wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in one place.",
    url: "https://mlbb.fyi",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "mlbb.fyi wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in one place.",
    ...defaultTwitterMD,
  },
  keywords: [
    "Mobile Legends wiki",
    "Mobile Legends Bang Bang wiki",
    "MLBB wiki",
    "Mobile Legends guides",
    "Mobile Legends tips",
    "Mobile Legends strategies",
    "Mobile Legends hero stats",
    "Mobile Legends build guides",
    "Mobile Legends gameplay",
    "MLBB gameplay",
    "Mobile Legends hero builds",
    "Mobile Legends patch updates",
    "Mobile Legends item builds",
    "Mobile Legends hero counters",
    "Mobile Legends tier list",
    "Mobile Legends ranked tips",
    "Mobile Legends battle spells",
    "Mobile Legends emblem builds",
    "Mobile Legends hero roles",
    "Mobile Legends tutorials",
    "MLBB hero guides",
    "Mobile Legends esports news",
    "Mobile Legends best heroes",
    "Mobile Legends latest updates",
    "Mobile Legends meta analysis",
    "Mobile Legends advanced tips",
    "Mobile Legends rank improvement",
    "Mobile Legends pro player insights",
    "Mobile Legends gameplay mastery",
    "Mobile Legends tips and tricks",
    "Mobile Legends hero rankings",
    "MLBB wiki resources",
    "MLBB beginner guides",
    "MLBB advanced strategies",
    "Mobile Legends gameplay videos",
    "Mobile Legends team composition",
    "Mobile Legends best items",
    "Mobile Legends skill combos",
    "Mobile Legends hero tier list",
    "Mobile Legends jungling tips",
    "Mobile Legends lane strategy",
    "Mobile Legends solo queue tips",
    "Mobile Legends counter builds",
    "Mobile Legends emblem system",
    "Mobile Legends quick guides",
    "Mobile Legends in-depth guides",
    "MLBB patch notes",
    "Mobile Legends expert advice",
    "Mobile Legends community guides",
    "Mobile Legends learning resources",
    "Mobile Legends skill improvement",
    "Mobile Legends win rates",
    "Mobile Legends latest meta",
    "Mobile Legends popular builds",
    "Mobile Legends hero spotlight",
    "Mobile Legends map control",
    "Mobile Legends ultimate guide",
    "Mobile Legends role mastery",
    "Mobile Legends jungle paths",
    "Mobile Legends lane matchups",
    "Mobile Legends tournaments",
    "Mobile Legends esports tournaments",
    "Mobile Legends tournament news",
    "Mobile Legends tournament statistics",
    "Mobile Legends tournament results",
    "Mobile Legends M-Series",
    "Mobile Legends MPL",
    "Mobile Legends MSC",
    "Mobile Legends pro player stats",
    "Mobile Legends competitive stats",
    "Mobile Legends team statistics",
    "Mobile Legends hero pick rates",
    "Mobile Legends draft analysis",
    "Mobile Legends hero bans",
    "Mobile Legends esports teams",
    "Mobile Legends live tournaments",
    "Mobile Legends tournament schedules",
    "Mobile Legends match statistics",
    "Mobile Legends player stats",
    "Mobile Legends esports leagues",
    "Mobile Legends global tournaments",
    "Mobile Legends championship stats",
    "Mobile Legends match highlights",
    "Mobile Legends pro builds",
    "Mobile Legends gameplay analysis",
    "Mobile Legends player rankings",
    "Mobile Legends tournament replays",
    "MLBB advanced stats",
    "Mobile Legends in-depth statistics",
    "Mobile Legends skill performance",
    "Mobile Legends competitive meta",
    "Mobile Legends team rankings",
    "Mobile Legends event updates",
    "Mobile Legends esports analytics",
    "Mobile Legends pro strategies",
    "Mobile Legends ranked gameplay",
    "Mobile Legends live streams",
    "Mobile Legends skill stats",
    "Mobile Legends match analytics",
    "Mobile Legends draft stats",
    "Mobile Legends pick and ban trends",
    "Mobile Legends power rankings",
    "Mobile Legends esports tournaments",
    "Mobile Legends MVP statistics",
    "Mobile Legends tournament history",
    "Mobile Legends gameplay improvement",
    "Mobile Legends competitive guides",
    "Mobile Legends arena battles",
    "Mobile Legends skill-based ranking",
    "Mobile Legends event stats",
    "Mobile Legends esport tips",
    "Mobile Legends global stats",
    "Mobile Legends professional gameplay",
    "Mobile Legends esport events",
    "Mobile Legends data insights",
    "Mobile Legends esport predictions",
  ],
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
