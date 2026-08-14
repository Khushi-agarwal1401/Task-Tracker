"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GoogleIcon, GitHubIcon } from "./icons"

const spinnerStyle = {
  display: "inline-block",
  width: 14,
  height: 14,
  border: "2px solid var(--border)",
  borderTopColor: "var(--primary)",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
} as const

export default function SocialAuth({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  function handle(provider: string) {
    if (loading) return
    setLoading(provider)
    setTimeout(() => router.push(redirectTo), 500)
  }

  const btnStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.6rem",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text-muted)",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", whiteSpace: "nowrap" }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button type="button" className="press" onClick={() => handle("Google")} disabled={loading !== null} style={btnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
        >
          {loading === "Google" ? <span style={spinnerStyle} /> : <GoogleIcon size={17} />}
          Google
        </button>
        <button type="button" className="press" onClick={() => handle("GitHub")} disabled={loading !== null} style={btnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
        >
          {loading === "GitHub" ? <span style={spinnerStyle} /> : <GitHubIcon size={17} />}
          GitHub
        </button>
      </div>
    </>
  )
}
