"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"
import SocialAuth from "../components/SocialAuth"

const inputStyle = {
  padding: "0.55rem 0.75rem",
  borderRadius: 8,
  border: "1px solid var(--border-strong)",
  fontSize: "0.875rem",
  width: "100%",
  boxSizing: "border-box" as const,
  background: "var(--surface)",
  color: "var(--text)",
}

const spinnerStyle = {
  display: "inline-block",
  width: 14,
  height: 14,
  border: "2px solid rgba(255,255,255,0.4)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
} as const

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const emailError = email.trim() === "" ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email address." : ""
  const passwordError = password.length < 6 ? "Password must be at least 6 characters." : ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    if (emailError || passwordError) {
      const firstInvalid = document.querySelector<HTMLElement>('input[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }
    setSubmitting(true)
    setTimeout(() => router.push("/dashboard"), 600)
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to Task Tracker">
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <label htmlFor="email" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text)" }}>Email</label>
          <input
            id="email" type="email" autoFocus value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            required placeholder="you@example.com"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "email-error" : undefined}
            style={{ ...inputStyle, borderColor: emailError && emailTouched ? "var(--destructive)" : "var(--border-strong)" }}
          />
          {emailError && emailTouched && (
            <p id="email-error" style={{ margin: 0, fontSize: "0.78rem", color: "var(--destructive)" }}>{emailError}</p>
          )}
        </div>
        <PasswordField id="password" label="Password" value={password} onChange={setPassword} onBlur={() => setPasswordTouched(true)} error={passwordError} touched={passwordTouched} />
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer" }}>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "var(--primary)", width: 15, height: 15, cursor: "pointer" }} />
          Remember me
        </label>
        <button type="submit" disabled={submitting} className="press"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.6rem", borderRadius: 8, background: submitting ? "var(--primary-hover)" : "var(--primary)", color: "var(--text-on-primary)", border: "none", cursor: submitting ? "default" : "pointer", fontWeight: 600, fontSize: "0.9rem", transition: "background 0.15s, transform 0.1s ease" }}
          onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = "var(--primary-hover)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = submitting ? "var(--primary-hover)" : "var(--primary)" }}
        >
          {submitting ? <><span style={spinnerStyle} />Signing in…</> : "Sign In"}
        </button>
      </form>
      <SocialAuth />
      <p style={{ margin: "1.5rem 0 0", textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Sign Up</Link>
      </p>
    </AuthLayout>
  )
}
