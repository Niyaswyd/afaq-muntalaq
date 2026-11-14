# AFĀQ × MUNTALAQ

A responsive event website for MUNTALAQ, ADSA's seven-day higher studies camp for SUFFA students. The visual identity pairs emerald and champagne gold with an original Islamic-inspired hero illustration. Official information remains configurable and unconfirmed details are presented as placeholders.

## Stack

- Next.js App Router, React and TypeScript
- Tailwind CSS 4 (with a custom CSS design system)
- Framer Motion, Lucide React
- React Hook Form and Zod

## Run locally

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run lint
npm run build
npm start
```

## Configure event and site content

- `src/config/site.ts` is the central source for branding, camp details, contact placeholders, event date and timezone.
- Set `eventDate` to an ISO date/time string with its explicit UTC offset when the official start time is confirmed, for example `2027-01-15T09:00:00+05:30`. Keep it `null` until then; the countdown will show “DATE TO BE ANNOUNCED”.
- Set `eventTimezone` to the official IANA timezone label for display (currently `Asia/Kolkata`).
- Edit `schedule`, `sessions`, `speakers`, `resources`, `announcements` and `gallery` in `src/data/content.ts`. The current schedule and profile entries are explicitly illustrative/placeholders.
- Replace `public/assets/hero/hero-scene.svg` to change the original hero artwork. Gallery and speaker tiles are designed as placeholders until approved images are available.

## Registration and backend

The registration and contact forms validate input in preview mode only. They do not send or store information, and the interface clearly communicates that behavior. To connect a backend:

1. Add a server-side route or server action for the submission.
2. Validate the received payload again using the schemas in `src/lib/validations.ts`.
3. Configure provider credentials through environment variables; never expose secrets in client code.
4. Replace the preview submit handlers in `src/components/interactive.tsx` with calls to that server endpoint and keep pending, success and failure states explicit.

No database, admin login, API credentials or external registration service is configured by default.
