"use client"

import Link from "next/link"
import Logo from "./components/Logo"
import { ListBulletIcon, ChartBarIcon, BoltIcon, ArrowRightIcon } from "./components/icons"

const features = [
  { icon: <ListBulletIcon size={22} />, title: "Track tasks", desc: "Add details, priorities, and due dates." },
  { icon: <ChartBarIcon size={22} />, title: "See progress", desc: "Live stats and a progress bar at a glance." },
  { icon: <BoltIcon size={22} />, title: "Stay on time", desc: "Overdue tasks are flagged automatically." },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 680, margin: "5rem auto", padding: "0 1.5rem", textAlign: "center" }}>
      <div style={{ marginBottom: "1.25rem", animation: "fadeIn 0.4s ease both" }}>
        <Logo size={64} animated />
      </div>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          margin: "0 0 0.75rem",
          color: "var(--text)",
          letterSpacing: "-0.5px",
          animation: "fadeUp 0.45s ease 0.1s both",
        }}
      >
        Task Tracker
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1.05rem",
          margin: "0 auto 2.5rem",
          maxWidth: 440,
          lineHeight: 1.6,
          animation: "fadeUp 0.45s ease 0.2s both",
        }}
      >
        Stay organised. Get things done. Create tasks, track progress, and never miss a deadline.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.45s ease 0.3s both" }}>
        <Link
          href="/tasks"
          className="press"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.7rem 1.75rem",
            background: "var(--primary)",
            color: "var(--text-on-primary)",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            transition: "background 0.15s, transform 0.1s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
        >
          View Tasks
          <ArrowRightIcon size={16} />
        </Link>
        <Link
          href="/dashboard"
          className="press"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.7rem 1.75rem",
            background: "var(--surface)",
            color: "var(--primary)",
            borderRadius: 8,
            textDecoration: "none",
            border: "1px solid var(--primary)",
            fontWeight: 600,
            fontSize: "0.95rem",
            transition: "background 0.15s, transform 0.1s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-soft)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
        >
          Dashboard
        </Link>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "3.5rem", flexWrap: "wrap", textAlign: "left" }}>
        {features.map((f, i) => (
          <div
            key={f.title}
            style={{
              flex: 1,
              minWidth: 180,
              padding: "1.25rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "var(--shadow-sm)",
              animation: "fadeUp 0.45s ease both",
              animationDelay: `${0.4 + i * 0.12}s`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--primary-soft)",
                color: "var(--primary)",
                marginBottom: "0.75rem",
                transition: "transform 0.15s ease",
              }}
            >
              {f.icon}
            </div>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.95rem", color: "var(--text)" }}>{f.title}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
