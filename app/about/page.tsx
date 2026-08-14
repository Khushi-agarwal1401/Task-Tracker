"use client"

import Link from "next/link"
import Logo from "../components/Logo"
import { CheckIcon, CalendarIcon, BoltIcon, ChartBarIcon, ListBulletIcon } from "../components/icons"

const features = [
  { icon: <CheckIcon size={16} />, text: "Create, edit, and delete tasks" },
  { icon: <BoltIcon size={16} />, text: "Toggle completion and track status" },
  { icon: <CalendarIcon size={16} />, text: "Due dates with automatic overdue flags" },
  { icon: <ChartBarIcon size={16} />, text: "Live stats and a progress bar" },
  { icon: <ListBulletIcon size={16} />, text: "Filter and search your task list" },
]

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 700, margin: "2.5rem auto", padding: "0 1.25rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem", animation: "fadeUp 0.4s ease both" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <Logo size={56} animated />
        </div>
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>About Task Tracker</h1>
        <p style={{ margin: "0 auto", color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.6 }}>
          A lightweight task management app that keeps you organised — no account required.
        </p>
      </div>

      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem", boxShadow: "var(--shadow-sm)", animation: "fadeUp 0.4s ease 0.1s both" }}>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem", color: "var(--text)" }}>What it does</h2>
        <p style={{ margin: "0 0 1rem", color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem" }}>
          Task Tracker lets you capture tasks with a title, description, priority, status, and due date; mark them
          complete with one click; and edit or delete them at any time. An overview dashboard shows your progress at a glance.
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {features.map((item) => (
            <li key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-muted)", fontSize: "0.92rem" }}>
              <span style={{ display: "inline-flex", color: "var(--primary)", flexShrink: 0 }}>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem", boxShadow: "var(--shadow-sm)", animation: "fadeUp 0.4s ease 0.15s both" }}>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem", color: "var(--text)" }}>How it works</h2>
        <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem" }}>
          Your tasks are stored in your browser&apos;s local storage, so they persist between visits without needing an
          account or a server. Built with Next.js (App Router), React, and TypeScript.
        </p>
      </section>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.4s ease 0.2s both" }}>
        <Link href="/tasks" className="press" style={{ padding: "0.6rem 1.5rem", background: "var(--primary)", color: "var(--text-on-primary)", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", transition: "background 0.15s, transform 0.1s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
        >
          Go to Tasks
        </Link>
        <Link href="/dashboard" className="press" style={{ padding: "0.6rem 1.5rem", background: "var(--surface)", color: "var(--primary)", borderRadius: 8, textDecoration: "none", border: "1px solid var(--primary)", fontWeight: 600, fontSize: "0.9rem", transition: "background 0.15s, transform 0.1s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-soft)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
        >
          View Dashboard
        </Link>
      </div>
    </div>
  )
}
