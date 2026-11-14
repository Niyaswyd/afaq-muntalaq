"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Meaning", "/meaning"],
  ["Camp Details", "/about"],
  ["Schedule", "/schedule"],
  ["Resources", "/resources"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

const values = [
  { letter: "A", arabic: "أ", title: "Aspire", text: "Set a goal worth walking towards." },
  { letter: "F", arabic: "ف", title: "Faith", text: "Keep every step rooted in your values." },
  { letter: "Ā", arabic: "ا", title: "Action", text: "Turn plans into a first step." },
  { letter: "Q", arabic: "ق", title: "Quest", text: "Keep learning and keep asking." },
] as const;

export function MeaningPage() {
  const [progress, setProgress] = useState(0);
  const [horizon, setHorizon] = useState("");

  return (
    <div className="meaning-page">
      <header className="meaning-topbar">
        <div className="meaning-nav-wrap">
          <Link aria-label="AFĀQ home" className="meaning-brand" href="/">
            <span>AFĀQ <b lang="ar">آفاق</b></span>
            <small>Beyond Boundaries, Towards Horizons</small>
          </Link>
          <nav aria-label="Main navigation" className="meaning-nav">
            {navigation.map(([label, href]) => (
              <Link aria-current={label === "Meaning" ? "page" : undefined} className={label === "Meaning" ? "is-active" : ""} href={href} key={label}>
                {label}
              </Link>
            ))}
            <Link className="meaning-register" href="/register">Register<br />Now →</Link>
          </nav>
        </div>
      </header>

      <main className="meaning-main">
        <section aria-labelledby="muntalaq-title" className="meaning-reference-intro">
          <div className="meaning-reference-arabic" lang="ar" dir="rtl">منطلق</div>
          <div>
            <p className="meaning-reference-kicker"><strong>The place of setting out.</strong> Muntalaq is the very first step of any journey or activity. Like a launchpad, it signifies the foundation and beginning of launching towards a big goal.</p>
            <h1 id="muntalaq-title">Muntalaq (Muntalaq): The Starting Point</h1>
            <p>It is from here you begin your journey towards Afāq.</p>
          </div>
        </section>
        <section aria-labelledby="meaning-title" className="meaning-intro">
          <div className="meaning-intro-arabic" aria-hidden="true" lang="ar" dir="rtl">آفَاق</div>
          <div className="meaning-intro-copy">
            <h1 id="meaning-title">What does Afāq mean?</h1>
            <p>Afāq is the plural of <i>ufuq</i> (أفق), the horizon. It stands for the start of a new chapter in life. The far horizon always points to the journey ahead and to hope.</p>
          </div>
        </section>

        <section aria-label="Imagine your horizon" className="horizon-card">
          <div className="horizon-illustration" aria-hidden="true">
            <svg viewBox="0 0 390 184" preserveAspectRatio="none">
              <rect width="390" height="184" fill="#2b211d" />
              <path d="m0 128 43-12 39 9 75-15 56 15 57-11 56 13 64-10v67H0Z" fill="#5b3e2d" />
              <path d="M0 131 43 116l39 9 75-15 56 15 57-11 56 13 64-10" fill="none" stroke="#dcb768" strokeOpacity=".44" />
              <path d="m142 184 65-62 65 62Z" fill="#b69b62" fillOpacity=".28" />
              <path d="m142 184 65-62 65 62" fill="none" stroke="#d8b269" strokeOpacity=".23" />
              <g fill="#1b1512" transform="translate(126 146)">
                <circle cx="4" cy="-5" r="3" /><path d="M1-1h6l2 16H-1Z" /><path d="M1 14h2l-1 9H0Zm4 0h2l2 9H7Z" />
              </g>
            </svg>
          </div>
          <div className="horizon-controls">
            <h2>{progress > 60 ? "Keep going" : "Before the journey"}</h2>
            <p>{horizon ? `Your horizon: ${horizon}` : "The horizon is only a thin line, far away."}</p>
            <label htmlFor="horizon-progress">Walk towards the horizon</label>
            <input id="horizon-progress" max="100" min="0" onChange={(event) => setProgress(Number(event.target.value))} style={{ "--range-progress": `${progress}%` } as CSSProperties} type="range" value={progress} />
            <label htmlFor="horizon-name">Name your horizon</label>
            <input id="horizon-name" maxLength={48} onChange={(event) => setHorizon(event.target.value)} placeholder="e.g. Medicine, Sharīʿa, Engineering" type="text" value={horizon} />
          </div>
        </section>

        <section aria-label="AFAQ values" className="meaning-values">
          {values.map((value) => (
            <article className="meaning-value" key={value.letter}>
              <span aria-hidden="true" className="meaning-value-arabic" lang="ar">{value.arabic}</span>
              <h2>{value.letter}</h2>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </section>
        <p className="meaning-disclaimer">The four words above are a suggested brand idea for ADSA to approve. They are not an official meaning of the name.</p>

        <footer className="meaning-bottom">
          <p className="meaning-verse" lang="ar" dir="rtl">سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ</p>
          <p className="meaning-translation">We will show them Our signs in the horizons.</p>
          <p className="meaning-reference">Qur’an 41:53 (Sūrah Fuṣṣilat). Please have the Arabic and translation checked before publishing.</p>
        </footer>
      </main>
    </div>
  );
}
