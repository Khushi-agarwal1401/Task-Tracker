"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "./icons"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    Promise.resolve().then(() => {
      setDark(document.documentElement.classList.contains("dark"))
    })
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // Storage unavailable in private browsing — in-memory theme still works.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="press"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text-muted)",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s, transform 0.1s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
    >
      {dark ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </button>
  )
}
