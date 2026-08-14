"use client"

import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "./icons"

interface Props {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  placeholder?: string
  helper?: string
}

export default function PasswordField({ id, label, value, onChange, onBlur, error, touched, placeholder, helper }: Props) {
  const [visible, setVisible] = useState(false)
  const showError = Boolean(error && touched)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label htmlFor={id} style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text)" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required
          placeholder={placeholder ?? "••••••••"}
          aria-invalid={showError ? true : undefined}
          aria-describedby={showError ? `${id}-error` : helper ? `${id}-helper` : undefined}
          style={{
            padding: "0.55rem 2.5rem 0.55rem 0.75rem",
            borderRadius: 8,
            border: `1px solid ${showError ? "var(--destructive)" : "var(--border-strong)"}`,
            fontSize: "0.875rem",
            width: "100%",
            boxSizing: "border-box" as const,
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          style={{ position: "absolute", right: "0.4rem", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "none", background: "transparent", color: "var(--text-faint)", cursor: "pointer", borderRadius: 6, transition: "color 0.15s, background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {visible ? <EyeSlashIcon size={17} /> : <EyeIcon size={17} />}
        </button>
      </div>
      {showError ? (
        <p id={`${id}-error`} style={{ margin: 0, fontSize: "0.78rem", color: "var(--destructive)" }}>{error}</p>
      ) : helper ? (
        <p id={`${id}-helper`} style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-faint)" }}>{helper}</p>
      ) : null}
    </div>
  )
}
