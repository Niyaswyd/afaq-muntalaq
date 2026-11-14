import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AFĀQ × MUNTALAQ — The Beginning of a New Journey",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    title: "AFĀQ × MUNTALAQ",
    description: site.description,
    siteName: "AFĀQ × MUNTALAQ",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
