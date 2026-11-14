"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/interactive";

export function SiteShell({ children }: { children: ReactNode }) {
  const isMeaningPage = usePathname() === "/meaning";

  if (isMeaningPage) {
    return <div className="meaning-route-shell">{children}</div>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
