import "../globals.css";
import { ReactNode } from "react";
import { Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import RootClientLayout from "@/components/layouts/RootLayoutClient";
import config from "@/appConfig";
import { generateSEOMetadata } from "@/libs/seo";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: config.theme.main,
  width: "device-width",
  initialScale: 1,
};

// Generate SEO tags (title, description, image) for the page
export const metadata = generateSEOMetadata({
  title: `${config.website.name}`,
  description: config.website.description,
  keywords: config.website.keywords,
  openGraph: {
    title: `Home | ${config.website.name}`,
    description: config.website.description,
  },
  alternates: {
    canonical: "/",
  },
});

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme={config.theme.main}
      className={font.className}
    >
      {config.website.googleAnalyticsId && (
        <GoogleAnalytics gaId={config.website.googleAnalyticsId} />
      )}
      <body>
        <NextIntlClientProvider messages={messages}>
          <RootClientLayout>{children}</RootClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
