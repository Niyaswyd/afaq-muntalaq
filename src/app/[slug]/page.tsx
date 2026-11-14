import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContentPage } from "@/components/pages";

const pageDetails: Record<string, { title: string; description: string }> = {
  about: { title: "About the Camp", description: "Learn about the vision and educational mission of MUNTALAQ." },
  "camp-details": { title: "Camp Details", description: "Dates, venue, eligibility and format for the MUNTALAQ Higher Studies Camp." },
  schedule: { title: "Seven-Day Schedule", description: "Explore the illustrative seven-day MUNTALAQ camp schedule." },
  sessions: { title: "Sessions & Activities", description: "Discover the learning sessions planned for MUNTALAQ." },
  speakers: { title: "Speakers & Mentors", description: "Speaker and mentor announcements for MUNTALAQ." },
  resources: { title: "Higher Studies Resources", description: "Explore resources for higher education, admissions and scholarships." },
  gallery: { title: "Gallery", description: "A visual space for the AFĀQ × MUNTALAQ journey." },
  register: { title: "Registration", description: "Registration details for the MUNTALAQ Higher Studies Camp." },
  contact: { title: "Contact ADSA", description: "Contact information and messages for the MUNTALAQ organizing team." },
};

export function generateStaticParams() {
  return Object.keys(pageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pageDetails[slug];
  return page ? { title: `${page.title} | AFĀQ × MUNTALAQ`, description: page.description } : {};
}

function ContentPageFallback() {
  return (
    <section aria-busy="true" className="page-hero">
      <div aria-hidden="true" className="page-hero-pattern" />
      <span className="eyebrow">MUNTALAQ · THE JOURNEY</span>
      <h1>Beyond boundaries, towards horizons.</h1>
      <p>Finding the details for this page…</p>
    </section>
  );
}

async function ResolvedContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageDetails[slug]) notFound();
  return <ContentPage slug={slug} />;
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ContentPageFallback />}>
      <ResolvedContentPage params={params} />
    </Suspense>
  );
}
