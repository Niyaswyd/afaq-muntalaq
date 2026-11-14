"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Bell,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { darsDirectory, gallery, resources, schedule } from "@/data/content";
import { site, navigation } from "@/config/site";
import {
  type ContactValues,
  type RegistrationValues,
  contactSchema,
  registrationSchema,
} from "@/lib/validations";

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const updateNotifications = () => setNotificationCount(Number(window.localStorage.getItem("afaq-reply-unread") || 0));
    updateNotifications();
    window.addEventListener("afaq-notifications-updated", updateNotifications);
    return () => window.removeEventListener("afaq-notifications-updated", updateNotifications);
  }, []);

  return (
    <header className={`site-header${scrolled || pathname !== "/" ? " is-scrolled" : ""}`}>
      <nav className="nav-wrap" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="AFĀQ home">
          <span className="brand-mark"><b>آفاق</b></span>
          <span className="brand-tagline">{site.tagline}</span>
        </Link>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link
              className={`nav-link${pathname === item.href ? " active" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="button button-gold nav-cta" href="/register">
          Register Now <ArrowRight size={15} />
        </Link>
        <Link aria-label={`${notificationCount} reply notifications`} className="notification-link" href="/contact#contact-form"><Bell size={18} />{notificationCount > 0 && <span>{notificationCount}</span>}</Link>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="mobile-menu"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navigation.map((item) => (
              <Link
                className={`mobile-nav-link${pathname === item.href ? " active" : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link className="button button-gold mobile-register" href="/register" onClick={() => setMenuOpen(false)}>Register for MUNTALAQ</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand-mark" href="/"><b>آفاق</b></Link>
          <p>{site.tagline}.</p>
          <div className="footer-socials" aria-label="Social media">
            {site.socials.instagram && <a aria-label="Instagram" href={site.socials.instagram} rel="noreferrer" target="_blank">ig</a>}
            {site.socials.facebook && <a aria-label="Facebook" href={site.socials.facebook} rel="noreferrer" target="_blank">f</a>}
            {site.socials.youtube && <a aria-label="YouTube" href={site.socials.youtube} rel="noreferrer" target="_blank">▶</a>}
            {!site.socials.instagram && !site.socials.facebook && !site.socials.youtube && <span>Social media links to be announced</span>}
          </div>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link href="/about">About the camp</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/meaning">The Meaning</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Get in touch</span>
          <Link href="/contact">Contact ADSA</Link>
          <Link href="/register">Registration information</Link>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>
        <div className="footer-note">
          <span className="arabic-word">منطلق</span>
          <p>A week of learning. A horizon of possibility.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© AFĀQ × MUNTALAQ</span>
        <span>Organized by ADSA</span>
        <span>Official details will be announced soon.</span>
      </div>
    </footer>
  );
}

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [begun, setBegun] = useState(false);
  const eventTimestamp = site.eventDate ? Date.parse(site.eventDate) : Number.NaN;

  useEffect(() => {
    if (!Number.isFinite(eventTimestamp)) return;
    let timer: number | undefined;
    const update = () => {
      const difference = eventTimestamp - Date.now();
      setRemaining(Math.max(0, difference));
      setBegun(difference <= 0);
      if (difference <= 0 && timer !== undefined) window.clearInterval(timer);
    };
    update();
    if (eventTimestamp > Date.now()) timer = window.setInterval(update, 1000);
    return () => {
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [eventTimestamp]);

  const units = useMemo(() => {
    if (remaining === null) return [];
    const totalSeconds = Math.floor(remaining / 1000);
    return [
      { label: "Days", value: Math.floor(totalSeconds / 86400) },
      { label: "Hours", value: Math.floor((totalSeconds % 86400) / 3600) },
      { label: "Minutes", value: Math.floor((totalSeconds % 3600) / 60) },
      { label: "Seconds", value: totalSeconds % 60 },
    ];
  }, [remaining]);

  const reduceMotion = useReducedMotion();
  return (
    <section className="countdown-panel" aria-live="polite">
      <div className="countdown-heading">
        <span className="gold-rule" />
        <div>
          <span className="eyebrow">The journey begins in</span>
          <h2>{site.eventName} <span>2026</span></h2>
        </div>
        <span className="gold-rule" />
      </div>
      {!Number.isFinite(eventTimestamp) ? (
        <div className="countdown-announced">DATE TO BE ANNOUNCED</div>
      ) : begun ? (
        <div className="countdown-announced">THE JOURNEY HAS BEGUN!</div>
      ) : (
        <div className="countdown-units">
          {units.map((unit) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="countdown-unit"
              initial={reduceMotion ? false : { opacity: 0.6, y: 4 }}
              key={unit.label}
              transition={{ duration: 0.2 }}
            >
              <strong>{String(unit.value).padStart(2, "0")}</strong>
              <span>{unit.label}</span>
            </motion.div>
          ))}
        </div>
      )}
      <p className="countdown-footnote">Every second takes us closer to a new beginning.</p>
      {site.eventDate && <span className="timezone-note">Event timezone: {site.eventTimezone}</span>}
    </section>
  );
}

export function SchedulePicker() {
  const [selected, setSelected] = useState(0);
  const current = schedule[selected];
  return (
    <div className="schedule-interactive">
      <div className="day-selector" role="tablist" aria-label="Select camp day">
        {schedule.map((day, index) => (
          <button
            aria-selected={selected === index}
            className={`day-tab${selected === index ? " selected" : ""}`}
            key={day.day}
            onClick={() => setSelected(index)}
            role="tab"
            type="button"
          >
            <span>DAY {day.day}</span><strong>{day.date}</strong><small>{day.weekday}</small>
          </button>
        ))}
      </div>
      <motion.article
        animate={{ opacity: 1, x: 0 }}
        className={`selected-day-card${current.image ? " selected-day-card-featured" : ""}`}
        key={current.day}
        initial={{ opacity: 0, x: 12 }}
        transition={{ duration: 0.25 }}
      >
        {current.image ? <div className="selected-day-portrait"><img alt={`${current.presenter} portrait`} src={current.image} /></div> : <div className="selected-day-number">{current.day}</div>}
        <div className={current.image ? "inaugural-copy" : undefined}>
          <span className="eyebrow">Day {current.day} · Illustrative outline</span>
          {current.image && <span className="eyebrow schedule-feature-label">DAY {current.day} · {current.day === "01" ? "INAUGURAL SESSION" : "FEATURED SESSION"}</span>}
          <h3>{current.title}</h3>
          <p className={current.image ? "session-subtitle" : undefined}>{current.description}</p>
          {current.presenter && <p className="session-presenter">By <strong>{current.presenter}</strong>{current.presenterRole && <span className="presenter-role">{current.presenterRole}</span>}</p>}
          {current.image && <div className="session-details"><span>Time: {current.time}</span><span>Venue: {current.venue}</span></div>}
          <div className="session-meta"><Clock3 size={15} /> {current.time} <span>·</span> Speaker and venue to be announced</div>
        </div>
      </motion.article>
      {current.additional && (
        <motion.article animate={{ opacity: 1, x: 0 }} className="selected-day-card selected-day-card-featured additional-session-card" initial={{ opacity: 0, x: 12 }} transition={{ duration: 0.25 }}>
          <div className="selected-day-portrait"><img alt={`${current.additional.presenter} portrait`} src={current.additional.image} /></div>
          <div className="inaugural-copy">
            <span className="eyebrow schedule-feature-label">DAY {current.day} · ADDITIONAL SESSION</span>
            <h3>{current.additional.title}</h3>
            <p className="session-subtitle">{current.additional.description}</p>
            <p className="session-presenter">By <strong>{current.additional.presenter}</strong></p>
            <div className="session-details"><span>Time: {current.additional.time}</span><span>Venue: {current.additional.venue}</span></div>
          </div>
        </motion.article>
      )}
      <p className="notice-text">This schedule is an illustrative outline, not a confirmed programme.</p>
    </div>
  );
}

export function ResourceBrowser() {
  const categories = ["All", ...new Set(resources.map((item) => item.category))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = resources.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery = `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
  return (
    <div className="resource-browser">
      <label className="search-field">
        <span className="sr-only">Search resources</span>
        <input onChange={(event) => setQuery(event.target.value)} placeholder="Search resources..." value={query} />
      </label>
      <div className="filter-row">
        {categories.map((item) => (
          <button className={`filter-chip${category === item ? " chosen" : ""}`} key={item} onClick={() => setCategory(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="resource-grid">
        {filtered.map((item) => (
          <article className="resource-card" key={item.title}>
            <span className="eyebrow">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.href ? <a href={item.href} rel="noreferrer" target="_blank">Open resource <ArrowRight size={15} /></a> : <span className="resource-pending">Resource coming soon</span>}
          </article>
        ))}
        {filtered.length === 0 && <p className="empty-state">No resources match that search.</p>}
      </div>
    </div>
  );
}

export function DarsDirectory() {
  const [query, setQuery] = useState("");
  const filtered = darsDirectory.filter(([name, person, phone]) => `${name} ${person} ${phone}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="dars-directory"><div className="dars-heading"><span className="eyebrow">SUFFA Dars institutions</span><h2>41 affiliated Dars</h2><p>Find a Dars and contact the listed coordinator.</p></div><label className="search-field"><span className="sr-only">Search Dars</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search Dars, coordinator or number..." value={query} /></label><div className="dars-grid">{filtered.map(([name, person, phone], index) => <article className="dars-card" key={`${name}-${index}`}><span className="dars-number">{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{person}</p>{phone ? <a href={`tel:${phone.replace(/\D/g, "")}`}>{phone}</a> : <span className="dars-pending">Number to be announced</span>}</article>)}</div>{filtered.length === 0 && <p className="empty-state">No Dars match your search.</p>}</section>;
}

export function GalleryBrowser() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const categories = ["All"];
  const items = gallery.map((item, index) => ({ ...item, originalIndex: index })).filter((item) => category === "All" || item.category === category);
  const activeItem = active === null ? null : gallery[active];

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((index) => index === null ? null : (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActive((index) => index === null ? null : (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="filter-row gallery-filters">
        {categories.map((item) => <button className={`filter-chip${category === item ? " chosen" : ""}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
            <button className={`gallery-tile tone-${item.tone}`} key={item.title} onClick={() => setActive(item.originalIndex)} style={item.image ? { backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(4,31,30,.78)), url(${item.image})`, backgroundPosition: "center, center", backgroundSize: "cover, contain", backgroundRepeat: "no-repeat, no-repeat", backgroundColor: "#102f2d" } : undefined} type="button">
            <span className="gallery-arch" aria-hidden="true">✦</span>
            <span className="gallery-caption"><span>{item.category}</span>{item.title}</span>
          </button>
        ))}
      </div>
      <p className="notice-text">A collection of moments from learning, mentorship, reflection and fellowship.</p>
      <AnimatePresence>
        {activeItem && active !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button aria-label="Close gallery" className="lightbox-close" onClick={() => setActive(null)} type="button"><X /></button>
            <button aria-label="Previous image" className="lightbox-prev" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + gallery.length) % gallery.length); }} type="button"><ArrowLeft /></button>
            <div className={`lightbox-art tone-${activeItem.tone}`} onClick={(event) => event.stopPropagation()} style={activeItem.image ? { backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(4,31,30,.78)), url(${activeItem.image})`, backgroundPosition: "center, center", backgroundSize: "cover, contain", backgroundRepeat: "no-repeat, no-repeat", backgroundColor: "#102f2d" } : undefined}>
              <span className="gallery-arch" aria-hidden="true">✦</span>
              <h3>{activeItem.title}</h3>
              <p>AFĀQ × MUNTALAQ · {activeItem.category}</p>
            </div>
            <button aria-label="Next image" className="lightbox-next" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % gallery.length); }} type="button"><ArrowRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FieldError({ children }: { children?: React.ReactNode }) {
  return children ? <span className="field-error">{children}</span> : null;
}

export function RegistrationForm() {
  const [result, setResult] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", place: "", dars: "" },
  });
  const onSubmit = () => {
    setResult(true);
  };
  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="preview-notice"><span>Preview mode</span> Registration is not connected yet. This form will not send or store your details.</div>
      <label>Full name<input autoComplete="name" {...register("fullName")} placeholder="Your full name" /><FieldError>{errors.fullName?.message}</FieldError></label>
      <label>Place<input {...register("place")} placeholder="Your place" /><FieldError>{errors.place?.message}</FieldError></label>
      <label>Dars<input {...register("dars")} placeholder="Your Dars" /><FieldError>{errors.dars?.message}</FieldError></label>
      {result && <p className="form-result" role="status"><Check size={17} /> Preview only: your details were not sent. Official registration will open when announced.</p>}
      <button className="button button-gold form-submit" disabled={isSubmitting || result} type="submit">{isSubmitting ? "Please wait..." : result ? "Preview complete" : "Preview registration"} <ArrowRight size={16} /></button>
    </form>
  );
}

export function ContactForm() {
  const [result, setResult] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  useEffect(() => {
  }, []);
  const onSubmit = (values: ContactValues) => {
    const key = "afaq-contact-messages";
    const saved = window.localStorage.getItem(key);
    const messages = (saved ? JSON.parse(saved) : []) as Array<ContactValues & { id: string; createdAt: string; read: boolean }>;
    messages.unshift({ ...values, id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, createdAt: new Date().toISOString(), read: false });
    window.localStorage.setItem(key, JSON.stringify(messages));
    setResult(true);
  };
  return (
    <form className="form-grid contact-form" id="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="preview-notice"><span>Message inbox</span> Your message will appear in the admin notifications.</div>
      <label>Your name<input autoComplete="name" {...register("name")} placeholder="Your name" /><FieldError>{errors.name?.message}</FieldError></label>
      <label>Email address<input autoComplete="email" {...register("email")} placeholder="you@example.com" /><FieldError>{errors.email?.message}</FieldError></label>
      <label className="full-field">Message<textarea {...register("message")} placeholder="How can we help?" rows={5} /><FieldError>{errors.message?.message}</FieldError></label>
      {result && <p className="form-result" role="status"><Check size={17} /> Message received. The admin can view it from notifications.</p>}
      <button className="button button-gold form-submit" disabled={isSubmitting || result} type="submit">{result ? "Message sent" : "Send message"} <ArrowRight size={16} /></button>
    </form>
  );
}

export function ReplyInbox() {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<Array<{ text: string; createdAt: string }>>([]);
  useEffect(() => {
    setReplies(JSON.parse(window.localStorage.getItem("afaq-contact-replies") || "[]"));
    window.localStorage.setItem("afaq-reply-unread", "0");
    window.dispatchEvent(new Event("afaq-notifications-updated"));
  }, []);
  return <section className="reply-inbox-panel"><button className="reply-inbox-toggle" onClick={() => setOpen((value) => !value)} type="button"><Bell size={15} /> You got reply {replies.length > 0 && <span>{replies.length}</span>}</button>{open && <div className="reply-inbox">{replies.length === 0 ? <p>No replies yet.</p> : replies.map((reply, index) => <article key={`${reply.createdAt}-${index}`}><span>Reply received</span><time>{new Date(reply.createdAt).toLocaleString()}</time><p>{reply.text}</p></article>)}</div>}</section>;
}

export function DetailsDisclosure({ children }: { children: React.ReactNode }) {
  return <details className="details-disclosure"><summary>More information <ChevronDown size={16} /></summary>{children}</details>;
}
