import { redirect } from "next/navigation";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
  openGraph: {
    title: "Statistics",
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
    url: "https://mlbb.fyi/wiki/statistics",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Statistics",
    description:
      "Get the latest statistics of win rates, pick rates, ban rates of heroes from Major Mobile Legends: Bang Bang Tournaments",
    ...defaultTwitterMD,
  },
};

function StatisticsPage() {
  redirect("/wiki/statistics/mlbb-women's-invitational-2023");
}

export default StatisticsPage;
