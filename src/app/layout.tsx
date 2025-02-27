import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google"
import "@/styles/globals.css";
import Header from "@/components/client/Header";
import Footer from "@/components/server/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { appNameEnglish } from "@/constants";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: appNameEnglish,
};

const font = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
    <body className={[font.className, "h-full m-0"].join(" ")}>
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-1">{children}</div>
      <Footer/>
      <SpeedInsights/>
      <Analytics/>
    </div>
    </body>
    </html>
  );
}
