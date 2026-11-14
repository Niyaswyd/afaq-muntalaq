import type { Metadata } from "next";
import { HomePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "AFĀQ × MUNTALAQ — The Beginning of a New Journey",
  description:
    "A transformative seven-day higher studies camp for SUFFA students, organized by ADSA. Beyond Boundaries, Towards Horizons.",
  openGraph: {
    title: "AFĀQ × MUNTALAQ",
    description: "The Beginning of a New Journey.",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
