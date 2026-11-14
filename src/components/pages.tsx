import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";
import { site } from "@/config/site";
import { announcements, objectives, schedule, sessions } from "@/data/content";
import {
  ContactForm,
  Countdown,
  GalleryBrowser,
  RegistrationForm,
  ReplyInbox,
  DarsDirectory,
  SchedulePicker,
} from "@/components/interactive";

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <h1>{site.eventName}</h1>
        <p className="hero-subtitle">{site.eventTagline}</p>
        <p className="hero-description">{site.description}</p>
        <div className="hero-info">
          <div><CalendarDays /><span><b>Date</b><small>{site.details.date}</small></span></div>
          <i />
          <div><MapPin /><span><b>Venue</b><small>{site.details.venue}</small></span></div>
          <i />
          <div><UsersRound /><span><b>Organized by</b><small>{site.organizer}</small></span></div>
        </div>
        <div className="hero-actions">
          <Link className="button button-gold" href="/about">Explore the Camp <ArrowRight size={16} /></Link>
          <Link className="button button-outline" href="/register">Register Now</Link>
        </div>
      </div>
      <div className="hero-script" aria-hidden="true">{site.tagline.split(", ").map((line) => <span key={line}>{line}</span>)}</div>
      <Countdown />
      <div className="hero-edge" aria-hidden="true" />
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section about-section" id="about">
      <div className="about-visual">
        <div className="about-visual-art">
          <span className="about-sun" />
          <span className="about-mosque"><i /><b /></span>
          <span className="about-visual-caption">A week that opens new doors</span>
        </div>
        <span className="about-ornament" aria-hidden="true">✦</span>
      </div>
      <div className="about-copy">
        <span className="eyebrow">A journey of purpose</span>
        <h2>A New Horizon<br /><em>Awaits.</em></h2>
        <p>MUNTALAQ is a transformative seven-day initiative designed to prepare SUFFA students for the next stage of their academic journey.</p>
        <p>Explore higher education opportunities, gain valuable guidance, and step confidently towards a brighter future. Together, we make space for questions, discovery and new possibilities.</p>
        <Link className="text-link" href="/about">Discover the vision <ArrowRight size={16} /></Link>
      </div>
      <div className="objectives-block">
        <SectionHeading kicker="Our purpose" title="Camp Objectives" />
        <div className="objective-grid">
          {objectives.map(({ title, icon: Icon }) => (
            <article className="objective-card" key={title}>
              <Icon size={22} strokeWidth={1.6} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
      <aside className="about-cta">
        <span className="arabic-watermark" aria-hidden="true">آفاق</span>
        <span className="eyebrow">Your next chapter</span>
        <h3>Starts<br />Here.</h3>
        <p>Take the first step towards a world of opportunities.</p>
        <Link className="button button-gold" href="/register">Register for MUNTALAQ <ArrowRight size={15} /></Link>
      </aside>
    </section>
  );
}

function HomeDetails() {
  const details = [
    { label: "Duration", value: site.details.duration, icon: CalendarDays },
    { label: "Date", value: site.details.date, icon: CalendarDays },
    { label: "Venue", value: site.details.venue, icon: MapPin },
    { label: "Eligibility", value: site.details.eligibility, icon: UsersRound },
  ];
  return (
    <section className="section details-section">
      <SectionHeading kicker="The essentials" title="A week designed for what comes next." copy="The practical details are being finalized. Official updates will be shared here by ADSA." />
      <div className="details-grid">
        {details.map(({ label, value, icon: Icon }) => (
          <div className="detail-card" key={label}><Icon size={20} /><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      <Link className="text-link" href="/camp-details">All camp details <ArrowRight size={16} /></Link>
    </section>
  );
}

function SchedulePreview() {
  return (
    <section className="section schedule-section">
      <SectionHeading kicker="Seven days, one beginning" title="A journey through the week" copy="A first look at the themes planned for each day. Session times, speakers and venues will be announced later." />
      <div className="schedule-preview">
        {schedule.map((item) => (
          <article className="schedule-preview-item" key={item.day}>
            <span className="schedule-day">{item.day}</span>
            <div><span className="eyebrow">Day {item.day}</span><h3>{item.title}</h3></div>
            <span className="schedule-time">{item.time}</span>
          </article>
        ))}
      </div>
      <p className="notice-text">Illustrative activities only — not confirmed official sessions.</p>
      <Link className="text-link" href="/schedule">Explore the schedule <ArrowRight size={16} /></Link>
    </section>
  );
}

function SessionsPreview() {
  return (
    <section className="section sessions-section">
      <SectionHeading kicker="Learn, connect, explore" title="Designed for discovery" copy="A considered mix of conversations and activities to support students exploring higher studies." />
      <div className="session-grid">
        {sessions.map(({ title, description, icon: Icon }) => (
          <article className="session-card" key={title}>
            <div className="session-icon"><Icon size={22} /></div><h3>{title}</h3><p>{description}</p>
            <span className="session-card-line" />
          </article>
        ))}
      </div>
      <Link className="text-link" href="/sessions">View sessions and activities <ArrowRight size={16} /></Link>
    </section>
  );
}

function UpdatesPreview() {
  return (
    <section className="section updates-section">
      <div className="updates-heading">
        <SectionHeading kicker="Stay informed" title="The latest from MUNTALAQ" copy="Important information and official updates from the organizing team." />
        <Link className="text-link" href="/resources">Visit resource hub <ArrowRight size={16} /></Link>
      </div>
      <div className="announcement-grid">
        {announcements.map((item) => <article className="announcement-card" key={item.title}>
          <span className="announcement-meta">{item.category}<span>{item.date}</span></span>
          <h3>{item.title}</h3><p>{item.text}</p>
          <ArrowUpRight size={18} className="announcement-arrow" />
        </article>)}
      </div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="section gallery-preview-section">
      <div className="gallery-preview-heading"><SectionHeading kicker="A glimpse of the journey" title="A gallery of possibilities" /><Link className="text-link" href="/gallery">Explore gallery <ArrowRight size={16} /></Link></div>
      <div className="gallery-preview-tiles">
        <Link href="/gallery" className="preview-tile preview-wide"><span>✦</span><b>Beyond boundaries</b></Link>
        <Link href="/gallery" className="preview-tile preview-tall"><span>✦</span><b>A new horizon</b></Link>
        <Link href="/gallery" className="preview-tile preview-small"><span>✦</span><b>Learn together</b></Link>
      </div>
    </section>
  );
}

function RegistrationCallout() {
  return (
    <section className="registration-callout">
      <div><span className="eyebrow">The beginning of a new journey</span><h2>Your Next Chapter<br /><em>Starts Here.</em></h2><p>Take the first step towards a world of opportunities.</p></div>
      <Link className="button button-gold" href="/register">Register for MUNTALAQ <ArrowRight size={16} /></Link>
      <span className="callout-ornament" aria-hidden="true">آفاق</span>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <HomeDetails />
      <SchedulePreview />
      <SessionsPreview />
      <UpdatesPreview />
      <GalleryPreview />
      <RegistrationCallout />
    </>
  );
}

const pageInfo: Record<string, { title: string; eyebrow: string; description: string }> = {
  about: { title: "A New Horizon Awaits.", eyebrow: "About MUNTALAQ", description: "A seven-day initiative created to help SUFFA students explore the next stage of their academic journey." },
  "camp-details": { title: "The Details", eyebrow: "Camp information", description: "Everything currently confirmed about the MUNTALAQ Higher Studies Camp. Additional details will be shared by ADSA." },
  schedule: { title: "Seven Days. New Possibilities.", eyebrow: "Camp schedule", description: "Explore the illustrative day-by-day outline. Official timings, venues and speakers will be announced later." },
  sessions: { title: "Learn. Connect. Discover.", eyebrow: "Sessions & activities", description: "A preview of session formats planned for MUNTALAQ. Individual session details are not yet confirmed." },
  speakers: { title: "Voices to Inspire.", eyebrow: "Speakers & mentors", description: "Speaker and mentor details will be shared here once confirmed by the organizing team." },
  resources: { title: "Your Resource Hub.", eyebrow: "Explore further", description: "A growing library of higher studies information, admissions guidance and opportunities." },
  gallery: { title: "A Glimpse of the Journey.", eyebrow: "Gallery", description: "A visual collection of learning, mentorship, reflection and fellowship." },
  register: { title: "Your Next Chapter Starts Here.", eyebrow: "Registration", description: "Official registration details are coming soon. This preview form does not submit or store personal information." },
  contact: { title: "We’d Love to Hear from You.", eyebrow: "Contact ADSA", description: "Contact information will be added here when confirmed. You can preview the form, but messages are not sent." },
};

function PageHeader({ slug }: { slug: string }) {
  const info = pageInfo[slug];
  return (
    <section className="page-hero">
      <div className="page-hero-pattern" aria-hidden="true" />
      <span className="eyebrow">{info.eyebrow}</span>
      <h1>{info.title}</h1>
      <p>{info.description}</p>
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{info.eyebrow}</span></div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <section className="content-section two-column-copy">
        <div><h2>Beyond boundaries,<br /><em>towards horizons.</em></h2></div>
        <div><p>This higher-education preparation camp is specially curated for students graduating from Alathurpadi Dars—under the visionary leadership of C.K. Abdurahman Faizy Usthad—and its 41 affiliated Dars institutions. Designed as a springboard for academic and personal growth, the camp features interactive sessions led by prominent scholars, community leaders, and professional trainers, empowering students with guidance, clarity, and direction as they step into their next phase of higher studies.</p></div>
      </section>
      <section className="content-section"><SectionHeading kicker="What we hope to nurture" title="A foundation for the road ahead" /><div className="objective-grid objective-grid-large">{objectives.map(({ title, text, icon: Icon }) => <article className="objective-card objective-card-detailed" key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    </>
  );
}

function CampDetailsPage() {
  const items = [
    ["Duration", site.details.duration],
    ["Date", site.details.date],
    ["Venue", site.details.venue],
    ["Eligibility", site.details.eligibility],
    ["Organizer", site.organizer],
    ["Format", site.details.format],
  ];
  return <section className="content-section"><SectionHeading kicker="Plan your journey" title="Camp information" copy="Details marked as announced soon are placeholders and will be updated when officially confirmed." /><div className="details-grid details-grid-page">{items.map(([label, value]) => <article className="detail-card" key={label}><span className="eyebrow">{label}</span><strong>{value}</strong></article>)}</div><div className="notice-panel"><span className="eyebrow">Official updates</span><p>Please refer to announcements from ADSA for confirmed dates, venue and participation information.</p></div></section>;
}

function SchedulePage() {
  return <section className="content-section"><SchedulePicker /></section>;
}

function SessionsPage() {
  return <section className="content-section"><div className="session-grid session-grid-page">{sessions.map(({ title, description, icon: Icon }) => <article className="session-card session-card-detailed" key={title}><div className="session-icon"><Icon size={22} /></div><h3>{title}</h3><p>{description}</p><div className="session-meta"><Clock3 size={15} /> Timing to be announced</div><small>Speaker and venue details to be announced</small></article>)}</div><p className="notice-text">Session formats are provisional examples, not confirmed official sessions.</p></section>;
}

function ResourcesPage() {
  return <section className="content-section dars-directory-section"><DarsDirectory /></section>;
}

function GalleryPage() {
  return <section className="content-section"><GalleryBrowser /></section>;
}

function RegisterPage() {
  return <section className="content-section registration-content"><div className="registration-intro"><span className="eyebrow">Start with a first step</span><h2>Take the next step<br /><em>when you’re ready.</em></h2><p>Registration is not open yet. Official details will be announced by ADSA.</p></div><RegistrationForm /></section>;
}

function ContactPage() {
  return <section className="content-section contact-content"><div className="contact-information"><span className="eyebrow">ADSA contact information</span><h2>Connect with<br /><em>the team.</em></h2><div className="contact-detail"><span>Email</span><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div><div className="contact-detail"><span>Phone</span><a href="https://wa.me/919074525205" target="_blank" rel="noreferrer">{site.contact.phone}</a></div><div className="contact-detail"><span>Location</span><strong>{site.contact.location}</strong></div></div><div className="contact-tools"><ContactForm /><ReplyInbox /></div></section>;
}

const pageComponents: Record<string, () => ReactNode> = {
  about: AboutPage,
  "camp-details": CampDetailsPage,
  schedule: SchedulePage,
  sessions: SessionsPage,
  resources: ResourcesPage,
  gallery: GalleryPage,
  register: RegisterPage,
  contact: ContactPage,
};

export function ContentPage({ slug }: { slug: string }) {
  const Page = pageComponents[slug];
  if (!Page) return null;
  return <><PageHeader slug={slug} /><Page /></>;
}
