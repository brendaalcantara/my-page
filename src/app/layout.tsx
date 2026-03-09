import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Orbitron, JetBrains_Mono, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brenda Bispo | Backend Software Developer",
  description:
    "Backend Software Developer building scalable systems for millions of users. Currently at Mercado Libre.",
  keywords: [
    "Backend Developer",
    "Software Developer",
    "Mercado Libre",
    "Java",
    "Kotlin",
    "Distributed Systems",
    "Microservices",
    "Portfolio",
  ],
  authors: [{ name: "Brenda Bispo", url: "https://home.brendabispo.com" }],
  creator: "Brenda Bispo",
  metadataBase: new URL("https://home.brendabispo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brenda Bispo | Backend Software Developer",
    description:
      "Backend Software Developer building scalable systems for millions of users.",
    url: "https://home.brendabispo.com",
    siteName: "Brenda Bispo",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brenda Bispo | Backend Software Developer",
    description:
      "Backend Software Developer building scalable systems for millions of users.",
    creator: "@brendabispo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("portfolio-locale")?.value ?? "pt";
  return (
    <html
      lang={locale}
      className={`dark ${orbitron.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
