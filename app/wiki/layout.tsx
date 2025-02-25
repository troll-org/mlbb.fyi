import { Metadata } from "next";

import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import ContentLayout from "./content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/breadcrumb";
import { BookIcon } from "lucide-react";
import BreadcrumbWiki from "@/app/wiki/breadcrumb-wiki";
import BreadcrumbProvider from "@/app/wiki/breadcrumb-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://mlbb.fyi"),
  title: {
    template: "%s - mlbb.fyi",
    default: "mlbb.fyi",
  },
  description:
    "Mobile Legends (MLBB) Wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in mlbb.fyi",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "Mobile Legends (MLBB) Wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in mlbb.fyi",
    url: "https://mlbb.fyi",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi wiki",
      default: "mlbb.fyi",
    },
    description:
      "Mobile Legends (MLBB) Wiki: Your ultimate source for the latest Mobile Legends info. Find guides, tips, and strategies all in mlbb.fyi",
    ...defaultTwitterMD,
  },
};

export interface LayoutWikiProps {
  children: React.ReactNode;
}

export default function LayoutWiki({ children }: LayoutWikiProps) {
  return (
    <BreadcrumbProvider>
      <ContentLayout>
        <BreadcrumbWiki />

        {children}
      </ContentLayout>
    </BreadcrumbProvider>
  );
}
