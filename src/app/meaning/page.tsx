import type { Metadata } from "next";
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Manrope } from "next/font/google";
import { MeaningPage } from "@/components/meaning-page";
import { meaningContent } from "@/data/meaning";

const displayFont = Cormorant_Garamond({
  variable: "--meaning-display-font",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--meaning-body-font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const arabicDisplayFont = Aref_Ruqaa({
  variable: "--meaning-arabic-display-font",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const arabicFallbackFont = Amiri({
  variable: "--meaning-arabic-fallback-font",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Meaning of MUNTALAQ & AFĀQ",
  description: meaningContent.pageDescription,
  openGraph: {
    title: "The Meaning | AFĀQ × MUNTALAQ",
    description: meaningContent.pageDescription,
    type: "website",
  },
};

export default function Page() {
  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} ${arabicDisplayFont.variable} ${arabicFallbackFont.variable}`}
    >
      <MeaningPage />
    </div>
  );
}
