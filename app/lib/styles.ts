import type { CSSProperties } from "react"

/** Shared input styling so form controls look identical across the app. */
export const inputStyle: CSSProperties = {
  padding: "0.5rem 0.6rem",
  borderRadius: 6,
  border: "1px solid var(--border-strong)",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "0.875rem",
  background: "var(--surface)",
  color: "var(--text)",
}

/** Shared small label styling used above form fields. */
export const labelStyle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "var(--text-muted)",
}
