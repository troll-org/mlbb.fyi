import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";

import ToasterProvider from "@/components/toaster-provider";
import Navbar from "@/components/shared/navbar/navbar";
import { cn } from "@/lib/utils";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";
import { CSPostHogProvider } from "@/components/client-provider";
import { AuthProvider } from "@/components/auth-provider";
import Footer from "@/components/footer";

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
    "Boost your Mobile Legends (MLBB) gameplay with hero statistics, optimal builds, and connect with expert players",
  openGraph: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi - Elevate Your Mobile Legends Game",
    },
    description:
      "Boost your Mobile Legends (MLBB) gameplay with hero statistics, optimal builds, and connect with expert players",
    url: "https://mlbb.fyi",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: {
      template: "%s - mlbb.fyi",
      default: "mlbb.fyi - Elevate Your Mobile Legends Game",
    },
    description:
      "Boost your Mobile Legends (MLBB) gameplay with hero statistics, optimal builds, and connect with expert players",
    ...defaultTwitterMD,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${fontHeading.variable} ${fontSatoshi.variable} text-cloud`}
    >
      <AuthProvider>
        <CSPostHogProvider>
          {process.env.NODE_ENV === "production" && (
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
          )}

          <body
            className={cn(
              "relative mx-auto mb-8 mt-24 bg-deepocean text-cloud"
            )}
          >
            <Navbar />
            <main className="layout-container">{children}</main>
            <Footer />
            <ToasterProvider />
          </body>
        </CSPostHogProvider>
      </AuthProvider>
    </html>
  );
}
