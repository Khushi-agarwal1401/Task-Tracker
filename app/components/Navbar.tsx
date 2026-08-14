"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import { MenuIcon, CloseIcon } from "./icons"

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkStyle = (href: string) => ({
    textDecoration: "none",
    color: path === href ? "var(--primary)" : "var(--text-muted)",
    fontWeight: path === href ? 600 : 500,
    fontSize: "0.9rem",
    paddingBottom: "0.15rem",
    borderBottom: path === href ? "2px solid var(--primary)" : "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s",
  })

  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "0.75rem 1.5rem",
        borderBottom: "1px solid var(--border)",
        alignItems: "center",
        background: "var(--surface)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "var(--text)",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "-0.3px",
        }}
      >
        <Logo size={28} />
        Task Tracker
      </Link>

      <div className="nav-links">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
            {l.label}
          </Link>
        ))}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <ThemeToggle />
        <div className="nav-auth">
          <Link href="/sign-in" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 500 }}>
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="press"
            style={{
              padding: "0.4rem 1rem",
              background: "var(--primary)",
              color: "var(--text-on-primary)",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              transition: "background 0.15s, transform 0.1s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
          >
            Sign Up
          </Link>
        </div>
        <button
          type="button"
          className="nav-burger press"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "0.75rem 1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            boxShadow: "var(--shadow-md)",
            animation: "fadeUp 0.2s ease both",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ ...linkStyle(l.href), padding: "0.6rem 0", borderBottom: "none", fontSize: "1rem" }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: 8, border: "1px solid var(--border-strong)", color: "var(--text)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: 8, background: "var(--primary)", color: "var(--text-on-primary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
