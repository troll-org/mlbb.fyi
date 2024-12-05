import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";

import { getCurrentUser } from "@/lib/actions/user";
import ToasterProvider from "@/components/toaster-provider";
import Navbar from "@/components/shared/navbar/navbar";
import { cn } from "@/lib/utils";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { CSPostHogProvider } from "@/components/cllent-provider";

const inter = Inter({ subsets: ["latin"] });

const fontHeading = localFont({
  src: "../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
const fontSatoshi = localFont({
  src: "../public/assets/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});



export const metadata: Metadata = {
  metadataBase: new URL("https://mlbb.fyi"),
  title: {
    template: "%s - mlbb.fyi",
    default: "mlbb.fyi - Elevate Your Mobile Legends Game",
  },
  description:
    "Boost your Mobile Legends gameplay with hero statistics, optimal builds, and connect with expert players.",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi - Elevate Your Mobile Legends Game",
    },
    description:
      "Boost your Mobile Legends gameplay with hero statistics, optimal builds, and connect with expert players.",
    url: "https://mlbb.fyi",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi - Elevate Your Mobile Legends Game",
    },
    description:
      "Boost your Mobile Legends gameplay with hero statistics, optimal builds, and connect with expert players.",
    ...defaultTwitterMD,
  },
  keywords: [
    "Mobile Legends",
    "Mobile Legends Bang Bang",
    "MLBB",
    "Mobile Legends heroes",
    "hero statistics",
    "Mobile Legends builds",
    "optimal builds",
    "Mobile Legends tips",
    "Mobile Legends guide",
    "MLBB guide",
    "Mobile Legends gameplay",
    "Mobile Legends strategies",
    "Mobile Legends community",
    "Mobile Legends expert players",
    "MLBB meta",
    "Mobile Legends builds and stats",
    "Mobile Legends analytics",
    "Mobile Legends tier list",
    "Mobile Legends hero builds",
    "MLBB gameplay improvement",
    "Mobile Legends data",
    "Mobile Legends player rankings",
    "Mobile Legends matchmaking",
    "Mobile Legends pro builds",
    "MLBB advanced stats",
    "Mobile Legends game tips",
    "Mobile Legends tactics",
    "MLBB builds and strategies",
    "Mobile Legends in-depth analysis",
    "Mobile Legends esports",
    "MLBB pro player insights",
    "Mobile Legends win rates",
    "Mobile Legends patch updates",
    "Mobile Legends hero guides",
    "MLBB ranking improvement",
    "Mobile Legends climb ranks",
    "MLBB skills improvement",
    "Mobile Legends tips and tricks",
    "Mobile Legends gameplay mastery",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${inter.className} ${fontHeading.variable} ${fontSatoshi.variable} text-cloud`}
    >
      <CSPostHogProvider>
        {/* {process.env.NODE_ENV === "production" && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-RYMVSHE2KQ"
              strategy="afterInteractive"
            ></Script>
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-RYMVSHE2KQ');`}
            </Script>
          </>
        )} */}
        <body
          className={cn("relative mx-auto mb-8 mt-24 bg-deepocean text-cloud")}
        >
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <div className="relative mx-auto max-w-[1080px] px-4">{children}</div>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
