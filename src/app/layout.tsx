import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Brenda Bispo | Backend Software Developer",
  description:
    "Backend Software Developer building scalable systems for millions of users. Currently at Mercado Livre.",
  keywords: [
    "Backend Developer",
    "Software Developer",
    "Mercado Livre",
    "Java",
    "Kotlin",
    "Distributed Systems",
    "Microservices",
    "Portfolio",
  ],
  metadataBase: new URL("https://brendabispo.dev"),
  openGraph: {
    title: "Brenda Bispo | Backend Software Developer",
    description:
      "Backend Software Developer building scalable systems for millions of users.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brenda Bispo | Backend Software Developer",
    description:
      "Backend Software Developer building scalable systems for millions of users.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
