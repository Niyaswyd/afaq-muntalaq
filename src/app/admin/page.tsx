"use client";

import Link from "next/link";
import { ArrowLeft, Bell, CalendarDays, UsersRound } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { schedule } from "@/data/content";

type AdminMessage = { id: string; name: string; email: string; message: string; createdAt: string; read: boolean };
type AdminReply = { id: string; messageId: string; text: string; createdAt: string };
const ADMIN_PASSCODE = "adsa";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [lockError, setLockError] = useState(false);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [replies, setReplies] = useState<AdminReply[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const featuredSessions = schedule.filter((item) => item.presenter);

  useEffect(() => {
    if (!unlocked) return;
    const stored = JSON.parse(window.localStorage.getItem("afaq-contact-messages") || "[]");
    setMessages(stored);
    setReplies(JSON.parse(window.localStorage.getItem("afaq-contact-replies") || "[]"));
    const markedRead = stored.map((message: { read: boolean }) => ({ ...message, read: true }));
    window.localStorage.setItem("afaq-contact-messages", JSON.stringify(markedRead));
  }, [unlocked]);

  const unlockAdmin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passcode !== ADMIN_PASSCODE) {
      setLockError(true);
      return;
    }
    setLockError(false);
    setUnlocked(true);
  };

  const sendReply = (message: AdminMessage) => {
    const text = replyText.trim();
    if (!text) return;
    const reply: AdminReply = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, messageId: message.id, text, createdAt: new Date().toISOString() };
    const nextReplies = [...replies, reply];
    setReplies(nextReplies);
    window.localStorage.setItem("afaq-contact-replies", JSON.stringify(nextReplies));
    const replyNotifications = Number(window.localStorage.getItem("afaq-reply-unread") || 0) + 1;
    window.localStorage.setItem("afaq-reply-unread", String(replyNotifications));
    window.dispatchEvent(new Event("afaq-notifications-updated"));
    setReplyText("");
    setReplyingTo(null);
  };

  if (!unlocked) {
    return (
      <main className="admin-page">
        <section className="admin-lock-card">
          <span className="eyebrow">ADSA · ADMIN</span>
          <h1>Admin access</h1>
          <p>Enter the passcode to open the admin page.</p>
          <form className="admin-lock-form" onSubmit={unlockAdmin}>
            <label htmlFor="admin-passcode">Passcode</label>
            <input
              autoComplete="current-password"
              id="admin-passcode"
              onChange={(event) => { setPasscode(event.target.value); setLockError(false); }}
              type="password"
              value={passcode}
            />
            {lockError && <span className="admin-lock-error" role="alert">Incorrect passcode. Try again.</span>}
            <button className="button button-gold" type="submit">Unlock</button>
          </form>
          <Link className="text-link" href="/">Back to site</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">AFĀQ × MUNTALAQ</span>
            <h1>Admin dashboard</h1>
            <p>Quick overview of the camp content and schedule.</p>
          </div>
          <Link className="button button-outline admin-back" href="/"> <ArrowLeft size={15} /> Back to site</Link>
        </div>

        <section className="admin-stats" aria-label="Camp overview">
          <article className="admin-stat"><CalendarDays size={20} /><span>Schedule days</span><strong>{schedule.length}</strong></article>
          <article className="admin-stat"><UsersRound size={20} /><span>Featured presenters</span><strong>{featuredSessions.length}</strong></article>
          <article className="admin-stat"><Bell size={20} /><span>Contact messages</span><strong>{messages.length}</strong></article>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading"><div><span className="eyebrow">Notifications</span><h2>Contact inbox</h2></div><span className="admin-status">Messages saved on this device</span></div>
          {messages.length === 0 ? <p className="admin-empty">No contact messages yet.</p> : <div className="admin-messages">{messages.map((message) => <article className="admin-message" key={message.id}><div><strong>{message.name}</strong><span className="admin-message-email">{message.email}</span></div><time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time><p>{message.message}</p>{replies.filter((reply) => reply.messageId === message.id).map((reply) => <div className="admin-reply-history" key={reply.id}><span>Reply sent</span><p>{reply.text}</p></div>)}{replyingTo === message.id ? <form className="admin-reply-form" onSubmit={(event) => { event.preventDefault(); sendReply(message); }}><textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Write your reply..." rows={3} autoFocus /><button className="admin-reply" type="submit">Send reply</button></form> : <button className="admin-reply" onClick={() => setReplyingTo(message.id)} type="button">Reply</button>}</article>)}</div>}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading"><div><span className="eyebrow">Programme</span><h2>Seven-day schedule</h2></div><Link className="text-link" href="/schedule">View schedule <ArrowLeft size={15} className="admin-arrow-right" /></Link></div>
          <div className="admin-table-wrap">
            <table className="admin-table"><thead><tr><th>Day</th><th>Session</th><th>Presenter</th><th>Status</th></tr></thead>
              <tbody>{schedule.map((item) => <tr key={item.day}><td><span className="admin-day">{item.day}</span></td><td>{item.title}</td><td>{item.presenter ?? "To be announced"}</td><td><span className="admin-status">Illustrative</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
