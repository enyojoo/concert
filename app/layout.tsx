import type { Metadata, Viewport } from "next";
import { Passion_One, Roboto, Rubik, Splash } from "next/font/google";
import "./globals.css";
import { getDict } from "./i18n";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-roboto",
});

const splash = Splash({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-splash",
});

const display = Passion_One({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-display",
});

// Passion One has no Cyrillic glyphs, so Russian headings use Rubik (see globals.css).
const displayRu = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: "900",
  variable: "--font-display-ru",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  const image = `/images/og-${t.htmlLang}.jpg`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: t.title,
    description: t.description,
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      title: t.title,
      description: t.description,
      images: [
        {
          url: image,
          width: 2400,
          height: 1260,
          type: "image/jpeg",
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [image],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const t = await getDict();

  return (
    <html
      lang={t.htmlLang}
      className={`${roboto.variable} ${splash.variable} ${display.variable} ${displayRu.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
